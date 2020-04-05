import logging
import datetime
from flask import request, Blueprint
from mysql.connector.errors import Error, IntegrityError

from ratemydorm.sql.db_connect import get_connection
from ratemydorm.sql.table_types import DormRow, TableRegistry
from ratemydorm.utils.data_conversion_functions import MalformedRequestException, \
    convert_request_params_to_query_params
from ratemydorm.utils.api_response import RateMyDormApiResponse, RateMyDormMessageResponse, ApiResponse

bp = Blueprint('dorms', __name__, url_prefix='/dorms')


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
    logging.debug(f'Inside Dorm POST endpoint, got {data}')

    connection = get_connection()
    cursor = connection.cursor()

    logging.debug(str(DormRow.address))

    try:
        params = convert_request_params_to_query_params(data,
                                                        TableRegistry.tables.dorm)
    except MalformedRequestException as e:
        logging.error(f'CREATE DORM: Error converting incoming data to a dictionary \n\tGot {data}')
        return RateMyDormApiResponse(data, 400, 'invalid input').response

    logging.debug(f'Converted params {params}')
    insert = "INSERT INTO Dorm (latitude, longitude, room_num, floor, building, quad, address) VALUES " \
             "(%(latitude)s, %(longitude)s, %(room_num)s, %(floor)s, %(building)s, %(quad)s, %(address)s )"

    try:
        cursor.execute(insert, params)
    except Error as e:
        logging.error(f'Error inserting into db: {e.msg}')
        response = RateMyDormApiResponse(data, 400, 'Database error').response
        connection.rollback()
    except KeyError as e:
        logging.error(f'Missing required field in query: {e}')
        response = RateMyDormMessageResponse(400, f"Missing a key field in the query {e}").response
    else:
        connection.commit()
        response = RateMyDormMessageResponse(200, 'Dorm added successfully').response
    finally:
        connection.close()
        return response


@bp.route('', methods=['GET'])
def retrieve_dorm() -> ApiResponse:
    logging.debug('Inside Dorm GET endpoint')
    return RateMyDormMessageResponse(404, 'Not implemented').response


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
        logging.error(f'Integrity error during database insertion {e}')
        connection.rollback()
    except Exception as e:
        response = str(e), 400
        logging.error(f'Unexpected error during review INSERT: {e}')
        connection.rollback()
    else:
        response = 'success', 200
        logging.debug(f'Insert success {params}')
        connection.commit()
    finally:
        connection.close()
        return {'message': response[0]},response[1]

