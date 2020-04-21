import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import UploadImage from './uploadImage';
import UpdateStudentInfo from './updateStudentInfo';

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
        <UpdateStudentInfo />
        </div> 
        <button className="btn btn-dark"type="button" onClick={back}>
          Close
        </button>
      </div>
    </div>
  );
}

export default Modal;