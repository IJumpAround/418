import React, { Component } from 'react'
import axios from '../../../utils/axiosInstance'
import {auth} from '../../../utils/auth';
 class reviewForm extends Component {

  constructor(props){
    super(props);
    this.state = {
      review: ""
    }

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleOnSubmit(e){
    e.preventDefault();

    const params = {
      'user_id': auth.user_id,
      'dorm_id': this.props.dorm_id,
      'rating': this.props.rating,
      'review_text': this.state.review
    }
    axios.post('dorms/review', (params)

    ,{headers: {'Content-Type': 'application/json',
  }})
  
.then(result  => {
  if(result){
      let review = [this.state.review, this.props.rating, auth.username, result.data.timestamp, null]
    this.props.addReview(review);

    this.setState({
      review: ""
    })
  }
}) 


.catch(function (error) {

})
  }

  render() {
  //  console.log(this.state.review);
  //  console.log(this.props.rating);
  //  console.log(auth.user_id);
  //  console.log(this.props.dorm_id);
    
    
    return (
      <div>
        <form className="form-group" onSubmit={this.handleOnSubmit}>
          <textarea className="form-control"
                    rows="5" 
                    name="review"
                    value={this.state.review}
                    onChange={this.handleOnChange}/>
        <div className="row justify-content-end mr-1">
          <button className="btn btn-dark" type="submit">Submit</button>               
        </div>    
        </form>
      </div>
    )
  }
}

export default reviewForm;