import axios from 'axios'
// This can be used to set defaults for all axios objects. baseURL will automatically be prepended to all endpoints
// Just import this variable instead of importing from the base axios library
let base = (process.env.REACT_APP_DEPLOY==='true') ? process.env.REACT_APP_BASE_URL_DEPLOY: process.env.REACT_APP_BASE_URL_DEV;
let port = process.env.REACT_APP_SERVER_PORT;
base = base || 'localhost';
port = port || '5001';
const instance = axios.create({
    // Set address/port of flask server
    baseURL: base.toString()+":"+port.toString() + '/',
    timeout: 5000,
});
export default instance
