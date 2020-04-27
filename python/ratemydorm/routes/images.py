import logging
from flask import Blueprint, request, Request

from ratemydorm.sql.db_connect import get_connection
from ratemydorm.utils.api_response import RateMyDormApiResponse, RateMyDormMessageResponse

bp = Blueprint('images', __name__, url_prefix='/images')


@bp.route('', methods=['GET'])
def get_url():
    params = request.args
    image_type =  str(params.get('image_type')).lower()
    id = params.get('entity_id')

    if image_type == 'dorm':
        query = """SELECT url 
                    FROM dorm_image
                    where  dorm_id = %s"""
    elif image_type == 'profile':
        query = """SELECT profile_image
                    FROM users
                    WHERE user_id = %s"""
    else:
        return RateMyDormMessageResponse(400, f"invalid image type: {image_type}, options are ['profile', 'dorm']").response

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(query, (id,))

    results = [row[0] for row in cursor]
    payload = {'urls': results}
    response = RateMyDormApiResponse(payload, 200).response
    return response


def store_url():
    pass