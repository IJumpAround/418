from flask import Blueprint
from mysql.connector.errors import OperationalError
from ratemydorm.sql.db_connect import get_connection

bp = Blueprint('db_status', __name__, url_prefix='/db_status')

@bp.route('/', methods=['GET'])
def database_status():
    try:
        connection = get_connection()
        return("Database is up")
    except OperationalError as e:
        return("Database is not connected")

