  
import React from 'react'
import {Link, useLocation} from 'react-router-dom';
import ProfileImgPlaceholder from '../../img/placeholder-profile-male-500x500.png';
import './sidebar.css';

function Sidebar() {

  //useLocation hook, returns location object that represents current url
  let location = useLocation();

    return (    
      //Admin Panel Sidebar
      <div className="sidebar d-flex flex-column">       
        <div className="mt-4">
          {/*Profile Picture Section*/}
          <div className="text-center">
            <img src={ProfileImgPlaceholder} className="bg-dark rounded-circle border border-3" alt="" height="" width="120px" />
          </div>         
            {/*Student Information Section*/}
            <div className="text-light text-left px-3 py-2">
              <h6 className="text-center">Donald Trump</h6>
                <hr />
                  <p className="mb-0">Senior</p>
                  <p className="mb-0">Dutch Quad</p>
                <hr />
                <Link 
                  to={{
                    pathname: '/dashboard/settings',
                    // This link sets the background in location state.
                    state: { background: location }
                  }}>
                   <button className="btn btn-dark">Settings</button>
                </Link>
            </div>   
          </div>
        </div>    
     )
   }

export default Sidebar;