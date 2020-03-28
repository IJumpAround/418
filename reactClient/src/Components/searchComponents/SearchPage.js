import React, { Component } from 'react'
import OpenMap from './OpenMap';
import DynamicCards from './DynamicCards';


 class SearchPage extends Component {
	constructor(props){
		super(props);
		this.state = { 
			cardData: [
				{ Dorm: 1, Desc: "something", Tags: "Tag", Image: '' },
				{ Dorm: 2, Desc: "something", Tags: "Tag", Image: '' },
				{ Dorm: 3, Desc: "something", Tags: "Tag", Image: '' },
				{ Dorm: 4, Desc: "something", Tags: "Tag", Image: '' },
				{ Dorm: 4, Desc: "something", Tags: "Tag", Image: '' },
			]
		};

	};
	
	
	passCardsFromMap = (dataFromOpenMap) => {
		var loadedCards = []
		console.log(typeof dataFromOpenMap.data)
		var dynamicCardData = dataFromOpenMap.data.entries(typeof dataFromOpenMap.data);
		console.log(typeof dynamicCardData)
		for(var i=0; i<dataFromOpenMap.data.length; i++){
			loadedCards.push(
				{Dorm: dataFromOpenMap.data[i][0],
				 Desc: dataFromOpenMap.data[i][5],
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
		<div className="text-right"><div className = "h2" style = {textstyle}> ~Search on the map: The search-bar is in the top right. click to set a marker and find dorms nearby! ~ </div></div>
		<div className="flex-container" style={mystyle}>
			<DynamicCards passDataToDynamicCards = {this.state.cardData}/>
			<OpenMap passCardsToOpenMap = {this.passCardsFromMap} />
	  	</div>	
		</React.Fragment>
    )
  }
}


export default SearchPage;