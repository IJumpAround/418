import React from 'react';
import {Switch,Route, useLocation} from 'react-router-dom';
import DashBoardWrapper from '../../Dash/dashboardWrapper';
import Modal from './modal';

function ModalSwitch() {

  let location = useLocation();
  //When settings is clicked, background(dashboard) state is set.
  //Allows background to show behind the settings modal
  let background = location.state && location.state.background;

  return (
   <div>
     <Switch location={background || location}>
        <Route path="/dashboard" children={<DashBoardWrapper />} />
     </Switch>
     {/* Show the settings modal when a dashboard page is set in background */}
     {background && <Route path="/dashboard/settings" children={<Modal />} />}
   </div>
  );
}

export default ModalSwitch;