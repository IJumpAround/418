import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import { makeStyles } from '@material-ui/core/styles'
import {
		Grid,
		Card,
		CardContent,
		Typography,
		CardHeader
	} from '@material-ui/core/'

	var useStyles = makeStyles(theme => ({
		root: {
			padding: 5,
			width: "1000",
		}
	}))
	
	export default function AltCard() {
		var classes = useStyles()
		var data = [
			{ Dorm: 1, Desc: "something", Tags: "Tag", Image: '' },
			{ Dorm: 2, Desc: "something", Tags: "Tag", Image: '' },
			{ Dorm: 3, Desc: "something", Tags: "Tag", Image: '' },
			{ Dorm: 4, Desc: "something", Tags: "Tag", Image: '' },
		]
		return (
				<div className={classes.root}>
					<Grid
						container
						spacing={0}
						direction="row"
						justify="xs-flex-end"
						alignItems="flex-start"
					>
						{data.map(elem => (
							<Grid item xs={12} sm={6} md={3} key={data.indexOf(elem)}>
								<Card>
									<CardHeader
										title={`Dorm : ${elem.Dorm}`}
										subheader={` ${elem.Desc}` }
									/>
									<CardContent>
										<Typography  gutterBottom>
										<img src={require('../../img/stockdormimage.jpg')} width="80%"  alt/>
										</Typography>
									</CardContent>
								</Card>
							</Grid>
						))}
					</Grid>
				</div>
				 
			
			
		)
	}
	
	