from flask import Blueprint, request
from python.ratemydorm.sql.db_connect import connector

from datetime import datetime
import logging

bp = Blueprint('example', __name__, url_prefix='/example')



@bp.route('/', methods=['GET', 'POST'])
def hello_world():
    """
    Example endpoint in flask for those who are new.
    Import request from flask to access the incoming request https://flask.palletsprojects.com/en/1.1.x/api/#flask.Request
    Returning data to the view can be done by simply using return. https://flask.palletsprojects.com/en/1.1.x/quickstart/#about-responses
    POST: data stored in request.form
    GET: data stored in request.args
    :return:
    """
    logging.info('Test logging statement')
    if request.method == 'GET':
        args = request.args
        print(f'get params content: {args}')
    else:
        data = request.form
        print(f'post form content: {data}')

    return 'Hello World!'


@bp.route('/query', methods=['GET'])
def example_query():
    """
    Example endpoint utilizing the mysql server
    :return:
    """

    # Get a cursor from the database connection, this must be imported. See imports at top of file
    cursor = connector.cursor()

    # Results are stored in the cursor object
    # https://dev.mysql.com/doc/connector-python/en/connector-python-api-mysqlcursor-execute.html
    operation = 'SELECT * FROM example_table ORDER BY date DESC'

    # multi=True returns an iterator so we can loop over the results
    for result in cursor.execute(operation, multi=True):
        if result.with_rows:
            print("Rows produced by statement '{}':".format(
                result.statement))
            print(result.fetchall())
        else:
            print("Number of rows affected by statement '{}': {}".format(
                result.statement, result.rowcount))

    # Example of the proper way to parameterize an insert
    # Template 'INSERT INTO example_table (column1, column2) VALUES (%(column1_dictionary_key)s, %(column2_dictionary_key)s)
    # Note the values format is %(keyname)s
    # This way we can pass a dictionary as a paramter to the query
    values = {
        'data_being_inserted': 'Some data being inserted',
        'date_being_inserted': datetime.now()
    }
    insert = "INSERT INTO example_table (data, date) VALUES (%(data_being_inserted)s, %(date_being_inserted)s)"

    # Execute query and pass values dictionary
    cursor.execute(insert, values)

    # Must commit to confirm changes
    connector.commit()

    # It's important to always return something from these endpoints even if it's just an empty dictionary.
    # Don't return None
    return {}

