from typing import Tuple, Dict, Union
import abc
import logging

ApiResponse = Tuple[Dict, int]


class RateMyDormBaseResponse(abc.ABC):
    """Base class for responses"""
    def __init__(self, code):
        self._code = code
        self._payload = None
        self._response = None

    @abc.abstractmethod
    def _build_payload(self) -> dict:
        """Implement in derived classes to set the dictionary payload"""
        pass

    def _build_response(self) -> ApiResponse:
        """Create a valid flask tuple response"""
        return self._payload, self._code

    @property
    def response(self) -> ApiResponse:
        """Build the response and return it via the property"""
        self._payload = self._build_payload()
        self._response = self._build_response()
        return self._response


class RateMyDormApiResponse(RateMyDormBaseResponse):
    """
    {
        message: 'Some response message'
        payload: {The actual data being returned}
        success: boolean
    }
    """

    def __init__(self, payload, code: int, message=None):
        super().__init__(code)
        self._message: str = message
        self._payload: dict = payload

    def _build_payload(self) -> dict:
        return {
            'payload': self._payload,
            'message': self._message,
        }


class RateMyDormRedirectResponse(RateMyDormBaseResponse):

    def __init__(self, location: str, data: Union[Dict, str] = ''):
        super().__init__(code=200)
        self._data = self._set_data(data)
        self._set_location(location)

    def _set_data(self, data) -> dict:
        """A bit ugly, but allows supplying data as either a string or dictionary"""
        converted = {'message': None}
        if isinstance(data, dict):
            converted = data
        elif isinstance(data, str):
            converted['message'] = data
        return converted

    def _set_location(self, location: str):
        """Set the redirect location, only limited error checking is done here"""
        if location and location[0] == '/':
            self._location = location
        else:
            raise InvalidRedirectException(f'location provided: {location}')

    def _build_payload(self) -> dict:
        payload = {
            'type': 'RMD_redirect',
            'location': self._location,
        }

        # combine payload with data dictionary that was passed in
        for key, value in self._data.items():
            if key not in payload:
                payload[key] = value
            else:
                logging.error(f'Value in data dictionary would overwrite redirect structure. key: {key} value: {value}')
        return payload


class InvalidRedirectException(Exception):
    def __init__(self, message):
        super().__init__(message)
