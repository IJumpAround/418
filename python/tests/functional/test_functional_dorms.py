from unittest.mock import patch
from .functional_test_client import FunctionalTestClient

TEST_LATITUDE = 73.33333
TEST_LONGITUDE = 77.44444
TEST_ROOM_NUM = 120
TEST_FLOOR = 2
TEST_BUILDING = "Building Name"
TEST_QUAD = "Quad Name"
TEST_ADDRESS = "address information"


class DormEndpointsFunctionalTest(FunctionalTestClient):

    def setUp(self):
        self._request = {
            "latitude": TEST_LATITUDE,
            "longitude": TEST_LONGITUDE,
            "room_num": TEST_ROOM_NUM,
            "floor": TEST_FLOOR,
            "building": TEST_BUILDING,
            "quad": TEST_QUAD,
            "address": TEST_ADDRESS
        }

        super().setUp()

    @patch('ratemydorm.routes.dorms.get_connection')
    def test_tuple_insertion(self,
                             m_connection):
        response = self.post('/dorms', data=self._request)
