import React from 'react';
//import Home from './Home';
import DashBoardWrapper from './dashboardWrapper';
import Modal from './modal';
import {Switch,Route, useLocation} from 'react-router-dom';
import SideBar from './sidebar';

function ModalSwitch() {
  let location = useLocation();
  let background = location.state && location.state.background;
  return (
   <div>
   
     <Switch location={background || location}>
      <Route path="/dashboard" children={<DashBoardWrapper />} />
     </Switch>

     {background && <Route path="/dashboard/settings" children={<Modal />} />}
  

   </div>
  );
}

export default ModalSwitch;
