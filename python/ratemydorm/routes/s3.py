import logging
from flask import Blueprint, request
from ratemydorm import config
import boto3
from botocore.exceptions import ClientError

bp = Blueprint('s3', __name__, url_prefix='/s3Upload')


@bp.route('', methods=['POST'])
def getS3Link():
    params = request.get_json()
    filename = params.get('filename')

    response = create_presigned_post(filename)
    return response


def create_presigned_post(object_name,
                          fields=None, conditions=None, expiration=3600):
    """Generate a presigned URL S3 POST request to upload a file

    :param bucket_name: string
    :param object_name: string
    :param fields: Dictionary of prefilled form fields
    :param conditions: List of conditions to include in the policy
    :param expiration: Time in seconds for the presigned URL to remain valid
    :return: Dictionary with the following keys:
        url: URL to post to
        fields: Dictionary of form fields and values to submit with the POST
    :return: None if error.
    """

    bucket_name = config.get('aws_bucket')
    secret = config.get('aws_secret_access_key')
    access_key = config.get('aws_access_key_id')
    region = config.get('aws_region')

    # Generate a presigned S3 POST URL
    s3_client = boto3.client('s3',
                             aws_access_key_id=access_key,
                             aws_secret_access_key=secret,
                             region_name=region
                             )
    try:
        response = s3_client.generate_presigned_post(bucket_name,
                                                     object_name,
                                                     Fields=fields,
                                                     Conditions=conditions,
                                                     ExpiresIn=expiration)
    except ClientError as e:
        logging.error(e)
        return None

    # The response contains the presigned URL and required fields
    return response