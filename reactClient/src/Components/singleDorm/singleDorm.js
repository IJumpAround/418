import React, { Component, useState} from 'react'
import './singleDorm.css';
import StarRatingComponent from 'react-star-rating-component';
import ReviewList from './ReviewSection/reviewList';
import ReviewForm from './ReviewSection/reviewForm';
import Features from './FeatureSection/features';
import Carousel from './Carousel/carousel';

class singleDorm extends Component {

  constructor(props){
    super(props);

    this.state = { 
      showMoreBtn: false,
      tag: "",
      tag_List: [],
      reviews: {
        reviews: [],
        timeStamp: ""
      },
      user_info: {
        name: "",
        image: ""
      },
      dorm_info: {
        room: "",
        floor: "",
        room_type: "",
        quad: "",
        dorm_user_raiting: 0,
        overall_dorm_rating: 0,
        img: "",
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
    
    this.handleChangeOnTagInput = this.handleChangeOnTagInput.bind(this);
    this.handleStarClick = this.handleStarClick.bind(this);
    this.handleAddTagClick = this.handleAddTagClick.bind(this);
    this.handleShowMoreClick = this.handleShowMoreClick.bind(this);

  }

      handleChangeOnTagInput(e){
        this.setState({
          [e.target.name]: e.target.value
        })
      }

      handleAddTagClick(e){
        e.preventDefault();
        console.log(this.state.tag);
        
        const tag = this.state.tag;
        this.setState({
          tag_List: [...this.state.tag_List, tag]
          
        })       
        console.log(this.state.tag_List);
      }

      handleStarClick(nextValue){
        this.setState({
          rating: nextValue,
        })
      }

      handleShowMoreClick(){
      
        this.state.showMoreBtn ? 
        this.setState({showMoreBtn: false}) : 
        this.setState({showMoreBtn: true})

      }

      componentDidMount(){   
        
        this.setState({
          //Dorm info
          quad: "Dutch",
          room: "403",
          floor: "4",
          room_type: "Single",
          //Features
          features: {
            bath: false,
            laundry: true,
            AC: false,
            internet: true,
            dining: false,
            fitness: false,
          }         
          
        })    
      }

    render() {

      const element = <div>Show Less</div>
      const element2 = <div>Show More</div>
      //console.log(this.state.showMoreBtn);
     
      return (     
      <div>    
        <Carousel img={this.state.dorm_info.img}/>
        <div className="row mr-2">
          <div className="col-md-4 mt-2 description border-right" style={{color: "#564D80"} }>
            <h3 className="text-center">{this.state.quad + ' Quad'}</h3>
            <h6>Room: {this.state.room}</h6>
            <h6>Floor: {this.state.floor}</h6>
            <h6>Type: {this.state.room_type}</h6>
            <Features features={this.state.features}/>
          </div>
          <div className="col-md-8 mt-2 description">
            <div className="row justify-content-between">
              <div className="col-1">
                <h3 className="text-left">Tags</h3>
              </div>
              <div className="">
                <div className="form-group" >
                <input className=""
                       name="tag" 
                       value={this.state.tag} 
                       onChange={this.handleChangeOnTagInput} 
                       />
                <button className="btn btn-light mr-2"
                        type="button"                     
                        style={{color: "#564D80"}}
                        onClick={this.handleAddTagClick}
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
                </div>
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
            <h3>Overall Dorm Rating: {this.state.overall_dorm_rating}</h3>
          </div>
        </div>
        <div className="review_section shadow-sm">
          <div className="row ml-3">
            
          </div>
        <div className="row ml-3">
          <ReviewList reviews={this.state.reviews} rating={this.state.dorm_info.dorm_user_raiting}/>
        </div>
        </div>
        <div className="input-section">
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
                  <ReviewForm />            
                </div>
              </div>
            </div>       
        </div>
      </div>
    </div>
 </div>
    )
  }
}


export default singleDorm;

