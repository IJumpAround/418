import React from 'react'
import Review from './review'

 //list all of the reviews into an array
 function ReviewList(props) {
 console.log(props);
 const {review, rating} = props; 
  return (
    <div>
      <Review  review={review} rating={rating}/>
    </div>
  )
}


export default ReviewList;