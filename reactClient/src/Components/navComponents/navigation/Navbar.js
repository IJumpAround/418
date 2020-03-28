import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import '../navigation/Navbar.css';
import {is_user_logged_in, logout} from "../../../utils/auth";

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginClicked: false,
            isLoggedIn: false,
        };

    }

    componentDidMount() {
        console.log('component mounted')
        this.setState({isLoggedIn: this.props.isLoggedIn})
    }

    handleClick = (e) => {
        e.preventDefault();
        this.setState({loginClicked: !this.state.loginClicked});
    };

    render() {
        return (
            <div>

                <nav className="navbar sticky-top navbar-expand-sm  bg-light navbar-custom">
                    <Link className=" pl-3 custom-color my-text" to='/'>Rate My Dorm</Link>
                    <button className="navbar-toggler test" type="button" data-toggle="collapse"
                            data-target="#collapsibleNavbar">
                        <span className="navbar-toggler-icon"/>
                        <span className="icon-bar"/>
                        <span className="icon-bar"/>
                        <span className="icon-bar"/>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end " id="collapsibleNavbar">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link custom-color" to={'/search'}>Search</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link custom-color" to='/dashboard'>Dashboard</Link>
                            </li>
                            <li className="nav-item">
                                <LoginButton loggedIn = {this.props.isLoggedIn} />
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link custom-color" to='/debug'>Debug</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>

        )
    }
}


class LoginButton extends React.Component {
    constructor(props) {
        super(props);
    }



    render() {
        console.log('in render' + this.props.isLoggedIn);
        if (this.props.isLoggedIn) {
            return (
                <a className="nav-link custom-color" href={logout}>Logout</a>
            )
        } else {
            return (
                <a className="nav-link custom-color" href="#" data-toggle="modal"
                   data-target="#modalLogin">
                    Login</a>
            )
        }
    }
}

export default Navbar;