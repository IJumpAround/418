import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

/*Modal structure taken from https://mdbootstrap.com/docs/jquery/modals/forms/ */
class Login extends React.Component {
  constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: ""
		}
	};
	
	
  
  render() {
    return (
		
				<React.Fragment>
					{/* Modal popup component for login , component rendering linked to login click*/}
					<div href="#" className="modal fade" id="modalLoginForm" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel"
					  aria-hidden="true" >
						  <div className="modal-dialog" role="document" show ={{String: "true"}}>
						    <div className="modal-content">
						      <div className="modal-header text-center">
						        <h4 className="modal-title w-100 font-weight-bold">Sign in</h4>
						        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
						          <span aria-hidden="true">&times;</span>
						        </button>
						      </div>
					      <div className="modal-body mx-3">
					        <div className="md-form mb-5">
					          <i className="fas fa-envelope prefix grey-text"></i>
					          <input type="email" id="defaultForm-email" className="form-control validate"/>
					          <label data-error="wrong" data-success="right" htmlFor="defaultForm-email">Your Username</label>
					        </div>

				        <div className="md-form mb-4">
				          <i className="fas fa-lock prefix grey-text"></i>
				          <input type="password" id="defaultForm-pass" className="form-control validate"/>
				          <label data-error="wrong" data-success="right" htmlFor="defaultForm-pass">Your Password</label>
				        </div>

					      </div>
					      <div className="modal-footer d-flex justify-content-center">
					        <a href="#"  className="btn btn-default">Login</a>
					      </div>
					    </div>
				  	</div>
				</div>
		</React.Fragment>
    );
  }
}

export default Login;