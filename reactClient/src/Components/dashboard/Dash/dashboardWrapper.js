import React from 'react'
import SideBar from '../Sidebar/sidebar';
import UserDataSection from '../UserDataSection/userDataSection';
import HistorySection from '../HistorySection/historySection';
import './dashboardWrapper.css'
import axios from '../../../utils/axiosInstance';
import {auth} from '../../../utils/auth';

//Holds all the components of the dashboard
class DashboardWrapper extends React.Component{


  constructor(props){
    super(props);
    this.state = {  
      userInfo: {
        firstName: "",
        lastName: "",
        status: "",
        quad: "",
        img: ""
      },
      reviews:[],   
      num_of_reviews: null,
      num_of_posts: null,
      num_of_tags: null
      
    }
   
  }
  

fetchData = () => {
  axios.get('/user/profile', 
   {params: {'user_id': auth.user_id}},
   {headers: {'Content-Type': 'application/json',}
  })
    .then(result => {
      console.log(result);
      let user = result.data.payload.user;
      let review = result.data.payload.reviews;
      let num_of_reviews = review.length;
    /*
      for(var i = 0; i < review.length; i++){
          let review = result.data.payload.reviews[i];
      }
      */
      this.setState({
        userInfo:{
          firstName: user.first_name,
          lastName : user.last_name
        },
        reviews: review,
        num_of_reviews: num_of_reviews,
        
    })   
    })
    .catch(error => {
      console.log(error);
      
    })

}

componentDidMount(){
  this.fetchData(); 
}

  render(){
     console.log(auth.user_id);
     
    return (
      <div className="wrapper">
          <SideBar userInfo={this.state.userInfo}/>
        <div className="container-fluid">
         <div className="custom-container mt-4 border rounded">
          <div className="row container-fluid pt-4 pl-4 justify-content-center">
            <div className="col-sm-9">
              <UserDataSection reviews={this.state.num_of_reviews}
                               post = {this.state.num_of_posts}
                               tags = {this.state.num_of_tags} 
              />
              <HistorySection reviews={this.state.reviews}/>
            </div>
          </div>
        </div>
        </div>   
      </div> 
      ); 
  }
}

export default DashboardWrapper;