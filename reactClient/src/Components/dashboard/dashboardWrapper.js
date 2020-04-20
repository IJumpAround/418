import React from 'react'
import {Switch, useLocation,Route} from 'react-router-dom';
import SideBar from './sidebar';
import Modal from './modal';
import UserDataSection from './userDataSection';
import HistorySection from './historySection';
import './dashboardWrapper.css'

function DashboardWrapper() {
  
  return (
    <div className="wrapper">
        <SideBar />
      <div className="container-fluid">
       <div className="custom-container mt-4 border rounded">
        <div className="row container-fluid pt-4 pl-4 justify-content-center">
          <div className="col-sm-9">
            <UserDataSection />
            <HistorySection />
          </div>
        </div>
      </div>
      </div>   
    </div> 
    
    


    ); 
}

export default DashboardWrapper;