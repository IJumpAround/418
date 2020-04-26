from typing import List
from ratemydorm.sql.db_connect import get_connection


def get_feature_ids(featureList: List) -> List[int]:
    connection = get_connection()
    cursor = connection.cursor(buffered=True, named_tuple=True)
    ids = []

    for val in featureList:
        query = """SELECT feature_id
                FROM features
                WHERE feature = %s
                LIMIT 1"""

        cursor.execute(query, (val,))
        result = cursor.fetchone()
        if result:
            ids.append(result.feature_id)
    # connection.close()
    return ids


def get_last_id():
    connection = get_connection()
    cursor = connection.cursor()
    cursor.execute("""SELECT LAST_INSERT_ID()""")

    id = cursor.fetchone()
    return id[0]
