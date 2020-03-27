import mysql.connector
from flask import current_app


def get_connection():
    config = current_app.config

    connector = mysql.connector.MySQLConnection(user=config['MYSQL_DATABASE_USER'],
                                                password=config['MYSQL_DATABASE_PASSWORD'],
                                                host=config['MYSQL_DATABASE_HOST'],
                                                port=config['MYSQL_DATABASE_PORT'],
                                                database=config['MYSQL_DATABASE_DB'],
                                                buffered=True)
    return connector