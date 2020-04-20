import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';

function Modal() {
  let history = useHistory();

  const [status, showModal] = useState(false);

 
  let back = e => {
    e.stopPropagation();
    history.goBack();
  };

  return (
    <div
      onClick={()=> showModal(true)}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        background: "rgba(0, 0, 0, 0.2)"
      }}
    >
      <div
        className="Modal"
        style={{
          position: "absolute",
          background: "#fff",
          top: 80,
          left: "10%",
          right: "10%",
          padding: 15,
          border: "2px solid #444"
        }}
      >
        <h1>Settings</h1>
        <form>
          <label>Update Profile Picture</label>
          <br />
          <input type="file"/>
          <br />
          <button>Update</button>
        </form>
        <button type="button" onClick={back}>
          Close
        </button>
      </div>
    </div>
  );
}

export default Modal;