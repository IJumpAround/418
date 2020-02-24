import React, { Component } from 'react'
import './navigation/Sidebar.css';


class Sidebar extends Component {
  render() {
    return (
      <nav class="custom-navbar">
        <div class="navbar-brand text-light pt-3">Rate My Dorm</div>
        <hr class="" />
        <div class="py-2"></div>
        <ul class="nav bg-light flex-column mx-0 py-0">
          <button type="button" class="nav-link bg-light text-dark btn-block text-center shadow-lg">
            <li class="nav-item">My Dashboard</li>
          </button>
          <button type="button" class="nav-link bg-light text-dark btn-block text-center shadow-lg">
            <li class="nav-item">My Dashboard</li>
          </button>
          <button type="button" class="nav-link bg-light text-dark btn-block text-center shadow-lg">
            <li class="nav-item">My Dashboard</li>
          </button>
          <button type="button" class="nav-link bg-light text-dark btn-block text-center shadow-lg">
            <li class="nav-item">My Dashboard</li>
          </button>
          <button type="button" class="nav-link bg-light text-dark btn-block text-center shadow-lg">
            <li class="nav-item">My Dashboard</li>
          </button>


        </ul>

      </nav>
    )
  }
}


export default Sidebar;