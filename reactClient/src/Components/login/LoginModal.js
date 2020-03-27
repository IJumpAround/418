import React from "react";
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from '../../utils/axiosInstance';

class LoginModal extends React.Component {

		state = {
			fields: {
				email: '',
				password: ''
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
			axios.get('',{

			})
		}

    render() {
				const {email, password} = this.state.fields;
        return (
            <React.Fragment>
                    {/* structured based on: https://www.w3schools.com/bootstrap4/bootstrap_modal.asp */}
					{/* Modal popup component for login , component rendering linked to login click*/}
					<div href="#" className="modal fade" id="modalLogin" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
					  aria-hidden="true" >
						  <div className="modal-dialog" role="document" show ={{String: "true"}}>
						    <form className="modal-content" onChange={this.handleInputChange} onSubmit={this.handleLogIn}>
						      <div className="modal-header text-center">
						        <h4 className="modal-title w-100 font-weight-bold">Sign in</h4>
						        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
						          <span aria-hidden="true">&times;</span>
						        </button>
						      </div>
					      <div className="modal-body mx-3">
					        <div className="md-form mb-5">
					          <i className="fas fa-envelope prefix grey-text"></i>
					          <input type="email" id="defaultForm-email" className="form-control validate" placeHolder="Email address" name="email" value={email}/>
					          <label data-error="wrong" data-success="right" htmlFor="defaultForm-email"></label>
					        </div>

				        <div className="md-form mb-4">
				          <i className="fas fa-lock prefix grey-text"></i>
				          <input type="password" id="defaultForm-pass" className="form-control validate" placeHolder="Password" name="password" value={password}/>
				          <label data-error="wrong" data-success="right" htmlFor="defaultForm-pass"></label>
				        </div>

					      </div>
					      <div className="modal-footer d-flex justify-content-center">
								<button className="btn btn-info">Login</button>	
									{/*
					        <a href="#"  className="btn btn-default">Login</a>
									*/}
					      </div>
					    </form>
				  	</div>
				</div>
		</React.Fragment>
        )


    }


}

export default LoginModal
