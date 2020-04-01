from flask import request, redirect, Blueprint

import logging

bp = Blueprint('tests', __name__, url_prefix='/test_api')


@bp.route('/redirect', methods=['GET'])
def redirect_test():
    logging.info('Sending redirect to homepage')
    return redirect("/",code=302)


