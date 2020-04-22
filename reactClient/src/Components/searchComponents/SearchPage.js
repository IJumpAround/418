import React, { Component } from 'react'
import OpenMap from './OpenMap';
import DynamicCards from './DynamicCards';
import {Link, useLocation} from 'react-router-dom';


 class SearchPage extends Component {
	constructor(props){
		super(props);
		this.state = { 
			cardData: [
			
			]
		};

	};
	
	
	passedCardsFromMap = (dataFromOpenMap) => {
		var loadedCards = []
		for(var i=0; i<dataFromOpenMap.data.length; i++){
			loadedCards.push(
				{Dorm_id: dataFromOpenMap.data[i][0],
				 Room: dataFromOpenMap.data[i][3],
				 Floor: dataFromOpenMap.data[i][4],
				 Building: dataFromOpenMap.data[i][5],
				 Quad: dataFromOpenMap.data[i][6],
				 Address: dataFromOpenMap.data[i][7],
				 Tags: "Tag",
				 Image: ''
				}
			)		
		}	
		this.setState({cardData: loadedCards})
	}


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
		<div className="text-right"><div className = "h2" style = {textstyle}> ~Search on the map: The search-bar is in the top right. click to set a marker and find dorms nearby! ~ </div>
		</div>
		<div className="flex-container-fluid" style={mystyle}>
			<div className="container-fluid" >
				<DynamicCards passDataToDynamicCards = {this.state.cardData}/>
				<Link 
					to={{
					pathname: '/addDormForm',
					// This link sets the background in location state.
					}}>
					<button className="btn btn-secondary">Don't see your dorm? ADD ONE!</button>
				</Link>
			</div>
			<OpenMap passCardsFromOpenMap = {this.passedCardsFromMap} />
	  	</div>	
		</React.Fragment>
    )
  }
}


export default SearchPage;