import axios from './axiosInstance'

class EndpointTest {
    constructor(props) {

    }
    
    static testServerStatus(self) {
        axios.get('/debug/status')
            .then(function (response) {
                console.log(response)
                self.setState({'serverStatus': 'Up',
                                    'serverStatusMessage': response.data});

            })
            .catch(function (error) {
                console.log(error);
                self.setState({'serverStatus': 'Down',
                                     'serverStatusMessage': error.response && error.response.data});
            })
    }

    static testDatabaseConnection(self) {
        axios.get('/debug/db')
            .then(function (response) {
                console.log(response)
                self.setState({'dbStatus': response.status === 200 ? 'Up': 'Down',
                                     'dbStatusMessage': response.data});
            })
            .catch(function (error) {
                console.log(error);
                self.setState({'dbStatus': 'Down',
                                     'dbStatusMessage': error.response && error.response.data});
            })
    }
}

export default EndpointTest;