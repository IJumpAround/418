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

       <nav className="navbar sticky-top navbar-expand-sm  bg-light navbar-custom">
         <Link className=" pl-3 custom-color my-text" to='/'>Rate My Dorm</Link>
         <button className="navbar-toggler test" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
         <span className="navbar-toggler-icon"></span>
         <span className="icon-bar"></span>
         <span className="icon-bar"></span>
         <span className="icon-bar"></span>
         </button>
         <div className="collapse navbar-collapse justify-content-end " id="collapsibleNavbar">   
           <ul className="navbar-nav">
             <li className="nav-item">
               <Link className="nav-link custom-color" to={'/search'}>Search</Link>
             </li>
             <li className="nav-item">
               <Link className="nav-link custom-color" to='/'>Dashboard</Link>
             </li>
             <li className="nav-item">
               <Link className="nav-link custom-color" href="#" data-toggle="modal" data-target="#modalLogin">
               Login</Link>
             </li>   
           </ul>
         </div> 
       </nav> 
     </div> 
      
    )
  }
}
  

export default Navbar;