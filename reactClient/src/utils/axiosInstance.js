import axios from 'axios'
import config from 'react-global-configuration'

// This can be used to set defaults for all axios objects. baseURL will automatically be prepended to all endpoints
// Just import this variable instead of importing from the base axios library
const instance = axios.create({
    // Set address/port of target flask server
    baseURL: config.get('baseUrl') + ':' + config.get('port') + '/',
    timeout: 10000,
    withCredentials: true

});

// Interceptor handles flask redirects
instance.interceptors.response.use( (response) => {
    console.log('In interceptor: ' + response);
    console.log(response.request);
    if(response.status === 200 && response.data && response.data.type === 'RMD_redirect') {
        window.location.pathname = response.data.location;
        return Promise.resolve(response)
    }
    else {
        return Promise.resolve(response)
    }
}, (error) => {
    return Promise.reject(error)
});

export default instance
