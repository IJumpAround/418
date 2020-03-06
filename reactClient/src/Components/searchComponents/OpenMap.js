import React from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'


class OpenMap extends React.Component {
    constructor(props) {
       super(props);
       this.state = {
         proxPosition: [42.686063, -73.824688] , 
         latlng: {
          lat: 42.686063,
          lng: -73.824688,
          }
      }
       
  
       


  
}
setMarker = (e) => {
  this.setState({latlng: e.latlng})
  this.setState({proxPosition: [e.latlng.lat, e.latlng.lng]})
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
      };
        return(
          
            <Map id="mymap" center={this.state.proxPosition} zoom={16} style={mystyle}
            onClick={this.setMarker}
            
            >
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