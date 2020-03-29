from tests.functional.functional_test_client import FunctionalTestClient
from ratemydorm.sql.table_types import UserProfile

profile_keys = UserProfile.__annotations__.keys()


class TestEndpoints(FunctionalTestClient):

    def test_get_user_profile(self):
        user_id = 2
        query = {'user_id': user_id}
        result = self.get('/data/profile', query)

        self.assertIsInstance(result, dict)
        self.assertIsInstance(result.get('profile'), dict)

        self.assertCountEqual(profile_keys, result.get('profile').keys())
