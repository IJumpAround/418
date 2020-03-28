import axios from './axiosInstance'

export function is_user_logged_in() {
    axios.get('/auth/user_logged_in')
        .then((response) => {
            console.log(response);
            return response.status === 200;
        })
        .catch((error) => {
            console.log(error)
            return false;
        })
}

export function logout() {
    return 'testi'
}
