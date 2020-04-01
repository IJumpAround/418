import unittest

from unittest.mock import MagicMock
from ratemydorm.utils.api_response import RateMyDormBaseResponse, RateMyDormApiResponse, RateMyDormRedirectResponse, \
    InvalidRedirectException

TEST_CODE = 200
TEST_KEY = 'a key'
TEST_VALUE = 'some value'
TEST_PAYLOAD = {TEST_KEY, TEST_VALUE}
TEST_MESSAGE = 'Custom error message we are sending to browser'


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

