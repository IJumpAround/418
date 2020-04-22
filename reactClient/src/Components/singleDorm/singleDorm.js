import React, { Component } from 'react'
import './singleDorm.css';
import Image1 from "../../img/stockdormimage.jpg";
import Image2 from "../../img/placeholder-profile-male-500x500.png";
import Image3 from "../../img/UA_campus2.jpg";
import {faArrowAltCircleRight} from "@fortawesome/free-solid-svg-icons";
import {faArrowAltCircleLeft} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class singleDorm extends Component {

  render() {

    return (
      
      <div>     
        <div id="singledorm" className="carousel bg-light mt-2" data-ride="carousel" data-interval="false" >
         <ul className="carousel-indicators">
          <li data-target="#singledorm" data-slide-to="0" className="active"></li>
          <li data-target="#singledorm" data-slide-to="1"></li>
          <li data-target="#singledorm" data-slide-to="2"></li>
         </ul>
         <div className="carousel-inner text-center">
           <div className="carousel-item active">
             <img src={Image1} alt="image1" width="300" height="300"/>
           </div>
           <div className="carousel-item">
             <img src={Image2} alt="image2" width="300" height="300"/>
           </div>
           <div className="carousel-item">
             <img src={Image3} alt="image3" width="300" height="300"/>
           </div>
         </div>
         <a className="carousel-control-prev" href="#singledorm" data-slide="prev">
            <FontAwesomeIcon icon={faArrowAltCircleLeft} size="2x" style={{color: "#564D80"}}/>
         </a>
         <a className="carousel-control-next" href="#singledorm" data-slide="next">
            <FontAwesomeIcon icon={faArrowAltCircleRight} size="2x" style={{color: "#564D80"}} />
         </a> 
        </div> 
       
        <div className="row mr-2">
          <div className="col-md-4 mt-2 description border-right" style={{color: "#564D80"} }>
            <h3 className="text-center">Dutch Quad</h3>
            <h6>Room 321</h6>
            <h6>Floor 3</h6>
            <h6>Double</h6>
            <h5 className="text-left ml-4">Features</h5>
            <hr className="mx-4" style={{color: "#564D80"} }/>       
            <div className="row custom-row">
              <div className="col-lg-6 custom-spacer custom-text-center">
              <img className="custom-text-center" src="https://img.icons8.com/ios/30/000000/toilet.png" alt=""/>Floor Bathroom
              </div>
              <div className="col-lg-6 custom-spacer">
              <img src="https://img.icons8.com/ios/30/000000/washing-machine.png" alt=""/>Floor Laundry
              </div>
            </div>
            <div className="row custom-row">
              <div className="col-lg-6 custom-spacer">
              <img src="https://img.icons8.com/ios/30/000000/air-conditioner.png" alt=""/><del>Air Conidtioning</del>
              </div>
              <div className="col-lg-6 custom-spacer">
              <img src="https://img.icons8.com/ios/30/000000/dining-room.png" alt=""/>Dining
              </div>
            </div>
            <div className="row custom-row">
              <div className="col-lg-6  custom-spacer">
              <img src="https://img.icons8.com/ios/30/000000/internet.png" alt=""/>Internet
              </div>
              <div className="col-lg-6  custom-spacer">
              <img src="https://img.icons8.com/ios/30/000000/barbell.png" alt=""/>Fitness
              </div>
            </div>
          </div>
          <div className="col-md-8 mt-2 description">
            <h3 className="text-left">Tags</h3>
          <div className=" row breadcrumb bg-light">
            
            <ol className="breadcrumb" style={{backgroundColor: "#564D80"}}>
              <li className="breadcrumb-item text-light">#noisy</li>
              <li className="breadcrumb-item text-light">#dirty</li>
              <li className="breadcrumb-item text-light">#no-light</li>
              <li className="breadcrumb-item text-light">#hot</li>
              <li className="breadcrumb-item text-light">#comfy</li>
              <li className="breadcrumb-item text-light">#cozy</li>
             
              <li id="crumb" className="breadcrumb-item collapse text-light">#warm</li>
              <li id="crumb" className="breadcrumb-item collapse text-light">#fun</li>
              <li id="crumb" className="breadcrumb-item collapse text-light">#cool</li>
              <li id="crumb" className="breadcrumb-item collapse text-light">#preety</li>
              <li id="crumb" className="breadcrumb-item collapse text-light">#sound</li>
              <li id="crumb" className="breadcrumb-item collapse text-light">#food</li>
            </ol>
          </div>
        <button href="#" className="btn btn-light" data-toggle="collapse" data-target="#crumb" style={{color: "#564D80"}}>Show more</button> 
        <div className="ml-4">
        <div className="row">
          <h3>Reviews</h3>
        </div>
        <div className="row">
          <img src="https://img.icons8.com/ios/30/000000/rating.png" alt=""/>
          <h3 className="">1.06</h3>
        </div>
        <div className="row">
        <div class="media">
          <img class="mr-3" src={Image2}  width="80"alt="Profile_image" />
            <div class="media-body text-left mt-4">
             <h5 class="mb-0">Donald Trump</h5>
             <p>April 2020</p>
            </div>
         </div>
        </div>
        <div className="row text-left">
            Nostrud dolore anim anim elit sit. Ea eiusmod non enim ea nulla aute. Do fugiat aute 
            incididunt est sit excepteur do est exercitation fugiat mollit esse elit. Non do reprehenderit
            minim dolore cillum pariatur magna id dolor Lorem aliquip occaecat.  
        </div>
        <hr />
        <div className="row">
        <div class="media">
          <img class="mr-3" src={Image2}  width="80"alt="Profile_image" />
            <div class="media-body text-left mt-4">
             <h5 class="mb-0">Kim Jong-un</h5>
             <p>May 2020</p>
            </div>
         </div>
        </div>
        <div className="row text-left">
            Nostrud dolore anim anim elit sit. Ea eiusmod non enim ea nulla aute. Do fugiat aute 
            incididunt est sit excepteur do est exercitation fugiat mollit esse elit. Non do reprehenderit
            minim dolore cillum pariatur magna id dolor Lorem aliquip occaecat.  
        </div>
        <hr />
        <div className="row">
        <div class="media">
          <img class="mr-3" src={Image2}  width="80"alt="Profile_image" />
            <div class="media-body text-left mt-4">
             <h5 class="mb-0">Fidel Castro</h5>
             <p>June 2020</p>
            </div>
         </div>
        </div>
        <div className="row text-left">
            Nostrud dolore anim anim elit sit. Ea eiusmod non enim ea nulla aute. Do fugiat aute 
            incididunt est sit excepteur do est exercitation fugiat mollit esse elit. Non do reprehenderit
            minim dolore cillum pariatur magna id dolor Lorem aliquip occaecat.  
        </div>
        <hr />

        </div>
     </div>
  </div> 
</div>
    

    )
  }
}


export default singleDorm;