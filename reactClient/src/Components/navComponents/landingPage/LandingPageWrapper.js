import React, { Component } from 'react';
import Navbar from '../navigation/Navbar';
import LandingPage from './LandingPage';


class LandingPageWrapper extends Component {

  render(){
    return(
      <div>
        <Navbar />
        <LandingPage />
      </div>
    )
  }
}

export default LandingPageWrapper;