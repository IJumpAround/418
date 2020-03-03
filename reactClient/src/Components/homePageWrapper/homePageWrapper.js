import React from 'react';
import NavBar from '../navComponents/navigation/Navbar';
import HomePage from '../homePage/HomePage';
import 'bootstrap/dist/css/bootstrap.min.css'


function HomePageWrapper(){

    return(
      <div>
        <NavBar />
        <HomePage />
      </div>
    )
}

export default HomePageWrapper;