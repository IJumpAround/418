import axios from './axiosInstance'
import {auth} from '../App'

export function is_user_logged_in(callback) {
    if(auth.isAuthenticated === null) {
        axios.get('/user/user_logged_in')
            .then((response) => {
                console.log(response);
                console.log(response.status);
                if (response.status === 200) {
                    auth.authenticate()
                    callback(true)
                }
                return false
            })
            .catch((error) => {
                console.log(error);
                callback(false)
            })
    }
    else{
        callback(auth.isAuthenticated)
    }
}

export function logout(setLoginStateFn) {
    axios.get('/auth/logout')
        .then((response) => {
            setLoginStateFn(false);
        })
        .catch((error) => {
            console.log('error');
            console.log(error)
        })
}
