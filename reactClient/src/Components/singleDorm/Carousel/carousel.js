import React from 'react'
import Image1 from "../../../img/stockdormimage.jpg";
import Image2 from "../../../img/placeholder-profile-male-500x500.png";
import Image3 from "../../../img/UA_campus2.jpg";
import {faArrowAltCircleRight} from "@fortawesome/free-solid-svg-icons";
import {faArrowAltCircleLeft} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

function Carousel(props) {
  console.log(props);
  //props holds the img 
  return (
    <div id="singledorm" className="carousel bg-light mt-2" data-ride="carousel" data-interval="false" >
    <ul className="carousel-indicators">
     <li data-target="#singledorm" data-slide-to="0" className="active"></li>
     <li data-target="#singledorm" data-slide-to="1"></li>
     <li data-target="#singledorm" data-slide-to="2"></li>
    </ul>
    <div className="carousel-inner text-center">
      <div className="carousel-item active">
        <img src={props.img} alt="image1" width="300" height="300"/>
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
  )
}

export default Carousel;