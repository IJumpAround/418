import axios from 'axios'
import config from 'react-global-configuration'

// This can be used to set defaults for all axios objects. baseURL will automatically be prepended to all endpoints
// Just import this variable instead of importing from the base axios library
const instance = axios.create({
    // Set address/port of target flask server
    baseURL: config.get('baseUrl') + ':' + config.get('port') + '/',
    timeout: 10000,
    // withCredentials : true
});
export default instance
