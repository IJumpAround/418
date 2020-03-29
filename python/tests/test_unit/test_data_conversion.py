import unittest
import json

from collections import namedtuple
from ratemydorm.utils.data_conversion_functions import convert_single_row_to_dict, convert_multiple_rows_to_dict

from decimal import Decimal

TEST_TYPENAME = 'ROWNAME'
KEY1 = 'key1'
VAL1 = 'value1'
KEY2 = 'key2'
VAL2 = 'somevalue'
TEST_TUPLE = namedtuple(TEST_TYPENAME,
                        'key1 , key2')


class TestDataConversionFunctions(unittest.TestCase):
    def setUp(self) -> None:
        self.configure_row()

    def configure_row(self, val1=VAL1, val2=VAL2):
        self._row = TEST_TUPLE(val1, val2)

    def test_setup_creates_namedtuple(self):
        row = self._row
        self.assertTrue(VAL1 in row, msg=row)
        self.assertTrue(VAL2 in row)

        self.assertEqual(row.key1, VAL1)

    def test_converting_row_yields_dict(self):
        row = self._row

        result = convert_single_row_to_dict(row)
        self.assertIsInstance(result, dict)
        self.assertEqual(VAL1, result[KEY1])
        self.assertEqual(VAL2, result[KEY2])

    def test_converts_decimal_properly(self):
        val2 = Decimal(1.2222223232)
        self.configure_row(val2=val2)
        row = self._row

        result = convert_single_row_to_dict(row)

        self.assertRaises(TypeError, json.dumps, row)
        json.dumps(result)
        self.assertEqual(VAL1, result[KEY1])
        self.assertAlmostEqual(val2, Decimal(result[KEY2]), 9)

    def test_rows_conversion(self):
        dict2_val1 = 'test123'
        dict2_val2 = 'blah'

        row1 = [i for i in [self._row]][0]
        self.configure_row(dict2_val1, dict2_val2)
        row2 = self._row
        rows = [row1, row2]

        result = convert_multiple_rows_to_dict(rows)

        json.dumps(result)
        self.assertEqual(row1.key1, result[0][KEY1])
        self.assertEqual(row1.key2, result[0][KEY2])
        self.assertEqual(row2.key1, result[1][KEY1])
        self.assertEqual(row2.key2, result[1][KEY2])
