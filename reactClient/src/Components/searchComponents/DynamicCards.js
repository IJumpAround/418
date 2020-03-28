import React from 'react'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
		Grid,
		Card,
		CardContent,
		Typography,
		CardHeader
	} from '@material-ui/core/'
	
	
	class DynamicCards extends React.Component{ 
		constructor(props) {
			super(props);
			this.state = {
				
				imagedesc: {
					display: "flex"
				},

				useStyles : {
					
						padding: 5,
						width: "100vh",
						overflowY: "scroll",
						zindex: '10'
					
				},

				data: this.props.passDataToDynamicCards
		   }
		   
		}

		

		render(){
		return (
				<div className='Cards' style={this.state.useStyles}>
				<Grid
					container
					spacing={0}
					direction="column"
					justify="flex-end"
					alignItems="flex-end"
					
				>
					{this.props.passDataToDynamicCards.map(elem => (
						<Grid item xs={6} sm={6} md={12} key={this.props.passDataToDynamicCards.indexOf(elem)}>
							<Card>
								<CardHeader
									title={`Dorm : ${elem.Dorm}`}
									subheader={` ${elem.Desc}` }
								/>
								<CardContent>
									<Typography  gutterBottom>
										<div className="flex-container" style={this.state.imagedesc}>
										<img src={require('../../img/stockdormimage.jpg')} width="50%%" height="180px" alt=""/>
										<p> description header </p>
										</div>
									</Typography>
								</CardContent>
							</Card>
						</Grid>
					))}
				</Grid>
			</div>
					
				
				 
			
			
		)
	}
	}

export default DynamicCards