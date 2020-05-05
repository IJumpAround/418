import React, { Component } from 'react'
import OpenMap from './OpenMap';
import DynamicCards from './DynamicCards';
import {Link, useLocation} from 'react-router-dom';
import {is_user_logged_in} from "../../utils/auth";
import {showLoginModal} from "../../utils/auth";


class SearchPage extends Component {
	constructor(props){
		super(props);
		this.state = { 
			cardData: [],
			passedCoordsFromMap: {
				lat: 42.686063,
				lng: -73.824688,
				},

			passedAddress: '',
			
			radius: '1',
			room_type: 'Any',
			bathroom: 'Any',
			internet: 'Any',
			dining: 'Any',
			fitness: 'Any',
			airConditioning: 'Any',
			laundry: 'Any'
			

		};

	};
	
	
	passedCardsFromMap = (dataFromOpenMap) => {
		var loadedCards = []
		for(var i=0; i<dataFromOpenMap.data.length; i++){
			
			var avgRating =0
			for(var j=0; j<dataFromOpenMap.data[i][15].length; j++){
				avgRating = avgRating + dataFromOpenMap.data[i][15][j]
			}
			avgRating = avgRating/(dataFromOpenMap.data[i][15].length)
			if(isNaN(avgRating)){
				avgRating = 'No Ratings'
			}

			var image_urls = dataFromOpenMap.data[i][16]
			if(image_urls.length<1){
				image_urls = 'No Images'
			}

			loadedCards.push(
				{Dorm_id: dataFromOpenMap.data[i][0],
				 Room: dataFromOpenMap.data[i][3],
				 Floor: dataFromOpenMap.data[i][4],
				 Building: dataFromOpenMap.data[i][5],
				 Quad: dataFromOpenMap.data[i][6],
				 Address: dataFromOpenMap.data[i][7],
				 Rating: avgRating,
				 Tags: "Tag",
				 Image: image_urls
				}
			)		
		}	
		this.setState({cardData: loadedCards})
	}

	passedCoordFromMap = (coordFromOpenMap) => {
		var passedCoord = coordFromOpenMap
		this.setState({passedCoordsFromMap: passedCoord})
	}


	distanceFilter = e => {
		var distanceSelected = e.target.value
		this.setState({radius : distanceSelected})
	}
	roomFilter= e => {
		var roomSelected = e.target.value
		this.setState({room_type : roomSelected})
	}
	bathroomFilter= e => {
		var bathSelected = e.target.value
		this.setState({bathroom : bathSelected})
	}
	diningFilter= e => {
		var diningSelected = e.target.value
		this.setState({dining : diningSelected})
	}
	internetFilter= e => {
		var internetSelected = e.target.value
		this.setState({internet : internetSelected})
	}
	fitnessFilter= e => {
		var fitnessSelected = e.target.value
		this.setState({fitness : fitnessSelected})
	}
	airConFilter= e => {
		var airSelected = e.target.value
		this.setState({airConditioning : airSelected})
	}
	laundryFilter= e => {
		var laundrySelected = e.target.value
		this.setState({laundry : laundrySelected})
	}


	passUpCoord = () => {
		this.props.coordinates(this.state.passedCoordsFromMap);
	  }



