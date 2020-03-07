import mysql.connector
from python.ratemydorm import global_config as config

connector = mysql.connector.MySQLConnection(user=config['MYSQL_DATABASE_USER'],
                                            password=config['MYSQL_DATABASE_PASSWORD'],
                                            host=config['MYSQL_DATABASE_HOST'],
                                            port=config['MYSQL_DATABASE_PORT'],
                                            database=config['MYSQL_DATABASE_DB'],
                                            buffered=True)
