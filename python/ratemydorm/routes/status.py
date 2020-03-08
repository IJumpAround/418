from flask import Blueprint
from mysql.connector.errors import OperationalError, InterfaceError
from ratemydorm.sql.db_connect import get_connection

bp = Blueprint('db_status', __name__, url_prefix='/db_status')

@bp.route('/', methods=['GET'])
def database_status():
    try:
        connection = get_connection()
        return "Database is up"
    except OperationalError or InterfaceError or ConnectionRefusedError as e:
        return f"Database is not connected\nError: {e}"

