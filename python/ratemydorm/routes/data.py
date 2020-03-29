import datetime
import logging
from flask import request, Blueprint
from mysql.connector.errors import IntegrityError

from ratemydorm.utils.api_response import RateMyDormApiResponse
from ratemydorm.sql.db_connect import get_connection
from ratemydorm.utils.data_conversion_functions import convert_single_row_to_dict

bp = Blueprint('data', __name__, url_prefix='/data')


@bp.route('/profile', methods=['GET'])
def get_user_profile():
    """
    Takes GET request with user_id as a parameter
    :return:
    """
    user_id = request.args.get('user_id')
    connection = get_connection()
    cursor = connection.cursor(buffered=True, named_tuple=True)

    params = {'user_id': user_id}
    query = """SELECT username, first_name, last_name, email, profile_image, status, profile_bio, user_role
               FROM users
               WHERE user_id = %(user_id)s
               LIMIT 1"""
    cursor.execute(query, params)
    user = cursor.fetchone()

    logging.debug(user)
    code = 200 if user else 404

    user_dict = convert_single_row_to_dict(user)
    response = RateMyDormApiResponse(user_dict, code).response
    return response


@bp.route('/add_review', methods=['POST'])
def add_review():
    json_data = request.json
    params = {
        'user_id': json_data.get('user_id'),
        'dorm_id': json_data.get('dorm_id'),
        'timestamp': datetime.datetime.now(),
        'rating': json_data.get('rating'),
        'review_text': json_data.get('text'),
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
        response = e, 400
        logging.error(f'Integrity error during database insertion {e}')
        connection.rollback()
    except Exception as e:
        response = e, 400
        logging.error(f'Unexpected error during review INSERT: {e}')
        connection.rollback()
    else:
        response = 'success', 200
        logging.debug(f'Insert success {params}')
        connection.commit()
    finally:
        connection.close()
        return {'message': response[0]},response[1]
