from tests.functional.functional_test_client import FunctionalTestClient
from ratemydorm.sql.feature_queries import get_feature_ids, get_last_id

from ratemydorm import create_app


class TestQueries(FunctionalTestClient):

    def test_retrieve_feature_id_from_text(self):
        with create_app().app_context() as ctx:
            features = ['ac', 'bathroom']
            expected = [3, 2]
            ids = get_feature_ids(features)
            self.assertCountEqual(ids, expected)

    def test_retrieve_with_one_feature(self):
        with create_app().app_context() as ctx:
            features = ['bathroom']
            get_feature_ids(features)

    def test_get_last_id(self):
        with create_app().app_context() as ctx:
            id = get_last_id()
            self.assertIsInstance(id, int)