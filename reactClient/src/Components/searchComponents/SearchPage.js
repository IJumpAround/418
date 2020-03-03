import React, { Component } from 'react'
import OpenMap from './OpenMap';
import DynamicCards from './DynamicCards';
import ScrollArea from 'react-scrollbar';
import NavBar from '../navComponents/navigation/Navbar';

 class SearchPage extends Component {
  render() {
    return (
    	<div>
        <NavBar/>
			<ScrollArea
					speed={0.8}
					className="area"
					contentClassName="content"
					horizontal={false}
				>
				<div><DynamicCards /></div>
         	</ScrollArea>
			<OpenMap />
			</div>
    )
  }
}


export default SearchPage;