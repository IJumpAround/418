import React from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import ReactLeafletSearch from "react-leaflet-search";
import axios from '../../utils/axiosInstance';

class OpenMap extends React.Component {
    constructor(props) {
       super(props);
       this.state = {
         proxPosition: [42.686063, -73.824688] , 
         latlng: {
          lat: 42.686063,
          lng: -73.824688,
          },

          cardData: [
            { Dorm: 1, Desc: "something", Tags: "Tag", Image: '' },
            { Dorm: 2, Desc: "something", Tags: "Tag", Image: '' },
            { Dorm: 3, Desc: "something", Tags: "Tag", Image: '' },
            { Dorm: 4, Desc: "something", Tags: "Tag", Image: '' },
            { Dorm: 4, Desc: "something", Tags: "Tag", Image: '' },
          ]
      }
  
}

passUpCardData = () => {
  this.props.passCardsToOpenMap(this.state.cardData);
}

 cardLoadHandler = () =>  {
  console.log("marker location changed");
  //Changing cards begins
  axios.post('search/load_cards', {
    latitude: this.state.latlng.lat,
    longitude: this.state.latlng.lng
})
    .then((result) => {
        console.log('result')
        if (result) {
            console.log(Object.entries(result));
            var manipResult = result.data
            this.setState({ cardData : manipResult})
            this.passUpCardData()
        }
        
    })
    .catch((error) => {
        console.log('error')
        if (error) {
            console.log(Object.entries(error))
        }
    })
  };
  // var url = 'http://localhost:5001/loadcards'
  //fetch(url)
  //.then((result) => result.json())
  //.then(result => {
    //   var manipResult = result
      // this.setState({ cardData : manipResult})
     //});
   //}

setMarker = (event) => {
  this.setState({latlng: event.latlng})
  this.setState({proxPosition: [event.latlng.lat, event.latlng.lng]})
  };
    
render(){
     
  var proxMarker =  <Marker position = {this.state.latlng}>
                     <popup></popup>
                    </Marker>
               
      const mystyle = {
        position: "relative",
        height: "100%-44px",
        width: "100%",
        zindex: '1'
      }


        return(
           
            <Map id="mymap" center={this.state.proxPosition} zoom={17} style={mystyle}
            onClick={(event) =>
              {
              this.setMarker(event)
              this.cardLoadHandler()
              
              }
            }
            >
            <ReactLeafletSearch 
              inputPlaceholder="input desired location"
              zoom={15} 
              showMarker={false}
              showPopup={false}
            />
                <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                {proxMarker}
            </Map>
           
        )
    }
    
}

export default OpenMap;