import React from "react";
import {auth} from "../../utils/auth";
class LoginButton extends React.Component {


    render() {
      //  console.log('in render' + auth.isLoggedIn);
        if (this.props.isLoggedIn) {
            return (
                <a className="nav-link custom-color"  href='#' onClick={(e) => this.logoutFunction()}>Logout</a>
            )
        } else {
            return (
                <a className="nav-link custom-color" href="#" data-toggle="modal"
                   data-target="#modalLogin" id="loginNavButton">
                    Login</a>
            )
        }
    }

    logoutFunction() {
        auth.signout()
        this.props.setLoggedIn(false)
    }
}

export default LoginButton