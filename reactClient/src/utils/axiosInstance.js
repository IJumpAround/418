import axios from 'axios'

// This can be used to set defaults for all axios objects. baseURL will automatically be prepended to all endpoints
// Just import this variable instead of importing from the base axios library
const instance = axios.create({
    // baseURL: 'http://ec2-3-21-75-218.us-east-2.compute.amazonaws.com:3000/',
    baseURL: 'http://localhost:5001/',
    timeout: 5000,
});
export default instance
