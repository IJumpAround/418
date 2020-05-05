import React from 'react'
import Review from './review'

 //list all of the reviews into an array
 function ReviewList(props) {
    console.log(props);

 
  return (
    <div className="col-lg-12">
      
      {props.reviews.map((review, index)=> (
        <Review  key={review} review={review} />
      ))}
      
    </div>
  )
}


export default ReviewList;

