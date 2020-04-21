import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import UploadImage from './uploadImage';


function Modal() {
  //useHistory hook, helps with navigating or changing routes
  let history = useHistory();
  //useState hook, allows state variables inside functinal components
  const [status,showModal] = useState(false);


  
  let back = e => {
    e.stopPropagation();
    history.goBack(); //loads previous url
  };

  return (
    //displays modal on click
    <div
      onClick={()=> showModal(status)}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        background: "rgba(0, 0, 0, 0.08)"
      }}
    >    
      <div
        className="Modal"
        style={{
          position: "absolute",
          background: "#fff",
          top: 80,
          left: "12%",
          right: "12%",
          padding: 10,
          border: "3px solid #564D80"
        }}
      >
      {/*Settings Modal*/}
      <h1 className="text-center">Settings</h1> 
        <div className="row justify-content-center">
        <div className="form-group">
        <UploadImage />
          <br />           
        </div> 
          <div className="col-sm-6">
            {/*User upload information section*/}
          <h4 className="text-center mb-4"><u>Update Student Information</u></h4>
            <div className="form-group justify-content-center">           
            <div className="row justify-content-center">
              <div className="col-sm-7">
                <label>Student Status:</label>                
                  <select name="student_status" className="custom-select mb-2" component="select">
                    <option value="Freshman">Freshman</option>
                    <option value="Sophomore">Sophomore</option>
                    <option value="Junior">Junior</option>
                    <option selected="selected">Senior</option>
                  ></select>
              </div>   
             </div>              
            <div className="row justify-content-center">
              <div className="col-sm-7">
                <label>Quad:</label>                
                  <select name="quad" className="custom-select mb-2" component="select">
                    <option value="Colonial">Colonial</option>
                    <option selected="selected">Dutch</option>
                    <option value="Indian">Indian</option>
                    <option value="State">State</option>
                  ></select>
              </div>
            </div>
            <div className="row justify-content-center">
              <button className="btn btn-dark btn-sm">Update</button>
            </div>
           </div>    
          </div>
        </div> 
        <button className="btn btn-dark"type="button" onClick={back}>
          Close
        </button>
      </div>
    </div>
  );
}

export default Modal;