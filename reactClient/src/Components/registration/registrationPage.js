import React from 'react'
import {faBed} from "@fortawesome/free-solid-svg-icons";
import {faCommentDots} from "@fortawesome/free-solid-svg-icons";
import {faMap} from "@fortawesome/free-solid-svg-icons";
import {faPhotoVideo} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './registrationPage.css'
import axios from '../../utils/axiosInstance'


class RegistrationPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            namePattern : '[a-zA-Z\\-]+',
            passwordPattern: '[a-zA-Z0-9!@#$%^&*()\\-]+',
            usernamePattern: '[a-zA-Z0-9\\-_]+'
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
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
                            <form  onChange={this.handleChange} onSubmit={this.handleSubmit} id='registrationForm'>
                                <div className='row'>
                                    <div className='col-12'>
                                        <h1>Sign up</h1>
                                        <h5>Find your new dorm</h5>
                                        <br/>
                                    </div>
                                </div>
                                <div className='row'>
                                    <div className='col-6'>
                                        <input className='input-group-text w-100' id="first_name" type='text' placeholder='First name' required
                                               pattern={this.state.namePattern} title={'only letters'}/>
                                    </div>

                                    <div className='col-6'>
                                        <input className='input-group-text w-100' id="last_name" type='text' placeholder='Last name' required
                                               pattern={this.state.namePattern}/>
                                    </div>

                                </div>
                                <div className='row mt-2'>
                                    <div className='col-12'>
                                        <input className='input-group-text w-100' id='username' type='text' placeholder='Username' required
                                               pattern={this.state.usernamePattern}/>
                                    </div>
                                </div>
                                <div className='row mt-2'>
                                    <div className='col-12'>
                                        <input className='input-group-text w-100'  id="email" type='email' placeholder='Email address' required pattern='\w+@albany.edu' title='Email must be a valid UAlbany address.'/>
                                    </div>
                                </div>
                                <div className='row mt-2'>
                                    <div className='col-12'>
                                        <input className='input-group-text w-100' id='password' type='password' placeholder='Password' required minLength={7}
                                               pattern={this.state.passwordPattern}/>

                                    </div>
                                </div>
                                <div className='row mt-1 text-right'>
                                    <div className='col-12'>
                                        <button type='submit'  className='btn btn-primary'>Register</button>
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

    handleSubmit(event) {
        event.preventDefault();
        axios.post('/auth/register',
            {
                'username': this.state.username,
                'password': this.state.password,
                'first_name': this.state.first_name,
                'last_name': this.state.last_name,
                'email': this.state.email
            },
            {headers: {'Content-Type': 'application/json',
                }})
            .then(function (response) {
                console.log(response);
                alert(JSON.stringify(response.data))
                window.location.pathname='/dashboard'
            })
            .catch(function (error) {
                console.log(error);
                alert(JSON.stringify(error.data))
            })
    }

    handleChange(event) {
        this.setState({[event.target.id]: event.target.value})
    }
}


export default RegistrationPage