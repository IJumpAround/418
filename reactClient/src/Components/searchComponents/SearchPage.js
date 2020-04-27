import React, { Component } from 'react'
import OpenMap from './OpenMap';
import DynamicCards from './DynamicCards';
import {Link, useLocation} from 'react-router-dom';

 class SearchPage extends Component {
	constructor(props){
		super(props);
		this.state = { 
			cardData: [],
			passedCoordsFromMap: {
				lat: 42.686063,
				lng: -73.824688,
				},

			passedAddress: ''

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

	passedCoordFromMap = (coordFromOpenMap) => {
		var passedCoord = coordFromOpenMap
		this.setState({passedCoordsFromMap: passedCoord})
	}

	passUpCoord = () => {
		this.props.coordinates(this.state.passedCoordsFromMap);
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
					dormFormProps: {
						coords: this.state.passedCoordsFromMap,
					}
					// This link sets the background in location state.
					}}>
					<button className="btn btn-secondary" onClick = 
					{(event) => {
						this.passUpCoord()
					}
					}>Don't see your dorm? ADD ONE!</button>
				</Link>
				<h6>Click on the approximate location of your residence then hit the above button!</h6>
			</div>
			<OpenMap passCardsFromOpenMap = {this.passedCardsFromMap} 
					 passCoordFromOpenMap = {this.passedCoordFromMap}
			/>
	  	</div>	
		</React.Fragment>
    )
  }
}


export default SearchPage;