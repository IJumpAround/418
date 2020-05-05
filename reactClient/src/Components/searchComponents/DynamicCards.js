import React from 'react'
import {
		Grid,
		Card,
		CardContent,
		Typography,
		CardHeader
	} from '@material-ui/core/'
import StarRatingComponent from 'react-star-rating-component';
import {Link} from 'react-router-dom';	
	
	class DynamicCards extends React.Component{ 

		render(){
			return (
				<React.Fragment>
					<div className='Cards' >
						<Grid
							containerFluid
							spacing={0}
							direction="column"
							justifyContent="flex-start"
							alignItems="flex-start"
								
						>
							{this.props.passDataToDynamicCards.map(elem => (
								<Grid item xs={12} sm={12} md={12} key={this.props.passDataToDynamicCards.indexOf(elem)}>
									<Card className="shadow">
										<CardHeader
											title = {<div><Link to={`/singleDorm/${elem.Dorm_id}`}> {`${elem.Building} ${elem.Room}`} </Link></div>}
											subheader={<h6>{` ${elem.Quad} Quad, ${elem.Address} `}
											<StarRatingComponent
												id = "dorm_user_rating"
												name = "starRate"
												starCount = {5}
												value = {elem.Rating}
												emptyStarColor = "#564D80"
												/> </h6>}
										></CardHeader>
										<CardContent>
											<Typography  component={'span'}>
												 
												<div className="container-fluid" >
													<img src={`${elem.Image}`} width = "245px" height = "144px" alt=""/>
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