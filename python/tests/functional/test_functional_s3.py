from .functional_test_client import FunctionalTestClient


class S3FunctionalTestClient(FunctionalTestClient):

    def test_creating_URL(self):
        filename = 'testfile'
        result = self.post('/s3Upload',{'filename':filename})
        pass