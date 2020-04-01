from flask import request, Blueprint
from ratemydorm.utils.api_response import RateMyDormRedirectResponse
import logging

bp = Blueprint('tests', __name__, url_prefix='/test_api')


@bp.route('/redirect', methods=['GET'])
def redirect_test():
    logging.info('Sending redirect to homepage')
    redirect = RateMyDormRedirectResponse('/')
    logging.debug(redirect.response)
    return redirect.response




