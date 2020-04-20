import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import ModalSwitch from './ModalSwitch';

function SettingsModal() {
  //ModalSwitch has to be wrapped with Router for location hook to work
  return (
   <div>
    <Router>
      <ModalSwitch />
    </Router> 
   </div>
  );
}

export default SettingsModal;
