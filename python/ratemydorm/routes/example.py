from flask import Blueprint, request
from ratemydorm.sql.db_connect import get_connection
from mysql.connector import Error
from datetime import datetime
import logging

# Used to register the route in the main app
bp = Blueprint('example', __name__, url_prefix='/example')

logger = logging.getLogger('main')

# Creates endpoint at baseurl/example/
@bp.route('/', methods=['GET', 'POST'])
def hello_world():
    """
    Example endpoint in flask for those who are new. Import request from flask to access the incoming request
    https://flask.palletsprojects.com/en/1.1.x/api/#flask.Request Returning data to the view can be done by simply
    using return. https://flask.palletsprojects.com/en/1.1.x/quickstart/#about-responses POST: data stored in
    request.form GET: data stored in request.args :return:
    """
    logger.info('Test logging statement')
    if request.method == 'GET':
        args = request.args
        print(f'get params content: {args}')
    else:
        data = request.form
        print(f'post form content: {data}')

    return 'Hello World!'


# Creates endpoint at baseurl/example/query
@bp.route('/query', methods=['GET'])
def example_query():
    """
    Example endpoint utilizing the mysql server
    :return:
    """

    # Get a cursor from the database connection, this must be imported. See imports at top of file
    connector = get_connection()
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

    # Example of the proper way to parameterize an insert Template 'INSERT INTO example_table (column1,
    # column2) VALUES (%(column1_dictionary_key)s, %(column2_dictionary_key)s) Note the values format is %(keyname)s
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


@bp.route('/rollback', methods=['GET'])
def example_rollback():
    connector = get_connection()
    cursor = connector.cursor()

    stmt = 'INSERT INTO example_table (data) VALUES (%(data)s)'
    params = {'data': 'This will not be inserted'}

    try:
        cursor.execute(stmt, params)
    except Error as e:
        logger.error(f"Shouldn't see this {e}")
        return e

    # Imagine we've already run this insert, and now we decide we shouldn't have performed the insert. Since we are
    # required to commit before changes are published in the database we can rollback the changes we've staged.
    connector.rollback()
    connector.commit()  # This commit does nothing after we've already rolled back

    # Try to select the insert we rolled back
    stmt = "SELECT * FROM example_table WHERE data='This will not be inserted'"
    cursor.execute(stmt)

    logger.info('The following line should show result=None')
    logger.info(f'Result of cursor.fetchone(): {cursor.fetchone()}')

    # Be careful to verify the cursor has returned anything from the query before performing operations on the data
    try:
        expected_string = cursor.fetchone()
        substring = expected_string[:5]
    except TypeError as e:
        logger.error(e)
        logger.info('This causes an error because the query returned nothing.')
        logger.info('normally it would be fine to slice a string like this.')

    return {}
