import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/js/bootstrap.bundle';

import HomePageWrapper from './Components/homePageWrapper/homePageWrapper';
import LoginPage from './Components/login/loginPage'
import DebugPage from './Components/debug/debug'
import RegistrationPage from "./Components/registration/registrationPage";
import SearchPage from './Components/searchComponents/SearchPage';


import testServerConnection  from './utils/endpointTest';

class App extends React.Component {
	constructor(props){
		super(props);
		this.state = { 
			showLogin: false,
		};
	};

	getLoginWindowStatus = (loginWindowStatus) => {
        this.setState({showLogin : !loginWindowStatus});
    };
	
	render(){
	return (
		<Router>
			<Switch>
				<HomePageWrapper path="/" exact component={HomePageWrapper}/>
				<Route path="/login" component={LoginPage}/>
				<Route path='/register' component={RegistrationPage}/>
				<Route path="/search" component={SearchPage} />
				<Route path='/debug' component={DebugPage}/>
			</Switch>
		</Router>
	  )
	}
};

export default App;