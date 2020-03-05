import React from 'react'
import Navbar from "../navComponents/navigation/Navbar";
import {faBed} from "@fortawesome/free-solid-svg-icons";
import {faCommentDots} from "@fortawesome/free-solid-svg-icons";
import {faMap} from "@fortawesome/free-solid-svg-icons";
import {faPhotoVideo} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './registrationPage.css'


class RegistrationPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Navbar/>
                <div className="container mt-2">
                    <div className="row">
                        <div className="col- col-sm-4 col-md-6">
                        <br/>
                        <h3 className="text-muted">Find the dorm you deserve</h3>
                            <br/>
                            <ul className='list-group text-muted pl-5'>
                                <li className="list-inline-item">
                                    <FontAwesomeIcon icon={faBed}/>  Find a great dorm.
                                </li>
                                <li className="list-inline-item">
                                    <FontAwesomeIcon icon={faCommentDots}/>  Leave a review to help others.
                                </li>
                                <li className="list-inline-item">
                                    <FontAwesomeIcon icon={faPhotoVideo}/>  View images of potential dorms.
                                </li>
                                <li className='list-inline-item'>
                                    <FontAwesomeIcon icon={faMap}/>  Check out the interactive campus map.
                                </li>
                            </ul>
                        </div>
                        <div className='col-12 col-sm-8 col-md-6'>
                            <form id='registrationForm'>
                                <div className='row'>
                                    <div className='col-12'>
                                        <h1>Sign up</h1>
                                        <h5>Find your new dorm</h5>
                                        <br/>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-6'>
                                        <input className='input-group-text w-100' id="first_name" type='text' placeholder='First name'/>
                                    </div>

                                    <div className='col-6'>
                                        <input className='input-group-text w-100' id="last_name" type='text' placeholder='Last name'/>
                                    </div>

                                </div>
                                <div className='row mt-2'>
                                    <div className='col-12'>
                                        <input className='input-group-text w-100'  id="email" type='email' placeholder='Email address'/>
                                    </div>
                                </div>
                                <div className='row mt-2'>
                                    <div className='col-12'>
                                        <input className='input-group-text w-100' id='password' type='password' placeholder='Password'/>
                                    </div>
                                </div>
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