import React, { Component } from 'react'
import OpenMap from './OpenMap';
import DynamicCards from './DynamicCards';


 class SearchPage extends Component {
  render() {
	const mystyle = {
		display: "flex",
		height:"90vh",
	  };
	const textstyle = {
		color: "grey"
	};
    return (
		<React.Fragment>
		<div className="text-right"><div className = "h2" style = {textstyle}> ~Search on the map: The search-bar is in the top right. click to set a marker and find dorms nearby! ~ </div></div>
		<div className="flex-container" style={mystyle}>
			<DynamicCards/>
			<OpenMap />
	  	</div>	
		</React.Fragment>
    )
  }
}


export default SearchPage;