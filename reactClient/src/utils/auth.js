import axios from './axiosInstance'
import {set} from "react-global-configuration/lib/configuration";


export function is_user_logged_in(callback) {
    axios.get('/user/user_logged_in')
        .then((response) => {
            console.log(response);
            console.log(response.status);
            if(response.status ===200) {
                callback(true)
            }
            return false
        })
        .catch((error) => {
            console.log(error);
            callback (false)
        })
}

export function logout(setLoginStateFn) {
    axios.get('/auth/logout')
        .then((response) => {
            setLoginStateFn(false);
            window.location.pathname = '/'
        })
        .catch((error) => {
            console.log('error');
            console.log(error)
        })
}
