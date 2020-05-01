import axios from './axiosInstance'
import $ from "jquery";

export const auth = {
    isAuthenticated: null,
    user_id: -1,
    admin: null,
    authenticate(cb) {
        auth.isAuthenticated = true;
        this.get_user_id(user => {
            this.admin = user.admin
            this.user_id = user.user_id
        })
        if (cb) cb()
    },

    signout(cb) {
        auth.isAuthenticated = false;
        auth.user_id = -1;
        auth.admin = null
        axios.get('/auth/logout')
            .then((response) => {
                console.log(response);
                window.location.pathname = '/'
            })
            .catch((ex) => {
                console.log(ex)
            });
    },

    get_user_id(cb) {
        if (auth.isAuthenticated && auth.user_id === -1) {
            axios.get('/auth/user')
                .then(res => {
                    console.log('get_user_id callback', res)
                    cb(res.data.payload)
                })
        }
    }
};

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

export function showLoginModal() {
    $('#loginNavButton').click()
}
