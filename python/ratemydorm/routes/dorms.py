import logging
import datetime

from flask import request, Blueprint
from marshmallow.exceptions import ValidationError
from mysql.connector.errors import Error, IntegrityError

from ratemydorm.schemas.add_dorm import AddDormRequestSchema
from ratemydorm.sql.db_connect import get_connection
from ratemydorm.utils.data_conversion_functions import MalformedRequestException
from ratemydorm.utils.api_response import RateMyDormApiResponse, RateMyDormMessageResponse, ApiResponse

bp = Blueprint('dorms', __name__, url_prefix='/dorms')

logger = logging.getLogger('main')


@bp.route('', methods=["POST"])
def create_dorm() -> ApiResponse:
    """Endpoint for dorm creation
    Example post request:
    {
        "latitude": 73.33333,
        "longitude": "77.444j4f4",
        "room_num": 120,
        "floor": 2,
        "building": "Building Name",
        "quad": "Quad Name",
        "address": "address information"
    }
"""
    data = request.get_json()
    logger.debug(f'Inside Dorm POST endpoint, got {data}')

    connection = get_connection()
    cursor = connection.cursor()

    try:
        schema = AddDormRequestSchema()
        params = schema.load(data)
        logging.debug('Incoming JSON validated against schema')
    except MalformedRequestException as e:
        logger.error(f'CREATE DORM: Error converting incoming data to a dictionary \n\tGot {data}')
        return RateMyDormApiResponse(data, 400, 'invalid input').response
    except ValidationError as e:
        logger.error(f'Invalid request {e}')
        return RateMyDormApiResponse(data, 400, 'Invalid request').response

    query_params = {key: val for key, val in params.items() if key != 'features'}
    logger.debug(f'Converted params {params}')

    # Check for duplicate dorms
    insert = "INSERT INTO Dorm (latitude, longitude, room_num, floor, building, quad, address) VALUES " \
             "(%(latitude)s, %(longitude)s, %(room_num)s, %(floor)s, %(building)s, %(quad)s, %(address)s )"

    duplicate_check = """SELECT * 
                        FROM Dorm
                        WHERE room_num=%(room_num)s AND floor=%(floor)s AND building=%(building)s AND quad=%(quad)s AND
                        address=%(address)s
                        LIMIT 1"""
    cursor.execute(duplicate_check, query_params)
    res = cursor.fetchone()
    if res is not None:
        connection.rollback()
        connection.close()
        return RateMyDormMessageResponse(400, "Duplicate dorm").response

    # Insert into Dorm table
    try:
        cursor.execute(insert, query_params)
    except Error as e:
        logger.error(f'Error inserting into db: {e.msg}')
        response = RateMyDormApiResponse(data, 400, 'Database error').response
        connection.rollback()
        return response
    except KeyError as e:
        logger.error(f'Missing required field in query: {e}')
        response = RateMyDormMessageResponse(400, f"Missing a key field in the query {e}").response
        connection.rollback()
        return response

    # Get dorm id we just created & feature_ids from the features
    cursor.execute("""SELECT LAST_INSERT_ID()""")
    dorm_id = cursor.fetchone()[0]
    logger.debug('Beginning feature iteration insertion')
    try:
        for feature in data['features']:
            value = data['features'][feature]
            insert_features = """INSERT INTO feature_lut(dorm_id, feature_id, feature_value)
            SELECT %(dorm_id)s, feature_id, %(feature_value)s
            FROM
            features
            WHERE
            features.feature = %(feature_key)s"""
            feature_param = {'dorm_id': dorm_id,
                             'feature_value': value,
                             'feature_key': feature}

            cursor.execute(insert_features, feature_param)

    except Exception as e:
        logger.error(f'Error during feature insertion {e}')
        response = RateMyDormMessageResponse(400, f'Error during feature insertion {e}')
        connection.rollback()
        return response.response

    connection.commit()
    return RateMyDormApiResponse(code=200, payload={'dorm_id': dorm_id}).response


@bp.route('', methods=['GET'])
def retrieve_dorm() -> ApiResponse:
    logger.debug('Inside Dorm GET endpoint')
    return RateMyDormMessageResponse(404, 'Not implemented').response

