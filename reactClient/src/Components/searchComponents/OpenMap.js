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
        height: "100%",
        width: "100%"
      };
        return(
          <div className="container-left" >
            <Map center={this.state.position} zoom={13} style={mystyle}>
                <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                <Marker position={this.state.position}>
                <popup /> {/*placeholder position until click functionality added*/}
                </Marker>
            </Map>
            </div>
        )
    }
}

export default OpenMap;