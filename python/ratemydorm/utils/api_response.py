from typing import Tuple, Dict
import abc
import logging

ApiResponse = Tuple[Dict, int]

class RateMyDormBaseResponse(abc.ABC):
    def __init__(self, code):
        self._code = code
        self._payload = None
        self._response = None

    @abc.abstractmethod
    def _build_payload(self) -> dict:
        pass

    def _build_response(self) -> ApiResponse:
        return self._payload, self._code

    @property
    def response(self) -> ApiResponse:
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

    def __init__(self, location: str, data: dict=None):
        super().__init__(code=200)
        self._data = data or {}
        self._set_location(location)

    def _set_location(self, location: str):
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
