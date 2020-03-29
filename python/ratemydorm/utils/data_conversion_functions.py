from __future__ import annotations
from typing import NamedTuple, List, Dict
from decimal import Decimal

Row = NamedTuple


def convert_single_row_to_dict(row: Row):
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


def convert_multiple_rows_to_dict(rows: List[Row]):
    dicts = [convert_single_row_to_dict(row) for row in rows]
    return dicts
