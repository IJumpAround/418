from flask import session, Blueprint

bp = Blueprint('user', __name__, url_prefix='/user')


@bp.route('/user_logged_in', methods=['GET'])
def user_logged_in():
    """
    Use session to quickly determine if the user is logged in
    :return:
    """
    if not session['user_id']:
        return "nope", 401
    else:
        return "yep", 200
