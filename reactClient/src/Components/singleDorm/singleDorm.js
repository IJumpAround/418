import React, { Component} from 'react'
import './singleDorm.css';
import StarRatingComponent from 'react-star-rating-component';
import ReviewList from './ReviewSection/reviewList';
import ReviewForm from './ReviewSection/reviewForm';
import Features from './FeatureSection/features';
import Carousel from './Carousel/carousel';
import axios from '../../utils/axiosInstance';
import {retrieveDormImage} from '../../utils/images';
import { faImages } from '@fortawesome/free-solid-svg-icons';
import {retrieveProfileImage} from '../../utils/images';
import {auth} from '../../utils/auth';

class singleDorm extends Component {

  constructor(props){
    super(props);

    this.state = {
      user_id: '',
      loadedResult: '',

      showMoreBtn: false,
      tag: "",
      tag_List: [],
      reviews: [],    
      user_info: {
        name: "",
        image: ""
      },
      dorm_info: {
        dorm_id: "",
        room: "",
        floor: "",
        room_type: "",
        building: "",
        quad: "",
        img: "",
      },
      dorm_user_rating: 0,
      overall_dorm_rating: 0,
      features: {
        bath: "",
        laundry: "",
        AC: null,
        internet: "",
        dining: "",
        fitness: null
      }

    }
    
    this.handleChangeOnTagInput = this.handleChangeOnTagInput.bind(this);
    this.handleStarClick = this.handleStarClick.bind(this);
    this.handleAddTagClick = this.handleAddTagClick.bind(this);
    this.handleShowMoreClick = this.handleShowMoreClick.bind(this);
    this.addReview = this.addReview.bind(this);
  }

    addReview(review){
      console.log(review);
      
      this.setState({
        reviews: [...this.state.reviews, review]
      })
    }

    getDormImage = () =>{
      axios.get('/images',{
        params: {
          image_type: 'dorm',
          entity_id: this.props.match.params.id
      }
      } 
      ).then((response)=> console.log(response)
      
       
        
      )

    }
    /*
    setImage = () => {

      var user_id = auth.user_id;
      var userImage = retrieveProfileImage(user_id);
     
      userImage.then((list) => {
        const image = list[0];
        this.setState({
          user_id: {
            image: image
          }
        })
      })
    }
*/
    dormLoadHandler = () =>  {
      axios.post('dorms/load_dorm', {
        dorm_id: this.props.match.params.id
        //Posts the dorm's ID to server to load it's info
      })
        .then((result) => {
            if (result) {
             //   console.log(Object.entries(result));
                var manipResult = result.data
                var dorm_info = manipResult.payload.dorm_info;
                var dorm_features = manipResult.payload.dorm_features;
                var dorm_images = manipResult.payload.dorm_images;

                var dorm_reviews = manipResult.payload.dorm_reviews; 
                console.log(manipResult);
                this.setState({loadedResult: manipResult})
                this.setState({dorm_id : this.props.match.params.id})
                this.setState({reviews : dorm_reviews})
                if(dorm_reviews[0]){
                this.setState({user_id : dorm_reviews[0][5]})
                }
                this.setState({dorm_info: {                                  
                                  room: dorm_info[2],
                                  floor: dorm_info[3],
                                  room_type: dorm_features[0][1],
                                  building: dorm_info[4],                        
                                  quad: dorm_info[5],
                                  img: dorm_images[0]
                                }})
                this.setState({ features: {
                                  bath: dorm_features[1][1],
                                  laundry: dorm_features[4][1],
                                  AC: dorm_features[2][1],
                                  internet: dorm_features[5][1],
                                  dining: dorm_features[6][1],
                                  fitness: dorm_features[3][1]
                                }})
                
            }
            
        })
        .catch((error) => {
            console.log('error')
            if (error) {
                console.log(Object.entries(error))
            }
        })
    };

      handleChangeOnTagInput(e){
        this.setState({
          [e.target.name]: e.target.value
        })
      }

      handleAddTagClick(e){
        e.preventDefault();
        //console.log(this.state.tag);
        
        const tag = this.state.tag;
        this.setState({
          tag_List: [...this.state.tag_List, tag]
          
        })       
        //console.log(this.state.tag_List);
      }

      handleStarClick(nextValue){
        this.setState({
          dorm_user_rating: nextValue,
        })
      }

      handleShowMoreClick(){
      
        this.state.showMoreBtn ? 
        this.setState({showMoreBtn: false}) : 
        this.setState({showMoreBtn: true})

      }

      componentDidMount(){   
        this.dormLoadHandler()
       // this.setImage();
        //console.log( this.getDormImage());
        
        // this.getDormImage()
        
        
        
      }
      
      render() {
      // console.log(   retrieveDormImage(20));
        console.log(this.state.user_id);
        
      // console.log(this.state.user_info.image);
     
      // console.log(this.state.loadedResult);
      //console.log(this.state.reviews);
      // console.log(this.state.dorm_id);
      
      
      const element = <div>Show Less</div>
      const element2 = <div>Show More</div>
      //console.log(this.state.showMoreBtn);
     
      return (     
      <div>    
        <Carousel img={this.state.dorm_info.img}/>
        <div className="row mr-2">
          <div className="col-md-4 mt-2 description border-right" style={{color: "#564D80"} }>
            <h3 className="text-center">{this.state.dorm_info.quad+ ' Quad'}</h3>
            <div className=" ml-5 text-left">
                <h6>Room: {this.state.dorm_info.room}</h6>
                <h6>Floor: {this.state.dorm_info.floor}</h6>
                <h6>Building: {this.state.dorm_info.building}</h6>
                <h6>Type: {this.state.dorm_info.room_type}</h6>
            </div>
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
        
        <hr></hr>
        <div className="row">
          <div className="col-md-3">
            <h3>Reviews</h3>
          </div>
        </div>
        <div className="review_section shadow-sm">
          <div className="row ml-3">
            
          </div>
        <div className="row ml-3 mr-3">
          <ReviewList reviews={this.state.reviews} rating={this.state.dorm_info.dorm_user_rating} /> 
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
                        value = {this.state.dorm_user_rating}
                        onStarClick = {this.handleStarClick}
                        emptyStarColor = "#564D80"
                      />           
                  </div>
                  <ReviewForm reviews={this.state.reviews} rating={this.state.dorm_user_rating} addReview={this.addReview} dorm_id={this.state.dorm_id} user_id={this.state.user_id}/>            
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

