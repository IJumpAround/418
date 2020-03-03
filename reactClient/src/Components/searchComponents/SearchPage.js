import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle';
//import { Router, Switch, Route, Link } from 'react-router-dom'
import NavBar from '../navComponents/navigation/Navbar';
import DynamicCards from './DynamicCards'
import Login from './Login'
import OpenMap from './OpenMap'
import axios from 'axios'
import ScrollArea from 'react-scrollbar'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


class SearchPage extends React.Component {
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
		<NavBar />
		<React.Fragment>
			<div>
			<Login />
			<ScrollArea
					speed={0.8}
					className="area"
					contentClassName="content"
					horizontal={false}
				>
				<div>
					<DynamicCards />
				</div>
         	</ScrollArea>
			 
			<OpenMap />
			</div>
		</React.Fragment>

		</Router>
	  )
	}
	
};

export default SearchPage;