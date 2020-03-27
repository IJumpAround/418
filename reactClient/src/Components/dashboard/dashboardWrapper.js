import React, { Component } from 'react'
import SideBar from './sidebar';
import UserDataSection from './userDataSection';
import HistorySection from './historySection';
import './dashboardWrapper.css'

 class dashboardWrapper extends Component {

  render() {

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
    )
  }
}

export default dashboardWrapper;