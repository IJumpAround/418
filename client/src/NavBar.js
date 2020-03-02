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
	
	 profClickHandler = (event) =>  {
	 	event.preventDefault();
	 	var url = 'http://localhost:9000/profile'
      fetch(url)
        .then((result) => result.json())
        .then(result => {
       		this.setState({ servOutput : result})
       	});
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
			<div className="text-left" style={{String: "margin-bottom:0"}}>
				<img src={require('./p5wallpaper.png')} width="80%" height="10%" alt />
				<img src={require('./p5morgana2.png')} width="15%" height="10%" alt />
			</div>
	      <div>
	        	<nav className="navbar navbar-expand-sm bg-dark navbar-dark">
		        	<a className="navbar-brand" href="#">
	    				<img src={require('./p5logo.png')} width="40" height="40" alt="Logo" />
	    			</a>
	    			
	    			<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
				   	<span className="navbar-toggler-icon"></span> 
				   </button>
	    			
	    			{/* Collapsible navbar behavior*/}
	    			<div className="collapse navbar-collapse" id="collapsibleNavbar">
			  			<ul className="navbar-nav">
				    		<li className="nav-item active">
				      		<a className="nav-link" href="#" onClick={this.profClickHandler}>
				      		
				      		Profile</a>
				    		</li>
				    		<li className="nav-item active"> {/* Login Link toggles modal "login" component */}
				     		 	<a className="nav-link" href="#" data-toggle="modal" data-target="#modalLoginForm"
				     		 	onClick={this.clickChangeWindowStatus}>
				     		 	{this.state.showLogin ? false:true}
				     		 	Login</a>
				    		</li>
			  			</ul>
			  			</div>
			  			<div className="container">
							<div className="column"> <p > <font color="white" style={{String: "Arial"}}>Welcome to my page!</font></p> </div>
							</div>
				</nav>
	      </div>
	      </React.Fragment>
    	)
  	}
};
export default NavBar;