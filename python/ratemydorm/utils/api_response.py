from typing import Tuple, Dict

ApiResponse = Tuple[Dict,int]


class RateMyDormApiResponse:
    """
    {
        message: 'Some response message'
        payload: {The actual data being returned}
        success: boolean
    }
    """

    def __init__(self, payload, code: int, message=None):
        self._response: tuple
        self._message: str = message
        self._payload: dict = payload
        self._code: int = code
        self._build_response()

    def _build_response(self):
        data_dict = {
            'payload': self._payload,
            'message': self._message,
        }

        self._response = data_dict, self._code

    @property
    def response(self) -> ApiResponse:
        return self._response
