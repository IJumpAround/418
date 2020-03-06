import React from 'react'
import { render } from 'react-dom'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'



class OpenMap extends React.Component {
    constructor(props) {
       super(props);
       this.state = {
       position: [42.686063, -73.824688],
       }
   };

    render(){
      const mystyle = {
        position: "relative",
        height: "100%-44px",
        width: "100%",
        zindex: '1'
      };
        return(
          
            <Map center={this.state.position} zoom={16} style={mystyle}>
                <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                <Marker position={this.state.position}>
                <popup /> {/*placeholder position until click functionality added*/}
                </Marker>
            </Map>
           
        )
    }
}

export default OpenMap;