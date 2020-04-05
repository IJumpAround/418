import unittest
import logging
import json
from typing import Union, Dict, List

from ratemydorm import create_app

DeserializedObject = Union[Dict, List]

logger = logging.getLogger('main')


class FunctionalTestClient(unittest.TestCase):
    """
    Sets up a flask test client using the same configuration we have defined in default_config.py or
    overridden in instance/config.cfg
    This allows us to test the actual responses coming back from endpoints without invloving any javascript or React code

    To use this class, simply inherit from this class when defining your testclass.
    Setup runs before each test within your test class. This means you are getting a new testclient with each test.
    I've created wrapper methods for get and post. These are probably the only functions you'll need. Access them in your
    child class via self.post or self.get
    """

    def setUp(self):
        app = create_app()
        self.client = app.test_client()
        app.config['TESTING'] = True
        self.client.testing = True

    def get(self, endpoint: str, params: dict = None) -> DeserializedObject:
        """
        Make a get request to the specified endpoint in the test client
        :param endpoint: desired endpoint
        :param params: get parameters if any
        :return: raw response object
        """
        self._response = self.client.get(endpoint, query_string=params)
        logger.debug(f'GET: "{endpoint}" \tParams: "{params}".')
        logger.debug(f' Response: {self._response.data}')

        obj = json.loads(self._response.data)
        return obj

    def post(self, endpoint: str, data: dict) -> DeserializedObject:
        """
        Make a post request in the test client to the specified endpoint
        :param endpoint: path to endpoint. eg: /example
        :param data: data dictionary to post
        :return: raw response object
        """
        self._response = self.client.post(endpoint, json=data)

        logger.debug(f'POST: "{endpoint}" data: "{data}".')
        logger.debug(f'Response: {self._response.data}')
        obj = json.loads(self._response.data)
        return obj
