import React from 'react';
import axios from 'axios';

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
  let file = this.uploadInput.files[0]; //files is a blob?
  console.log(file);
  
  // Split the filename to get the name and type
  let fileParts = this.uploadInput.files[0].name.split('.');
  console.log(fileParts);
  
  let fileName = fileParts[0];
  let fileType = fileParts[1];
  console.log("Preparing the upload");
  //Need endpoint for s3 upload
  axios.post("",{
    fileName : fileName,
    fileType : fileType
  })
  .then(response => {
    var returnData = response.data.data.returnData;
    console.log(returnData);
    
    var signedRequest = returnData.signedRequest;
    console.log(signedRequest);
    
    var url = returnData.url;
    console.log(url);
    
    this.setState({url: url})
    console.log("Recieved a signed request " + signedRequest);
    //need endpoint to store image in database
    axios.post("", {                      
      url : url
    }).then(() => console.log("Sent url to db"))
      .catch((err) => console.log(err));
   // Put the fileType in the headers for the upload
    var options = {
      headers: {
        'Content-Type': fileType
      }
    };
    axios.put(signedRequest,file,options)
    .then(result => {
      console.log("Response from s3")
      console.log(options);
      
      this.setState({success: true});
    })
    .catch(error => {
      alert("ERROR " + JSON.stringify(error));
    })
  })
  .catch(error => {
    alert(JSON.stringify(error));
  })
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