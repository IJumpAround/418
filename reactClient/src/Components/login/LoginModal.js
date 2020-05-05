import React from "react";
import axios from '../../utils/axiosInstance';
import {auth} from "../../utils/auth";

class LoginModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {
                email: '',
                password: ''
            },
            alert_text: null
        }
    }

    handleInputChange = (e) => {
        this.setState({
            fields: {
                ...this.state.fields,
                [e.target.name]: e.target.value
            }
        })
    };

    handleLogIn = (e) => {
        this.setState({alert_text: null})
        let modalClose = e.target.children.loginModalHeader.children.loginModalClose
        e.preventDefault();
        console.log("Login was clicked");
        //Get route
        axios.post('auth/login', {
            email: this.state.fields.email,
            password: this.state.fields.password
        })
            .then((result) => {
                console.log('result');
                if (result) {
                    console.log(Object.entries(result));
                }
                auth.authenticate()
                this.props.loginResultFn(true)
                modalClose.click()
                // this.props.loginResultFn(result.status === 200);
            })
            .catch((error) => {
                console.log('error');
                if (error) {
                    this.setState({alert_text: 'Invalid Credentials'})
                    console.log(Object.entries(error))
                }
            })
    };

    render() {
        return (
            <React.Fragment>
                {/* structured based on: https://www.w3schools.com/bootstrap4/bootstrap_modal.asp */}
                {/* Modal popup component for login , component rendering linked to login click*/}
                <div href="#" className="modal fade" id="modalLogin" tabIndex="-1" role="dialog"
                     aria-labelledby="myModalLabel"
                     aria-hidden="true">
                    <div className="modal-dialog" role="document" show={{String: "true"}}>
                        <form className="modal-content" onChange={this.handleInputChange} onSubmit={this.handleLogIn}>
                            <div className="modal-header text-center" id="loginModalHeader">
                                <h4 className="modal-title w-100 font-weight-bold">Sign in</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" id="loginModalClose">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body mx-3">
                                 <div className="md-form mb-5">
                                    <i className="fas fa-envelope prefix grey-text"/>
                                    <input type="email" id="defaultForm-email" className="form-control validate"
                                           placeholder="Email address" name="email" minLength={1} required={true}
                                    autoComplete="email"/>
                                    <label data-error="wrong" data-success="right" htmlFor="defaultForm-email"/>
                                </div>

                                <div className="md-form mb-4">
                                    <i className="fas fa-lock prefix grey-text"/>
                                    <input type="password" id="defaultForm-pass" className="form-control validate"
                                           placeholder="Password" name="password" minLength={1} required={true}
                                    autoComplete="current-password"/>
                                </div>
                                    <div className="alert alert-danger" role="alert" hidden={this.state.alert_text === null}>
                                        {this.state.alert_text}
                                    </div>


                            </div>
                            <div className="modal-footer d-flex justify-content-center">
                                <button className="btn btn-info">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default LoginModal