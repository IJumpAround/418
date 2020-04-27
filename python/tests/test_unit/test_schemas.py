from marshmallow.exceptions import ValidationError
import unittest


from ..data import CREATE_DORM_REQUEST
from ratemydorm.models.dorm import Dorm
from ratemydorm.schemas.add_dorm import AddDormRequestSchema


class CreateDormRequestSchemaTest(unittest.TestCase):
    def setUp(self) -> None:
        self._request = CREATE_DORM_REQUEST
        self._schema = AddDormRequestSchema()

    def test_valid_request(self):
        schema = AddDormRequestSchema()
        a = schema.load(self._request)

        self.assertIsInstance(a, dict)

    def test_invalid_request(self):
        request = self._request
        request['address'] = None
        with self.assertRaises(ValidationError) as cm:
            self._schema.load(request)

    def test_load_request(self):
        request = self._request
        obj = self._schema.load(request)
        dorm = Dorm(**obj)
        self.assertEqual(dorm.features.kitchen,'In Dorm Kitchen')
