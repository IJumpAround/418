from flask import request, make_response, Blueprint
from datetime import datetime as dt

bp = Blueprint('newuser', __name__, url_prefix='/newuser')

