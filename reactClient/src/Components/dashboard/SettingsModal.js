import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import ModalSwitch from './ModalSwitch';
import HistorySection from './historySection';


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