  render() {
	const mystyle = {
		height:"85vh"
	  };
	const textstyle = {
		color: "grey"
	};

	const cardstyle = {
		overflowY : 'scroll',
		width : '100%'
	}
    return (
		<React.Fragment>
		<div className="text-center"><div className = "h2" style = {textstyle}> ~Search on the map: The search-bar is in the top right. click to set a marker and find dorms nearby! ~ </div>
		</div>
		<div className = "container-fluid">
			<div className="row">
			<div className="col-sm-1">
				<label>Radius:</label>
				<select required name="radius" className="custom-select mb-2" onChange={this.distanceFilter}>
					<option defaultValue="1">1 mile</option>
					<option value="2">2 miles</option>
					<option value="3">3 miles</option>
					<option value="4">4 miles</option>
					<option value="5">5 miles</option>
					<option value="10">10 miles</option>
					></select>
			</div>
		</div>
		<div className="row">
			<div className="col-sm-2">
				<label>Room Type:</label>
				<select required name="room_type" className="custom-select mb-2" onChange={this.roomFilter}>
					<option defaultValue="Any">Any</option>
					<option value="Single">Single</option>
					<option value="Double">Double</option>
					<option value="Triple">Triple</option>
					<option value="Quad">Quad</option>
					></select>
			</div>
			<div className="col-sm-2">
				<label>Bathroom:</label>
				<select required name="bathroom" className="custom-select mb-2" onChange={this.bathroomFilter}>
					<option defaultValue="Any">Any</option>
					<option value="In Dorm">In Dorm</option>
					<option value="On Floor">On Floor</option>
					></select>
			</div>
			<div className="col-sm-2">
				<label>Dining:</label>
				<select required name="dining" className="custom-select mb-2" onChange={this.diningFilter}>
					<option defaultValue="Any">Any</option>
					<option value="Dining Hall">Dining Hall</option>
					<option value="In Dorm Kitchen">In Dorm Kitchen</option>
					></select>
			</div>
			<div className="col-sm-2">
				<label>Internet:</label>
				<select required name="internet" className="custom-select mb-2" onChange={this.internetFilter}>
					<option defaultValue="Any">Any</option>
					<option value="Wifi">Wifi</option>
					<option value="Ethernet">Ethernet</option>
					<option value="Both">Both</option>
					></select>
			</div>
			<div className="col-sm-1">
				<label>Gym?:</label>
				<select required name="fitness" className="custom-select mb-2" onChange={this.fitnessFilter}>
					<option defaultValue="Any">Any</option>
					<option value="Yes">Yes</option>
					<option value="No">No</option>
					></select>
			</div>
			<div className="col-sm-2">
				<label>Laundry:</label>
				<select required name="laundry" className="custom-select mb-2" onChange={this.laundryFilter}>
					<option defaultValue="Any">Any</option>
					<option value="In Dorm">In Dorm</option>
					<option value="On Floor">On Floor</option>
					></select>
			</div>
			<div className="col-sm-1">
				<label>A/C?:</label>
				<select required name="airConditioning" className="custom-select mb-2" onChange={this.airConFilter}>
					<option defaultValue="Any">Any</option>
					<option value="Yes">Yes</option>
					<option value="No">No</option>
					></select>
			</div>
		</div>
	</div>
		<div className="container-fluid">
			<div className="row">
				<div className="col-md-4" style={cardstyle} >
		<div className="flex-container-fluid" style={mystyle}>
			<div className="container-fluid"  >
				<h3>Top 30 Results (0 stars means no ratings)</h3>
				<DynamicCards passDataToDynamicCards = {this.state.cardData}/>
			</div>
	  	</div>	
				</div>
				<div className="col-lg-8 w-50">
				<Link
					to={{
						pathname: '/addDormForm',
						dormFormProps: {
							coords: this.state.passedCoordsFromMap,
						}
						// This link sets the background in location state.
					}}>
					<button className="btn btn-secondary" onClick=
						{(event) => {
							is_user_logged_in(isLoggedIn => {
								if (isLoggedIn) {
									this.passUpCoord()
									console.log('should redirect to addDormForm')
								} else {
									console.log('not authed?')
									event.preventDefault()
								}
							})

						}
						}>Don't see your dorm? ADD ONE!
					</button>
				</Link>
				<h6>Click on the approximate location of your residence then hit the above button!</h6>
			<OpenMap passCardsFromOpenMap = {this.passedCardsFromMap} 
					 passCoordFromOpenMap = {this.passedCoordFromMap}
					 radius={this.state.radius}
					 room_type={this.state.room_type}
					 bathroom={this.state.bathroom}
					 internet={this.state.internet}
					 dining={this.state.dining}
					 fitness={this.state.fitness}
					 airConditioning={this.state.airConditioning}
					 laundry={this.state.laundry}
			/>
				</div>
			</div>
		</div>
		</React.Fragment>
    )
  }
}


export default SearchPage;