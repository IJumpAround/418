import React from 'react'
import Review from './review'

 //list all of the reviews into an array
 function ReviewList(props) {
    console.log(props);
 const {user_id} = props.user_id;
 
  return (
    <div className="col-lg-12">
      
      {props.reviews.map((review, index)=> (
        <Review  key={review} review={review} image={user_id}/>
      ))}
      
    </div>
  )
}


export default ReviewList;

