import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'

class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		profImage: "./p5morgana.png",
		profName: "Morgana",
		profDesc: "Is he a cat? Is he a car? Was he human before? We may never know..."
		}
	};
	
  
  render() {
    return (
			<React.Fragment>
			<div className="container-left">
			<div className="column">
				<div className="col-4" style={{String: "background-color:grey"}} >
					<div className="card bg-dark text-white">
					  <div className="card-header">{this.state.profName}</div>
					  		<div className="card-body">
					  		<img src={require(`${this.state.profImage}`)} width="80%"height="80%" alt="Logo" /> 
					  		</div>
					  <div className="card-footer"><p>BIO: {this.state.profDesc}</p></div>
					</div>
				</div>
			</div>
			</div>
			</React.Fragment>
	)
}
}

export default Profile;

