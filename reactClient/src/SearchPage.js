import React from 'react'
import 'bootstrap/dist/js/bootstrap.bundle'
//import { Router, Switch, Route, Link } from 'react-router-dom'
import NavBar from './NavBar'
import DynamicCards from './DynamicCards'
import Login from './Login'
import OpenMap from './OpenMap'
import axios from 'axios'
import ScrollArea from 'react-scrollbar'
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
		<React.Fragment>
			<div>
			<NavBar 
				getWindowStatus = {this.getLoginWindowStatus}
			/>
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
	  )
	}
	
};

export default SearchPage;