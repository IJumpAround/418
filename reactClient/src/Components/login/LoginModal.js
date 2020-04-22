import React from "react";
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from '../../utils/axiosInstance';

class LoginModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {
                email: '',
                password: ''
            }
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
                // Call to set state in top level App component
                this.props.loginResultFn(result.status === 200);
            })
            .catch((error) => {
                console.log('error');
                if (error) {
                    console.log(Object.entries(error))
                }
                this.props.loginResultFn(false);
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
                            <div className="modal-header text-center">
                                <h4 className="modal-title w-100 font-weight-bold">Sign in</h4>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body mx-3">
                                 <div className="md-form mb-5">
                                    <i className="fas fa-envelope prefix grey-text"/>
                                    <input type="email" id="defaultForm-email" className="form-control validate"
                                           placeholder="Email address" name="email" minLength={1} required={true}/>
                                    <label data-error="wrong" data-success="right" htmlFor="defaultForm-email"/>
                                </div>

                                <div className="md-form mb-4">
                                    <i className="fas fa-lock prefix grey-text"/>
                                    <input type="password" id="defaultForm-pass" className="form-control validate"
                                           placeholder="Password" name="password" minLength={1} required={true}/>
                                    <label data-error="wrong" data-success="right" htmlFor="defaultForm-pass"/>
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