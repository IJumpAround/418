import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/js/bootstrap.bundle';
import DebugPage from './Components/debug/debug'
import LoginModal from './Components/login/LoginModal'
import RegistrationPage from "./Components/registration/registrationPage";
import SearchPage from './Components/searchComponents/SearchPage';
import Navbar from './Components/navComponents/navigation/Navbar';


import testServerConnection  from './utils/endpointTest';

class App extends React.Component {
	constructor(props){
		super(props);
		this.state = { 
			showLogin: false 
			
		};

	};
	
	 getLoginWindowStatus = (loginWindowStatus) => {
        this.setState({showLogin : !loginWindowStatus});
    };
	
	render(){
		let base = '/' + (process.env.REACT_APP_SUB_FOLDER || '');
	return (
		// Set base route depending on if we are deployed to EC2 or local
		<Router basename={(base)}>
		<Navbar />
		<div className="row">
            <div className="col">
				<LoginModal />
			</div>
		</div>
			<Switch>
				<RegistrationPage path="/" exact component={RegistrationPage}/>
				<Route path='/register' component={RegistrationPage}/>
				<Route path="/search" component={SearchPage} />
				<Route path='/debug' component={DebugPage}/>
			</Switch>
		</Router>
	  )
	}
};

export default App;