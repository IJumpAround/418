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
    #logger.debug(request.json)
    data_response = {'success': False}
    connection = get_connection()

    if request.method == 'POST':
        latitude = request.json['latitude']
        longitude = request.json['longitude']
        radius = request.json['radius']
        room_type = request.json['room_type']
        bathroom = request.json['bathroom']
        dining = request.json['dining']
        internet = request.json['internet']
        laundry = request.json['laundry']
        fitness = request.json['fitness']
        airConditioning = request.json['airConditioning']
        error = None
        params = {
            'latitude': latitude,
            'longitude': longitude,
            'radius': radius,
            'room_type': room_type,
            'bathroom': bathroom,
            'dining': dining,
            'internet': internet,
            'laundry': laundry,
            'fitness': fitness,
            'airConditioning': airConditioning
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
            'HAVING distance < %(radius)s'
            'ORDER BY distance '
            'LIMIT 30', params
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
            for i in range(len(dorm_dict)):
                temp_param = {
                    'dorm_id': dorm_dict[i][0]
                }
                #print(dorm_dict[i][0])
                cursor.execute(
                    'SELECT feature, feature_value '
                    'FROM feature_lut '
                    'LEFT JOIN features '
                    'ON feature_lut.feature_id = features.feature_id '
                    'WHERE feature_lut.dorm_id = %(dorm_id)s', temp_param
                )
                features = cursor.fetchall()
                if features is None:
                    error = 'No dorms match your query'
                if error is None:
                    for j in range(len(features)):
                        dorm_dict[i].append(
                            features[j]
                        )
                '''
                Features are added into dorm_dict of this layout:
                [8] = room_type
                [9] = bathroom
                [10] = ac
                [11] = gym
                [12] = laundry
                [13] = internet
                [14] = kitchen
                '''
            print('starting length' , len(dorm_dict))
            i=0
            while (i < len(dorm_dict)):
                print(len(dorm_dict[i]), ':ID:', dorm_dict[i][0], ':Iteration:' ,i)
                if len(dorm_dict[i]) > 14:
                    if(room_type!='Any'):
                        if dorm_dict[i][8][1] != room_type:
                            print('pop room:', dorm_dict[i][0], 'iter:', i)
                            dorm_dict.pop(i)
                            continue

                    if (bathroom != 'Any'):
                        if dorm_dict[i][9][1] != bathroom:
                            print('pop br:', dorm_dict[i][0], 'iter:', i)
                            dorm_dict.pop(i)

                            continue

                    if (airConditioning != 'Any'):
                        if dorm_dict[i][10][1] != airConditioning:
                            print('pop air:', dorm_dict[i][0], 'iter:', i)
                            dorm_dict.pop(i)

                            continue


                    if (fitness != 'Any'):
                        if dorm_dict[i][11][1] != fitness:
                            print('pop fit:', dorm_dict[i][0], 'iter:', i)
                            dorm_dict.pop(i)

                            continue


                    if (laundry != 'Any'):
                        if dorm_dict[i][12][1] != laundry:
                            print('pop laund:', dorm_dict[i][0], 'iter:', i)
                            dorm_dict.pop(i)

                            continue


                    if (internet != 'Any'):
                        if dorm_dict[i][13][1] != internet:
                            print('pop internet:', dorm_dict[i][0], 'iter:', i)
                            dorm_dict.pop(i)

                            continue


                    if (dining != 'Any'):
                        if dorm_dict[i][14][1] != dining:
                            print('pop din:', dorm_dict[i][0], 'iter:', i)
                            dorm_dict.pop(i)

                            continue

                else:
                    print('pop malformat:', dorm_dict[i][0] ,  'iter:', i)
                    dorm_dict.pop(i)

                    continue
                i += 1
            return {'data' : dorm_dict}, 200

        data_response['message'] = error
        return data_response, 401


