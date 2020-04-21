import React, { Component } from 'react'
import axios from 'axios';

 class UpdateStudentInfo extends Component {

  constructor(props){
    super(props);
    this.state = {status: '', quad: ''}

    this.handleChangeStatus = this.handleChangeStatus.bind(this);
    this.handleChangeQuad = this.handleChangeQuad.bind(this);
    this.handleSumbitStudentInfo = this.handleSumbitStudentInfo.bind(this);
  }
  //selected student status is set as state
  handleChangeStatus(e){
    this.setState({status: e.target.value})
  }
 //selected student quad is set as state
  handleChangeQuad(e){
    this.setState({quad: e.target.value})
  }

  handleSumbitStudentInfo(e){
    e.preventDefault();
    //student info object
    const studentInfo = {
      status: this.state.status,
      quad: this.state.quad
    }
    //need endpoint for student info
    axios.post('', studentInfo)
      .then()
      .catch()
  }

  render() {

    return (
  

    <div className="col-sm-6">
      {/*User upload information section*/}
    <h4 className="text-center mb-4"><u>Update Student Information</u></h4>
      <form className="form-group justify-content-center" onSubmit={this.handleSumbitStudentInfo}>           
      <div className="row justify-content-center">
        <div className="col-sm-7">
          <label>Student Status:</label>                
            <select name="student_status" onChange={this.handleChangeStatus} value={this.state.status} className="custom-select mb-2" >
              <option value="select">Select</option>
              <option value="Freshman">Freshman</option>
              <option value="Sophomore">Sophomore</option>
              <option value="Junior">Junior</option>
              <option value="Senior">Senior</option>
            ></select>          
        </div>   
       </div>              
      <div className="row justify-content-center">
        <div className="col-sm-7">
          <label>Quad:</label>                
            <select name="quad" onChange={this.handleChangeQuad} value={this.state.quad} className="custom-select mb-2" >
              <option value="Colonial">Colonial</option>
              <option selected="selected">Dutch</option>
              <option value="Indian">Indian</option>
              <option value="State">State</option>
            ></select>
        </div>
      </div>
      <div className="row justify-content-center">
        <button className="btn btn-dark btn-sm" type="submit">Update</button>
      </div>
     </form>    
    </div>
  

    )
  }
}

export default UpdateStudentInfo;