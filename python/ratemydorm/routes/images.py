import logging
from flask import Blueprint, request

from ratemydorm.sql.db_connect import get_connection
from ratemydorm.utils.api_response import RateMyDormApiResponse, RateMyDormMessageResponse

logger = logging.getLogger('main')
bp = Blueprint('images', __name__, url_prefix='/images')


@bp.route('', methods=['GET', 'POST'])
def image_endpoint():
    logger.info('Image endpoint accessed')
    if request.method == 'GET':
        params = request.args
        fn = get_url
    else:
        params = request.get_json()
        fn = store_url

    image_type = str(params.get('image_type')).lower()
    id = params.get('entity_id')
    return fn(params, image_type, id)


# Get an image url for profile or dorm from db
def get_url(params, image_type, id):
    logger.debug(f'Retrieve image url, params: {params}, image_type: {image_type}, id: {id}')
    if image_type == 'dorm':
        query = """SELECT url 
                    FROM dorm_image
                    where  dorm_id = %s"""
    elif image_type == 'profile':
        query = """SELECT profile_image
                    FROM users
                    WHERE user_id = %s"""
    else:
        return RateMyDormMessageResponse(400,
                                         f"invalid image type: {image_type}, options are ['profile', 'dorm']").response

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(query, (id,))

    results = [row[0] for row in cursor]
    payload = {'urls': results}
    response = RateMyDormApiResponse(payload, 200).response
    connection.close()
    logger.debug('retrieve finished')
    return response


# Store an s3 url in the db
def store_url(params, image_type, id):
    logger.debug(f'Store image url, params: {params}, image_type: {image_type}, id: {id}')
    url = params.get('url')

    if image_type == 'dorm':
        query_params = {'user_id': id['user_id'], 'dorm_id': id['dorm_id'], 'url': url}
        query = """INSERT INTO dorm_image VALUES (%(dorm_id)s, %(user_id)s, %(url)s)"""
    elif image_type == 'profile':
        query_params = {'url': url, 'id': id}
        query = """UPDATE users
                    SET profile_image = %(url)s
                    WHERE user_id = %(id)s"""
    else:
        return RateMyDormMessageResponse(400,
                                         f"invalid image type: {image_type}, options are ['profile', 'dorm']").response

    connection = get_connection()
    cursor = connection.cursor()
    cursor.execute(query, query_params)

    connection.commit()
    logger.debug('store finished')
    return RateMyDormMessageResponse(200, "Stored image url").response
