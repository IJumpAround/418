import axios from './axiosInstance'

function testServerConnection(self) {
    axios.get('/example')
        .then(function (response) {
            console.log(response)
            self.setState({'serverConnected': true});
            alert('Flask server connected\nStatus' + response)
        })
        .catch(function (error) {
            console.log(error);
            self.setState({'serverConnected': false});
            alert('Flask server not connected\n' + error)
        })
}

export default testServerConnection;