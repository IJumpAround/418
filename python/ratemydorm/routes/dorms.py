import logging
from flask import request, Blueprint
from mysql.connector.errors import Error

from ratemydorm.sql.db_connect import get_connection
from ratemydorm.sql.table_types import DormRow, TableRegistry
from ratemydorm.utils.data_conversion_functions import MalformedRequestException, \
    convert_request_params_to_query_params
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
    return "Get dorm"