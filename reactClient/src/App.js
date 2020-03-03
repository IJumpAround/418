import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePageWrapper from './Components/homePageWrapper/homePageWrapper';
import 'bootstrap/dist/js/bootstrap.bundle';
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
				<HomePageWrapper path="/" exact component={HomePageWrapper}/>
				<Route path="/search" component={SearchPage} />			
			</Switch>
		</Router>
	  )
	}
	
};

export default App;