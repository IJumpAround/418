from __future__ import annotations
from typing import NamedTuple, Dict
import datetime
from decimal import Decimal

"""
Classes to be used as type annotations for Rows returned from the db
Only to be used with a cursor defined with named_tuple=True
ex: cursor = connection.cursor(named_tuple=True)
"""


class ReviewRow(NamedTuple):
    review_id: int
    user_id: int
    dorm_id: int
    timestamp: datetime.datetime
    rating: int
    review_text: str


class TagsRow(NamedTuple):
    dorm_id: int
    tag: str


class UsersRow(NamedTuple):
    user_id: int
    username: str
    first_name: str
    last_name: str
    email: str
    password: str
    profile_image: str
    status: str
    profile_bio: str
    user_role: str


class UserProfile(NamedTuple):
    username: str
    first_name: str
    last_name: str
    email: str
    profile_image: str
    status: str
    profile_bio: str
    user_role: str


class FeaturesRow(NamedTuple):
    feature_id: int
    feature: str
    data_type: str


class FeaturesLutRow(NamedTuple):
    dorm_id: int
    feature_id: int
    feature_value: str


class DormImageRow(NamedTuple):
    dorm_id: int
    user_id: int
    url: str


class DormRow(NamedTuple):
    dorm_id: int
    latitude: Decimal
    longitude: Decimal
    room_num: int
    floor: int
    building: str
    quad: str
    address: str


class Dorm:
    def __init__(self, data: Dict):
        """Convert incoming request from flask into a parameter dictionary for sql queries"""
        self._data = DormRow(data.get('dorm_id'),
                           data['latitude'],
                           data['longitude'],
                           data['room_num'],
                           data['floor'],
                           data['building'],
                           data['quad'],
                           data['address'])

    def to_dict(self):
        response = self._data._as_dict()
