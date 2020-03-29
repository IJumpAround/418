import datetime
import logging

from flask import request, session, Blueprint
from ratemydorm.sql.db_connect import get_connection
from mysql.connector.errors import IntegrityError

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
               WHERE user_id = %(user_id)s"""
    cursor.exectute(query)

    user = cursor.fetchone()


@bp.route('/add_review', methods=['POST'])
def add_review():

    error = None
    params = {
        'user_id': request['user_id'],
        'dorm_id': request['dorm_id'],
        'timestamp': datetime.datetime.now(),
        'rating': request['rating'],
        'review_text': request['text']
    }

    if None in params.values():
        error = 'Not all fields are filled out'
        return error, 400

    connection = get_connection()
    cursor = connection.cursor(buffered=True, named_tuple=True)

    try:
        insert = """INSERT INTO review (user_id, dorm_id, timestamp, rating, review_text) VALUES
        (%(user_id)s, %(dorm_id)s, %(timestamp)s, %(rating)s, %(review_text)s)
        """

    except IntegrityError as e:
        logging.error(f'Integrity error during database insertion {e}')
        response = e, 400
        connection.rollback()
    except Exception as e:
        logging.error(f'Unexpected error during review INSERT: {e}')
        response = e, 400
        connection.rollback()
    else:
        logging.debug(f'Insert success {params}')
        response = 'success', 200
        connection.commit()
    finally:
        connection.close()
        return response
