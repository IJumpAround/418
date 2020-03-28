import React from 'react'
import axios from 'axios';
import {faBed} from "@fortawesome/free-solid-svg-icons";
import {faCommentDots} from "@fortawesome/free-solid-svg-icons";
import {faMap} from "@fortawesome/free-solid-svg-icons";
import {faPhotoVideo} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './registrationPage.css'


class RegistrationPage extends React.Component {
   
    state = {
        fields: { 
          firstName: '',
          lastName: '',
          email: '',
          password: ''}
    }

    handleInputChange = (e) => {
        this.setState({
            fields: {
                ...this.state.fields,
                [e.target.name]: e.target.value
            }
        });
    }

    handleSubmitForm = (e) => {
      e.preventDefault();
      console.log("Sign Up was clicked");
      //Get route 
      axios.get('',{

      })
    }

    render() {
        const {firstName, lastName, email, password} = this.state.fields;
        return (
            <div className="home">
                <div className="container-fluid  justify-content-center py-4 ">
                    <div className="row align-items-center">
                        <div className="col-lg-8 text-center pb-5">
                        <br/>
                        <h3 className="text-light h1 ">Find the dorm you deserve</h3>
                            <br/>
                            <ul className='list-group text-light greeting'>
                              
                                <li className="list-inline-item custom-icon-color">
                                    <FontAwesomeIcon icon={faBed}/>  Find a great dorm.
                                </li>
                                <li className="list-inline-item custom-icon-color">
                                    <FontAwesomeIcon icon={faCommentDots}/>  Leave a review to help others.
                                </li>
                                <li className="list-inline-item custom-icon-color">
                                    <FontAwesomeIcon icon={faPhotoVideo}/>  View images of potential dorms.
                                </li>
                                <li className='list-inline-item custom-icon-color'>
                                    <FontAwesomeIcon icon={faMap}/>  Check out the interactive campus map.
                                </li>
                              
                            </ul>
                           
                        </div>
                        <div className='col-12  col-md-3 py-4 rounded signUp'>
                            <form  onChange={this.handleInputChange} onSubmit={this.handleSubmitForm} id='registrationForm'>
                                <div className='row'>
                                    <div className='col-12'>
                                        <h1>Sign up</h1>
                                        <h5>Find your new dorm</h5>
                                        <br/>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-6'>
                                        <input className='input-group-text w-100' name="firstName" type='text' placeholder='First name' value={firstName}/>
                                    </div>

                                    <div className='col-6'>
                                        <input className='input-group-text w-100' name="lastName" type='text' placeholder='Last name' value={lastName}/>
                                    </div>

                                </div>
                                <div className='row mt-2'>
                                    <div className='col-12'>
                                        <input className='input-group-text w-100'  name="email" type='email' placeholder='Email address' value={email}/>
                                    </div>
                                </div>
                                <div className='row mt-2'>
                                    <div className='col-12'>
                                        <input className='input-group-text w-100' name='password' type='password' placeholder='Password' value={password}/>
                                    </div>
                                </div>
                                <button className="btn btn-primary mt-2">Sign Up</button>
                               {/* 
                               
                                <div className='row'>
                                    <div className='col-12'><br/>
                                        Enter your birthdate</div>
                                </div>
                                <div className='row'>
                                    <div className='col-3'>

                                        <div className="dropdown " >
                                            <button className="btn btn-outline-secondary dropdown-toggle" type="button"
                                                    id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                                                    aria-expanded="false">
                                                Month
                                            </button>
                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <button className="dropdown-item" type="button">January</button>
                                                <button className="dropdown-item" type="button">February</button>
                                                <button className="dropdown-item" type="button">March</button>
                                                <button className="dropdown-item" type="button">April</button>
                                                <button className="dropdown-item" type="button">May</button>
                                                <button className="dropdown-item" type="button">June</button>
                                                <button className="dropdown-item" type="button">July</button>
                                                <button className="dropdown-item" type="button">August</button>
                                                <button className="dropdown-item" type="button">September</button>
                                                <button className="dropdown-item" type="button">October</button>
                                                <button className="dropdown-item" type="button">November</button>
                                                <button className="dropdown-item" type="button">December</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-4'>
                                        <input className="input-group-text w-100" id="day" type='number' min='1' max='31' placeholder='Day'/>
                                    </div>
                                    <div className='col-5'>
                                        <input className="input-group-text w-100" id="year" type='number' min='1890' max='2020' placeholder='Year'/>
                                    </div>
                                </div>
                               */} 
                            </form>
                        </div>
                   


                    </div>
                    <div className="col-2"/>
                </div>

            </div>
        )
    }
}


export default RegistrationPage