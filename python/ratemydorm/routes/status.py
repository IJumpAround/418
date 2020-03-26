from flask import Blueprint
from mysql.connector.errors import OperationalError, InterfaceError
from ratemydorm.sql.db_connect import get_connection

bp = Blueprint('db_status', __name__, url_prefix='/debug')


@bp.route('/db', methods=['GET'])
def database_status():
    try:
        connection = get_connection()
        return "Database is up", 200
    except (OperationalError, InterfaceError, ConnectionRefusedError) as e:
        print(e)
        return f"Database is not connected\nError: {e}", 503


@bp.route('/status', methods=['GET'])
def server_status():
    return "Server is up", 200
