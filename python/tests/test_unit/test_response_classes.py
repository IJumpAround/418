import unittest

from unittest.mock import MagicMock
from ratemydorm.utils.api_response import RateMyDormBaseResponse, RateMyDormApiResponse, RateMyDormRedirectResponse, \
    InvalidRedirectException

TEST_CODE = 200
TEST_KEY = 'a key'
TEST_VALUE = 'some value'
TEST_PAYLOAD = {TEST_KEY: TEST_VALUE}
TEST_MESSAGE = 'Custom error message we are sending to browser'
TEST_LOCATION = '/dashboard'


class RateMyDormApiResponseTestCase(unittest.TestCase):
    def setUp(self) -> None:
        pass

    def test_api_response_response_property(self):
        response_object = RateMyDormApiResponse(TEST_PAYLOAD, TEST_CODE)
        response = response_object.response
        self.assertIsInstance(response, tuple)
        self.assertEqual(2, len(response))
        self.assertIsInstance(response[0], dict)
        self.assertIsInstance(response[1], int)

    def test_api_response(self):
        response_object = RateMyDormApiResponse(TEST_PAYLOAD, TEST_CODE)
        response = response_object.response
        self.assertEqual(response[1], TEST_CODE)
        self.assertEqual(response[0].get('payload'), TEST_PAYLOAD)
        self.assertIsNone(response[0].get('message'))

    def test_api_response_set_message(self):
        response_object = RateMyDormApiResponse(TEST_PAYLOAD, TEST_CODE, message=TEST_MESSAGE)
        response = response_object.response
        self.assertEqual(response[0].get('message'), TEST_MESSAGE)

    def test_redirect_response_builds_correctly(self):
        loc = '/'
        redirect_object = RateMyDormRedirectResponse(loc)
        response = redirect_object.response
        self.assertIsInstance(response, tuple)
        self.assertEqual(2, len(response))
        self.assertIsInstance(response[0], dict)
        self.assertIsInstance(response[1], int)
        self.assertEqual(response[0].get('location'), loc)

    def test_redirect_throws_error_on_invalid_location(self):
        loc = ''
        with self.assertRaises(InvalidRedirectException) as cm:
            RateMyDormRedirectResponse(loc).response
            loc = 'fjfsda'
            RateMyDormRedirectResponse(loc).response

    def test_providing_data_dict_to_reponse(self):
        response = RateMyDormRedirectResponse(TEST_LOCATION, data=TEST_PAYLOAD).response
        data = response[0]

        self.assertEqual(TEST_PAYLOAD[TEST_KEY], data[TEST_KEY])
        self.assertEqual(data['type'], 'RMD_redirect')
        self.assertEqual(data['location'], TEST_LOCATION)

    def test_providing_data_as_string(self):
        response = RateMyDormRedirectResponse(TEST_LOCATION, data=TEST_MESSAGE).response
        data = response[0]
        self.assertEqual(data.get('message'), TEST_MESSAGE)

    def test_providing_data_as_other_type(self):
        response = RateMyDormRedirectResponse(TEST_LOCATION, data=list((1,2,3))).response
        data = response[0]

        self.assertIsNone(data['message'])