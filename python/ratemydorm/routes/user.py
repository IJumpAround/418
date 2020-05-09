import logging
from typing import Tuple, Dict, List
from flask import session, Blueprint, request

from ratemydorm.sql.db_connect import get_connection
from ratemydorm.utils.api_response import RateMyDormApiResponse, ApiResponse
from ratemydorm.utils.data_conversion_functions import convert_single_row_to_dict, convert_multiple_rows_to_dict

bp = Blueprint('user', __name__, url_prefix='/user')

logger = logging.getLogger('main')


@bp.route('/user_logged_in', methods=['GET'])
def user_logged_in():
    """
    Use session to quickly determine if the user is logged in
    :return: 200 if user has session cookie
             401 if user does not have session cookie
    """
    if not session.get('user_id'):
        return "nope", 401
    else:
        return "yep", 200


@bp.route('/session_info', methods=['GET'])
def session_info():
    data = {
        'user_id': session.get('user_id'),
        'username': session.get('username'),
        'admin': session.get('admin'),
    }
    code = 200 if data.get('user_id') else 401

    return data, code


@bp.route('/profile', methods=['GET'])
def get_user_profile() -> ApiResponse:
    """
    Takes GET request with user_id as a parameter
    :return:
    """
    user_id = request.args.get('user_id')
    try:
        int(user_id)
    except ValueError as e:
        return RateMyDormApiResponse(None, 400, f"User id was not a valid integer {e}").response

    connection = get_connection()
    cursor = connection.cursor(buffered=True, named_tuple=True)

    params = {'user_id': user_id}
    query = """SELECT username, first_name, last_name, email, profile_image, status, profile_bio, user_role
               FROM users
               WHERE user_id = %(user_id)s
               LIMIT 1"""
    cursor.execute(query, params)
    user = cursor.fetchone()
    logger.debug(user)

    payload = {}
    if user:
        reviews, images = get_user_history(user_id, cursor)
        user_dict = convert_single_row_to_dict(user)
        payload['user'] = user_dict
        payload['reviews'] = reviews
        payload['images'] = images

    logger.debug(payload)
    connection.close()
    response = RateMyDormApiResponse(payload, 200).response
    return response


def get_user_history(user_id, cursor) -> Tuple[List[Dict], List[Dict]]:
    """
    :param user_id:
    :param cursor:
    :return: (reviews, images)
    """
    params = {'user_id': user_id}
    query = "SELECT * \
               FROM review \
               WHERE review.user_id = %(user_id)s"

    cursor.execute(query, params)
    reviews = cursor.fetchall()

    reviews = convert_multiple_rows_to_dict(reviews)

    image_query = "SELECT *  \
                   FROM dorm_image \
                   WHERE user_id= %(user_id)s"

    cursor.execute(image_query, params)
    images = cursor.fetchall()
    images = convert_multiple_rows_to_dict(images)

    return reviews, images
