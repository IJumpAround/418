import React, { Component, useState} from 'react'
import './singleDorm.css';
import Image1 from "../../img/stockdormimage.jpg";
import Image2 from "../../img/placeholder-profile-male-500x500.png";
import Image3 from "../../img/UA_campus2.jpg";
import {faArrowAltCircleRight} from "@fortawesome/free-solid-svg-icons";
import {faArrowAltCircleLeft} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from 'axios';
import StarRatingComponent from 'react-star-rating-component';

class singleDorm extends Component {

  constructor(props){
    super(props);

    this.state = {
      status: false,   
      showMoreBtn: false,
      dorm_info: {
        room: "",
        floor: "",
        room_type: "",
        quad: "",
        dorm_user_raiting: 0,
        img: "",
        tags: []
      },
      features: {
        bath: true,
        laundry: true,
        AC: true,
        internet: true,
        dining: true,
        fitness: true
      }

    }

    this.handleChange = this.handleChangeOnReviewInput.bind(this);
    this.handleChangeOnTagInput = this.handleChangeOnTagInput.bind(this);
    this.handleSubmitReview = this.handleSubmitReview.bind(this);
    this.handleStarClick = this.handleStarClick.bind(this);
    this.handleAddTagClick = this.handleAddTagClick.bind(this);
    this.handleShowMoreClick = this.handleShowMoreClick.bind(this);

  }

    handleChangeOnReviewInput(e){
      this.setState({
        [e.target.id]: e.target.value
      })
      }
      handleChangeOnTagInput(e){
        this.setState({
          [e.target.name]: e.target.value
        })
      }
      
      handleAddTagClick(e){
        e.preventDefault();
        this.setState({
          tags: this.state.tags.concat(this.state.tags)

        })
        console.log(this.state.tags);
        
        
      }

    handleSubmitReview(e){
      e.preventDefault();
      axios.post('',{

        'dorm_review': this.state.comment,
        'dorm_user_raiting': this.state.user_dorm_rating
      })

    }

    handleStarClick(nextValue){
      this.setState({
        rating: nextValue,
      })
    }


    handleShowMoreClick(){
     
      this.state.showMoreBtn ? this.setState({showMoreBtn: false}) : this.setState({showMoreBtn: true})

    }

    componentDidMount(){     
      this.setState({
        //Dorm info
        quad: "Dutch",
        room: "403",
        floor: "4",
        room_type: "Single",
        //Features
        bath: true,
        laundry: false,
        AC: false,
        internet: true,
        dining: true,
        fitness: true
        
      })
      
      
    }

    render() {

      const element = <div>Show Less</div>
      const element2 = <div>Show More</div>
      
      

      //console.log(this.state.showMoreBtn);
      
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
            <h3 className="text-center">{this.state.quad + ' Quad'}</h3>
            <h6>Room: {this.state.room}</h6>
            <h6>Floor: {this.state.floor}</h6>
            <h6>Type: {this.state.room_type}</h6>
            <h5 className="text-left ml-4">Features</h5>
            <hr className="mx-4" style={{color: "#564D80"} }/>       
            <div className="row custom-row">
              <div className="col-lg-6 custom-spacer custom-text-center">
              <img className="custom-text-center" src="https://img.icons8.com/ios/30/000000/toilet.png" alt=""/>{
              this.state.bath ? <div>Floor Bathroom</div> : <del>Floor Bathroom</del>}
              </div>
              <div className="col-lg-6 custom-spacer">
              <img src="https://img.icons8.com/ios/30/000000/washing-machine.png" alt=""/>
              {this.state.laundry ? <div>Floor Laundry</div> : <del>Floor Laundry</del>}
              </div>
            </div>
            <div className="row custom-row">
              <div className="col-lg-6 custom-spacer">
              <img src="https://img.icons8.com/ios/30/000000/air-conditioner.png" alt=""/>
              {this.state.AC ? <div>Air Conditioning</div> : <del>Air Conditioning</del>}
              </div>
              <div className="col-lg-6 custom-spacer">
              <img src="https://img.icons8.com/ios/30/000000/dining-room.png" alt=""/>
              {this.state.dining ? <div>Dining</div> : <del>Dining</del>}
              </div>
            </div>
            <div className="row custom-row">
              <div className="col-lg-6  custom-spacer">
              <img src="https://img.icons8.com/ios/30/000000/internet.png" alt=""/>
              {this.state.internet ? <div>Internet</div> : <del>Internet</del>}
              </div>
              <div className="col-lg-6  custom-spacer">
              <img src="https://img.icons8.com/ios/30/000000/barbell.png" alt=""/>
              {this.state.fitness ? <div>Fitness</div> : <del>Fitness</del>}
              </div>
            </div>
          </div>
          <div className="col-md-8 mt-2 description">
            <div className="row justify-content-between">
              <div className="col-1">
                <h3 className="text-left">Tags</h3>
              </div>
              <div className="">
                <form className="form-group" onSubmit={this.handleAddTagClick}>
                <input className=""
                       name="tags" 
                       value={this.state.tags} 
                       onChange={this.handleChangeOnTagInput} 
                       />
                <button className="btn btn-light mr-2"
                        type="submit" 
                        style={{color: "#564D80"}}
                        >Add Tag
                </button> 
                <button className="btn btn-light" 
                        data-toggle="collapse" 
                        data-target="#crumb" 
                        style={{color: "#564D80"}} 
                        onClick={this.handleShowMoreClick}
                        >
                        {this.state.showMoreBtn ? element : element2}
                </button> 
                </form>
              </div>
            </div>
           
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
        
     
        <div className="row">
          <div className="col-6">
            <h3>Overall Dorm Rating: 4.3</h3>
          </div>
        </div>
        <div className="review_section shadow-sm">
          <div className="row ml-3">
            <img src="https://img.icons8.com/ios/30/000000/rating.png" alt=""/>
            <h3 className="">{this.state.rating}</h3>
      
            {this.state.prevrating}
          </div>
        <div className="row ml-3">
        <div className="media">
          <img className="mr-3" src={Image2}  width="80"alt="Profile_image" />
            <div className="media-body text-left mt-4">
             <h5 className="mb-0">Donald Trump</h5>
             <p>April 2020</p>
            </div>
         </div>
        </div>
        <div className="row text-left ml-3">
            Nostrud dolore anim anim elit sit. Ea eiusmod non enim ea nulla aute. Do fugiat aute 
            incididunt est sit excepteur do est exercitation fugiat mollit esse elit. Non do reprehenderit
            minim dolore cillum pariatur magna id dolor Lorem aliquip occaecat.  
        </div>

        </div>
        <div className="input-section">
          <form onSubmit={this.handleSubmitReview} onChange={this.handleChangeOnReviewInput} id='reviewSection'>
            <div className="row">
              <div className="col-md-12">                 
                <div className="form-group">
                  <div className="row h-50">
                    <div className="col-sm-4">
                      <h3>Leave a Review</h3>
                    </div>
                    <StarRatingComponent
                        id = "dorm_user_rating"
                        name = "starRate"
                        starCount = {5}
                        value = {this.state.user_dorm_rating}
                        onStarClick = {this.handleStarClick}
                        emptyStarColor = "#564D80"
                      />           
                  </div>
                  <textarea className="form-control" rows="5" id="review" type="review" required></textarea>    
                </div>
              </div>
            </div>
            <div className="row justify-content-end mr-1">
                <button className="btn btn-dark" type="submit">Submit</button>               
            </div>    
          </form>
        </div>
      </div>
    </div>
 </div>
    )
  }
}


export default singleDorm;

