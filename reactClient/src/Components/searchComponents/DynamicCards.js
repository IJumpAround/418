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
					display: "flex"
				},
				useStyles : {
					
						padding: 5,
						width: "100vh",
						overflowY: "scroll",
						zindex: '10'
					
				}
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
										title = <div>
													<Link to={`/dashboard/`}> 
														{`${elem.Building} ${elem.Room}`} 
													</Link>	
												</div>
										subheader={` ${elem.Quad} Quad, ${elem.Address}` }	
									
									/>
									<CardContent>
										<Typography  component={'span'}>
											<div className="flex-container" style={this.state.imagedesc}>
											<img src={require('../../img/stockdormimage.jpg')} width="50%%" height="180px" alt=""/>
											</div>
										</Typography>
									</CardContent>
								</Card>
							</Grid>
						
						) ) } 
					</Grid> 
				</div>	
			)
		}
	}

export default DynamicCards