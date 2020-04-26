import React from 'react'
import Review from './review'

 //list all of the reviews into an array
 function ReviewList(props) {
 console.log(props);
 const review = props; 
  return (
    <div>
      <Review  review={review}/>
    </div>
  )
}


export default ReviewList;