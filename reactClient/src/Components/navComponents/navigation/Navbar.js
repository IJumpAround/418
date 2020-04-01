import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import '../navigation/Navbar.css';
import LoginButton from '../../login/loginButton'

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginClicked: false,
            isLoggedIn: false,
        };

    }

    componentDidMount() {
        console.log('component mounted');
        this.setState({isLoggedIn: this.props.isLoggedIn})
    }

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
                                <Link className="nav-link custom-color" to='/dashboard'>Dashboard  {this.props.isLoggedIn}</Link>
                            </li>
                            <li className="nav-item">
                                <LoginButton isLoggedIn = {this.props.isLoggedIn} setLoginStateFn={this.props.setAppLoginState} />
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

export default Navbar;