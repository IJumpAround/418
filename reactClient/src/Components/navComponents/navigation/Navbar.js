import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import '../navigation/Navbar.css';


 class Navbar extends Component {
       constructor(props) {
        super(props);
        this.state = {
            loginClicked: false
        };

        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(e) {
      e.preventDefault();
      this.setState({loginClicked: !this.state.loginClicked});
   }

  render() {
    return (
     <div>

       <nav class="navbar sticky-top navbar-expand-sm  bg-light navbar-custom">
         <Link class=" pl-3 custom-color my-text" to='/'>Rate My Dorm</Link>
         <button class="navbar-toggler test" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
         <span class="navbar-toggler-icon"></span>
         <span class="icon-bar"></span>
         <span class="icon-bar"></span>
         <span class="icon-bar"></span>
         </button>
         <div class="collapse navbar-collapse justify-content-end " id="collapsibleNavbar">   
           <ul class="navbar-nav">
             <li class="nav-item">
               <Link class="nav-link custom-color" to={'/search'}>Search</Link>
             </li>
             <li class="nav-item">
               <Link class="nav-link custom-color" to='/'>Dashboard</Link>
             </li>
             <li class="nav-item">
               <a className="nav-link custom-color" href="#" data-toggle="modal" data-target="#modalLogin">
               Login</a>
             </li>   
           </ul>
         </div> 
       </nav> 
     </div> 
      
    )
  }
}
  

export default Navbar;