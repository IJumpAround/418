import React, { Component } from 'react';
import ProfileImgPlaceholder from '../../img/placeholder-profile-male-500x500.png';
import '../dashboard/sidebar.css';
 class sidebar extends Component {
 
  render() {

    return (
    

   <div className="custom" style={{backgroundImage: "linear-gradient(to bottom, rgba(200,0,0,0), rgba(86,77,128,1))"}}>
     <div className="custom-container mt-4 border rounded" style={{backgroundColor: "#fafafa"}}>

     <div className="row container-fluid pt-4 pl-4 justify-content-center" >
      <div className="col-sm-3 card pt-2 ">
        <img className="card-img-top" src={ProfileImgPlaceholder} height="190"  alt="Profile Image" />
        <div className="card-body">
         <div className="card-title">Michael Sollazzo</div>
         <hr />
         <div className="card-title">Status: Senior</div>
         <hr />
         <div className="card-title">Quad: State Quad</div>
        </div>
      </div>
      {/*************************************/}

      <div className="h-100 col-sm-9 mt-3">       
        <div className="table table-striped border rounded">
          <thead>
            <tr>
              <th>User Data</th>
            </tr>
          </thead>
          <tbody>
                <tr>
                  <td style={{width: "10%", background: "#97A1C3"}}>Posts:</td>
                </tr>
                <tr>
                  <td>Tags:</td>
                </tr>
                <tr>
                  <td style={{background: "#97A1C3"}}>Reviews:</td>
                </tr>    
          </tbody>
        </div>
      </div>
     </div> 
     </div>
   </div>
    
      

    )
  }
}

export default sidebar;