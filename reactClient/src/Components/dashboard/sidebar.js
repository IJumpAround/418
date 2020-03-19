import React, { Component } from 'react'
import ProfileImgPlaceholder from '../../img/placeholder-profile-male-500x500.png';
import './sidebar.css';

 class sidebar extends Component {

  render() {
    return (
    
      <div className="sidebar d-flex flex-column">
        <div className="mt-4">
          <div className="text-center">
            <img src={ProfileImgPlaceholder} className=" bg-dark rounded-circle border border-3 " alt="profile image" height="" width="120px" />
          </div>
          
            <div className="text-light text-left px-3 py-2">
                <h6 className="text-center">Donald Trump</h6>
                <hr />
                <p className="mb-0">Senior</p>
                <p className="mb-0">Dutch Quad</p>
                <hr />
                <button className="btn btn-dark">Settings</button>
            </div>
            
        </div>
      </div> 
    )
  }
}


export default sidebar;