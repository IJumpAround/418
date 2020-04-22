from __future__ import annotations
import logging
from typing import NamedTuple, List, Dict
from decimal import Decimal

Row = NamedTuple

logger = logging.getLogger('main')


def convert_single_row_to_dict(row: Row) -> Dict:
    """
    Convert
    :param row:
    :return:
    """
    row_dict: Dict = row._asdict()
    for key, value in row_dict.items():
        replace = str(value)
        if type(value) is Decimal:
            row_dict[key] = replace
    return row_dict


def convert_multiple_rows_to_dict(rows: List[Row]) -> List[Dict]:
    dicts = [convert_single_row_to_dict(row) for row in rows]
    return dicts


def convert_request_params_to_query_params(request: dict,
                                           table_type: NamedTuple):

    table_fields = table_type._fields
    constructed_params = {}

    for key in table_fields:
        try:
            constructed_params[key] = request[key]
        except KeyError as e:
            logger.error(f'possible error: {e}')
            if key[-3:] == '_id':
                constructed_params[key] = None
    return constructed_params


class MalformedRequestException(Exception):
    def __init__(self, msg):
        super().__init__(msg)