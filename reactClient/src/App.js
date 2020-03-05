import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/js/bootstrap.bundle';
import LoginPage from './Components/login/loginPage'
import RegistrationPage from "./Components/registration/registrationPage";
import SearchPage from './Components/searchComponents/SearchPage';


class App extends React.Component {
	constructor(props){
		super(props);
		this.state = { 
			showLogin: false 
			
		}
	};
	
	 getLoginWindowStatus = (loginWindowStatus) => {
        this.setState({showLogin : !loginWindowStatus});
    };
	
	render(){
		
	return (
		<Router>
			<Switch>
				<RegistrationPage path="/" exact component={RegistrationPage}/>
				<Route path="/login" component={LoginPage}/>
				<Route path='/register' component={RegistrationPage}/>
				<Route path="/search" component={SearchPage} />
			</Switch>
		</Router>
	  )
	}
	
};

export default App;