import React from "react";
import './loginForm.css'
import {Link} from "react-router-dom";

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="container">

                    <div className='row'>
                        <div className='col-10'>
                            <label htmlFor="username">Username:</label><br/>
                            <input className='login-input' type="text" id="username" name="username"/><br/>
                            <label htmlFor="pwd">Password:</label><br/>
                            <input className='login-input' type="password" id="pwd" name="pwd"/>
                        </div>
                        <div className='col-2'/>
                    </div>
                    <div className='row'>
                        <div className='col-10'>
                            Need to <Link to='/register'>register?</Link>
                        </div>
                        <div className='col-2'/>
                    </div>

            </div>
        )
    }

}


export default LoginForm