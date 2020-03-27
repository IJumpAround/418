import React from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import ReactLeafletSearch from "react-leaflet-search";


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

outputHandler = (event) => {
  let out= event.target.output;
  let val = event.target.value;
  this.setState({[out]: val});
}

 cardLoadHandler = () =>  {
   var url = 'http://localhost:5001/loadcards'
  fetch(url)
  .then((result) => result.json())
  .then(result => {
       var manipResult = result
       this.setState({ cardData : manipResult})
     });
   }

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