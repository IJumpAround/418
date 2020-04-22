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
import {Link} from 'react-router-dom';	
	
	class DynamicCards extends React.Component{ 
		constructor(props) {
			super(props);
			this.state = {
				imagedesc: {
					display: "flex",
					width: "100%"
				},
				useStyles : {
						padding: 5,
						width: "100%",
						overflowY: "scroll",
						zindex: '10'	
				}
		   }
		}

		

		render(){
			return (
				<React.Fragment>
					<div className='Cards' style={this.state.useStyles}>
						<Grid
							container
							spacing={0}
							direction="column"
							justifyContent="flex-start"
							alignItems="flex-start"		
						>
							{this.props.passDataToDynamicCards.map(elem => (
								<Grid item xs={12} sm={12} md={12} key={this.props.passDataToDynamicCards.indexOf(elem)}>
									<Card>
										<CardHeader
											title = {<div><Link to={`/singleDorm/${elem.Dorm_id}`}> {`${elem.Building} ${elem.Room}`} </Link></div>}
											subheader={` ${elem.Quad} Quad, ${elem.Address}` }	
										/>
										<CardContent>
											<Typography  component={'span'}>
												<div className="container-fluid" style={this.state.imagedesc}>
													<img src={require('../../img/stockdormimage.jpg')} width = "245px" height = "144px" alt=""/>
												</div>
											</Typography>
										</CardContent>
									</Card>
								</Grid>
							
							 ) ) } 
							<p>If this is empty, no logged dorms are within the specified range from your marker</p>	
						</Grid> 
					</div>
					
				</React.Fragment>
			)
		}
	}

export default DynamicCards