import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import ModalSwitch from './ModalSwitch';

function SettingsModal() {

  return (
   <div>
    <Router>
      <ModalSwitch />
    </Router> 
   </div>
  );
}

export default SettingsModal;
