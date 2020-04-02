import React from "react";
import {logout} from "../../utils/auth";

class LoginButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log('in render' + this.props.isLoggedIn);
        if (this.props.isLoggedIn) {
            return (
                <a className="nav-link custom-color"  href='#' onClick={(e) => this.logout_wrapper(e)}>Logout</a>
            )
        } else {
            return (
                <a className="nav-link custom-color" href="#" data-toggle="modal"
                   data-target="#modalLogin">
                    Login</a>
            )
        }
    }

    logout_wrapper(event) {
        logout(this.props.setLoginStateFn);
    }
}

export default LoginButton