import functools
from flask import (Blueprint, flash, redirect, render_template, request, session, url_for, g)
from decimal import *
from mysql.connector.errors import IntegrityError, InterfaceError
from ratemydorm.sql.db_connect import get_connection
import logging
bp = Blueprint('searchpage', __name__, url_prefix='/search')

logger = logging.getLogger('main')


@bp.route('/load_cards', methods=('GET', 'POST'))
def load_cards():
    logger.debug(request.json)
    data_response = {'success': False}
    connection = get_connection()

    if request.method == 'POST':
        latitude = request.json['latitude']
        longitude = request.json['longitude']
        error = None
        params = {
            'latitude': latitude,
            'longitude': longitude
        }
        logger.info(params)
        cursor = connection.cursor(buffered=True)
        cursor.execute(
            #formula taken from gis.stackexchange.com/questions/31628/find-points-within-a-distance-using-mysql  courtesy of users: Mapperz and sachleen
            'SELECT dorm_id, latitude, longitude, room_num, floor, building, quad, address, '
            '(3959 * acos('
            'cos(radians(%(latitude)s)) '
            '* cos(radians(latitude)) '
            '* cos(radians(longitude) - radians(%(longitude)s)) '
            '+ sin(radians(%(latitude)s)) '
            '* sin(radians(latitude))'
            ')'
            ') AS distance '
            'FROM Dorm '
            'HAVING distance < 1 '
            'ORDER BY distance', params
        )

        dormRows = cursor.fetchall()


        if dormRows is None:
            error = 'No dorms match your query'

        if error is None:
            dorm_dict = []
            for i in range(len(dormRows)):
                dorm_dict.append([
                    str(dormRows[i][0]), #dorm_id
                    str(dormRows[i][1]), #latitude
                    str(dormRows[i][2]), #longitude
                    str(dormRows[i][3]), #room_num
                    str(dormRows[i][4]), #floor
                    str(dormRows[i][5]), #building
                    str(dormRows[i][6]), #quad
                    str(dormRows[i][7]), #address
                    ])
            logger.debug(dorm_dict)
            return {'data' : dorm_dict}, 200

        data_response['message'] = error
        return data_response, 401


