import logging
from flask import request, Blueprint
from mysql.connector.errors import Error

from ratemydorm.sql.db_connect import get_connection
from ratemydorm.sql.table_types import DormRow, Dorm
from ratemydorm.utils.api_response import RateMyDormApiResponse, RateMyDormMessageResponse, ApiResponse

bp = Blueprint('dorms', __name__, url_prefix='/dorms')


@bp.route('', methods=["POST"])
def create_dorm() -> ApiResponse:
    """Endpoint for dorm creation"""
    data = request.get_json()
    logging.debug(f'Inside Dorm POST endpoint, got {data}')

    connection = get_connection()
    cursor = connection.cursor()

    logging.debug(str(DormRow.address))

    try:
        params = Dorm(data)
    except KeyError as e:
        logging.error(f'CREATE DORM: Error converting incoming data to a dictionary \n\tGot {data}')
        return RateMyDormApiResponse(data, 400, 'invalid input').response

    logging.debug(f'Converted params {params}')
    insert = "INSERT INTO Dorm (latitude, longitude, room_num, floor, building, quad, address) VALUES " \
             "(%(latitude)s, %(longitude)s, %(room_num)s, %(floor)s, %(building)s, %(quad)s, %(address)s )"

    try:
        cursor.execute(insert, params)
    except Error as e:
        logging.error(f'Error inserting into db: {e.msg}')
        connection.rollback()
        return RateMyDormApiResponse(data, 400, e.msg).response
    finally:
        connection.commit()
        return RateMyDormMessageResponse(200,'Dorm added successfully').response


@bp.route('', methods=['GET'])
def retrieve_dorm() -> ApiResponse:
    logging.debug('Inside Dorm GET endpoint')
    return "Get dorm"