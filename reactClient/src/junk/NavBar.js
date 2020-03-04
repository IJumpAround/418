import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
//import Login from './Login.js'

/*basic BootStrap Code provided within W3 Tutorials, edited for my use*/
class NavBar extends React.Component {
	 constructor(props) {
		super(props);
		this.state = {
		showLogin: false,
		servOutput: null
		}
		this.clickChangeWindowStatus = this.clickChangeWindowStatus.bind(this);
	};
	
	 
	 
	outputHandler = (event) => {
		let out= event.target.output;
		let val = event.target.value;
		this.setState({[out]: val});
	}
	
       
	 getLoginWindowStatus = (loginWindowStatus) => {
        this.setState({showLogin: loginWindowStatus});
    };
    
    
    
    clickChangeWindowStatus(){
    		this.setState({
    		showLogin:!this.state.showLogin
    		});
    		this.props.getWindowStatus(this.state.showLogin);
    }
    
    
	  render() {
	    return (
			<React.Fragment>
			{/* Placeholder navbar with no functionality*/}
			<div className="text-center" style={{String: "margin-bottom:0"}}>
				<img src={require('./ratemydormplaceholderbanner.png')} width="50%" height="10%" alt="logo" /> 
			</div>
	      <div>
	        	<nav className="navbar navbar-expand-sm bg-white navbar-light z-depth-4">
		        	<a className="navbar-brand" href="#">
	    				<img src={require('./uablogo.png')} width="40" height="40" alt="logo" />
	    			</a>
	    			
	    			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
				   	<span className="navbar-toggler-icon"></span> 
				   </button>
	    			
	    			{/* Collapsible navbar behavior*/}
					<div className="collapse navbar-collapse" id="collapsibleNavbar">
						  <ul className="navbar-nav">
				    		<li className="nav-item active">
				      		<a className="nav-link" href="#">Profile</a>
				    		</li>
				    		<li className="nav-item active"> {/* Login Link toggles modal "login" component */}
				     		 	<a className="nav-link" href="#" data-toggle="modal" data-target="#modalLoginForm"
				     		 	onClick={this.clickChangeWindowStatus}>
				     		 	{!this.state.showLogin}
				     		 	Login</a>
				    		</li>
			  			</ul>
			  			</div>
			  			 <form className="form-inline my-2 my-lg-0">
						  <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
						  <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
							</form>
							
				</nav>
	      </div>
	      </React.Fragment>
    	)
  	}
};
export default NavBar;