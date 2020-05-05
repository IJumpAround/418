import React, {useState}from 'react'
import {Link, useLocation} from 'react-router-dom';
import ProfileImgPlaceholder from '../../../img/placeholder-profile-male-500x500.png';
import './sidebar.css';
import {retrieveProfileImage} from '../../../utils/images';
import {auth} from '../../../utils/auth';

function Sidebar(props) {
  console.log(props);
  var firstName = props.userInfo.firstName;
  var lastName = props.userInfo.lastName;

  //useLocation hook, returns location object that represents current url
  let location = useLocation();

  const [image, setImage] = useState('');

  var user_id = auth.user_id;
  var userImage = retrieveProfileImage(user_id);
 
  userImage.then((list) => {
    const image = list[0];
    setImage(image)
  })
  
  /* Need to figure out how to manage state for the profile image because this is a functional component */

  /* Need to set img url and fetch image from database*/
 
    return (    
      //Admin Panel Sidebar
      <div className="sidebar d-flex flex-column">       
        <div className="mt-4">
          {/*Profile Picture Section*/}
          <div className="text-center">
          
            <img src={image} className="bg-dark rounded-circle border border-3" alt="" height="" width="120px" />
          </div>         
            {/*Student Information Section*/}
            <div className="text-light text-left px-3 py-2">
                <h6 className="text-center">{firstName} {lastName}</h6>
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