#Written by Philip Smith
@bp.route('/load_dorm', methods=['POST'])
def load_dorm() -> ApiResponse:
    logger.debug('Inside Dorm GET endpoint')
    logger.debug(request.json)
    data_response = {'success': False}
    connection = get_connection()

    if request.method == 'POST':
        dorm_id = request.json['dorm_id']
        error = None
        params = {
            'dorm_id': dorm_id
        }

        logger.info(params)

        '''Things we need to load:
        -all info from: Dorms{lat/lng/room_num/floor/building/quad/address || DONE
        -Dorm image: dorm_image{url} || DONE
        -Features: format is a bit strange, going to have to do it like so ->
            join features with features_lut on feature_id or just reference both
            return the features name and value || DONE
        -Reviews: the reviews need to returned like so ->
            retrieve; review_id, user_id, timestamp,rating, text
            also need to return user's name from the user_id to display on the review from Users
        -Tags: Won't worry about this for now
        '''
        #load dorm basic info
        cursor = connection.cursor(buffered=True)

        cursor.execute(
            'SELECT latitude, longitude, room_num, floor, building, quad, address '
            'FROM Dorm '
            'WHERE Dorm.dorm_id = %(dorm_id)s', params
        )
        dorm_info = cursor.fetchone()
        if dorm_info is None:
            error = 'No dorms match your query'
            data_response['message'] = error
            return data_response, 401
        dorm_info_returned = []
        if error is None:
            dorm_info_returned =[
                str(dorm_info[0]),  # latitude
                str(dorm_info[1]),  # longitude
                str(dorm_info[2]),  # room_num
                str(dorm_info[3]),  # floor
                str(dorm_info[4]),  # building
                str(dorm_info[5]),  # quad
                str(dorm_info[6]),  # address
            ]


        cursor.execute(
            'SELECT url '
            'FROM dorm_image '
            'WHERE dorm_id = %(dorm_id)s', params
        )
        dorm_image = cursor.fetchall()
        if dorm_image is None:
            error = 'No dorms match your query'
        dorm_images_returned = []
        if error is None:
            for i in range(len(dorm_image)):
                dorm_images_returned.append(dorm_image[i])


        cursor.execute(
            'SELECT feature, feature_value '
            'FROM feature_lut '
            'LEFT JOIN features '
            'ON feature_lut.feature_id = features.feature_id '
            'WHERE feature_lut.dorm_id = %(dorm_id)s', params
        )
        features = cursor.fetchall()
        if features is None:
            error = 'No dorms match your query'
        features_returned = []
        if error is None:
            for i in range(len(features)):
                features_returned.append(
                    features[i]
                )
        '''
        Features are returned in array of this layout:
        [0] = room_type
        [1] = bathroom
        [2] = ac
        [3] = gym
        [4] = laundry
        [5] = internet
        [6] = kitchen
        '''

        cursor.execute(
            'SELECT review_text, rating, username, timestamp, review_id, review.user_id '
            'FROM review '
            'LEFT JOIN users '
            'ON review.user_id = users.user_id '
            'WHERE review.dorm_id = %(dorm_id)s', params
        )
        reviews = cursor.fetchall()
        if reviews is None:
            error = 'No dorms match your query'
        reviews_returned = []
        if error is None:
            for i in range(len(reviews)):
                reviews_returned.append(
                    reviews[i]
                )
        '''
        Reviews are returned in array of this layout:
        [i]
        [
        [0] = review_text
        [1] = rating
        [2] = username
        [3] = timestamp
        [4] = user_id  (this one unsure if we should keep for moderation purposes)
        ]
        '''

    dorm_data = {
            'dorm_info': dorm_info_returned,
            'dorm_features': features_returned,
            'dorm_images': dorm_images_returned,
            'dorm_reviews': reviews_returned
    }
    response = RateMyDormApiResponse(dorm_data, 200).response
    return response

@bp.route('/review', methods=['POST'])
def add_review():
    json_data = request.json
    params = {
        'user_id': json_data.get('user_id'),
        'dorm_id': json_data.get('dorm_id'),
        'timestamp': datetime.datetime.now(),
        'rating': json_data.get('rating'),
        'review_text': json_data.get('review_text'),
    }

    if None in params.values():
        return RateMyDormApiResponse(payload="", code=400, message='Not all fields are filled out').response

    connection = get_connection()
    cursor = connection.cursor()
    response = ""
    try:
        insert = """INSERT INTO review (user_id, dorm_id, timestamp, rating, review_text) VALUES
        (%(user_id)s, %(dorm_id)s, %(timestamp)s, %(rating)s, %(review_text)s)
        """
        cursor.execute(insert, params)
        response = 't'
    except IntegrityError as e:
        response = str(e), 400
        logger.error(f'Integrity error during database insertion {e}')
        connection.rollback()
    except Exception as e:
        response = str(e), 400
        logger.error(f'Unexpected error during review INSERT: {e}')
        connection.rollback()
    else:
        response = 'success', 200
        logger.debug(f'Insert success {params}')
        connection.commit()
    finally:
        connection.close()
        return {'message': response[0],
                'timestamp': params.get('timestamp')}, response[1]
