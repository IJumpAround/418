import React from 'react';
import axios from 'axios';
import {auth} from '../../../../utils/auth'
import {uploadImage, addProfileImageToDb} from "../../../../utils/images";

class UploadImage extends React.Component{

  constructor(props){
    super(props);
    this.state =({
      success: false,
      url : ""
    })
    this.handleChange = this.handleChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      success : false,
      url : "" 
    })
  }

 // Perform the upload
 handleUpload = (ev) => {
  let file = this.uploadInput.files[0];
  console.log(file);
  if (file) {
      if(auth.isAuthenticated) {
          uploadImage(file)
              .then((url) => {
                  console.log('url for profile imag eupload', url)
                  let result = addProfileImageToDb(url, auth.user_id)
              })
              .catch(err => {
                  console.log('error during upload')
              })

      }
      else {
          alert('You must be logged in to do that!')
      }

  }

}

  render(){

    return(
      <div className="row justify-content-center">
       <div className="col-sm-12">
        {/*User upload picture section*/}
        <h4 className="text-center mb-4"><u>Update Profile Picture</u></h4>
          <div className="row justify-content-end">
            <input onChange={this.handleChange} ref={(ref) => {this.uploadInput = ref; }} type="file"/>
          </div>                        
        <br/>
       </div>
       <button className="btn btn-dark btn-sm" onClick={this.handleUpload}>Upload Image</button>
      </div>
    )
  }

}

export default UploadImage;