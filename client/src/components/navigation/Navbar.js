import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import '../navigation/Navbar.css';


 class Navbar extends Component {
  render() {
    return (
      
      <nav class="navbar navbar-expand-sm navbar-custom transparent">
        <Link class=" pl-3 custom-color my-text" to='/'>Rate My Dorm</Link>
        <button class="navbar-toggler test" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
        <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-end " id="collapsibleNavbar">   
          <ul class="navbar-nav">
            <li class="nav-item">
              <Link class="nav-link custom-color" to='/'>Search</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link custom-color" to='/'>Dashboard</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link custom-color" to='/'>Login</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link custom-color" to='/'>SignUp</Link>
            </li>
          </ul>
        </div> 
      </nav> 
    )
  }
}


export default Navbar;