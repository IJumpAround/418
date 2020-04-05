import logging

from flask import session, Blueprint, request

from ratemydorm.sql.db_connect import get_connection
from ratemydorm.utils.api_response import RateMyDormApiResponse
from ratemydorm.utils.data_conversion_functions import convert_single_row_to_dict

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
        'user_id': session.get('user_id')
    }
    code = 200 if data.get('user_id') else 401

    return data, code


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

    logger.debug(user)
    code = 200 if user else 404

    user_dict = convert_single_row_to_dict(user)
    response = RateMyDormApiResponse(user_dict, code).response
    return response
