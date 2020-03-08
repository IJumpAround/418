import axios from './axiosInstance'


export function testServerStatus(self) {
    axios.get('/debug/status')
        .then(function (response) {
            console.log(response)
            self.setState({'serverUp': true});
            alert('Flask server running\nStatus' + response.data)
        })
        .catch(function (error) {
            console.log(error);
            self.setState({'serverUp': false});
            alert('No response from server\n' + error.toString())
        })
}

export function testDatabaseConnection(self) {
    axios.get('/debug/db')
        .then(function (response) {
            console.log(response)
            self.setState({'dbUp': true});
            alert('Flask database running\nStatus' + response.data)
        })
        .catch(function (error) {
            console.log(error);
            self.setState({'dbUp': false});
            alert('No response from database\n' + error.toString())
        })
}
