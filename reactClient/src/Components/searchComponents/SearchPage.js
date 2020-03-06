import React, { Component } from 'react'
import OpenMap from './OpenMap';
import DynamicCards from './DynamicCards';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'

 class SearchPage extends Component {
  render() {
	const mystyle = {
		display: "flex",
		height:"95vh",
	  };
	const scrollstyle = {

	};
    return (
		<React.Fragment>
		<div className="flex-container" style={mystyle}>
			<DynamicCards/>
			<OpenMap />
	  	</div>	
		</React.Fragment>
    )
  }
}


export default SearchPage;