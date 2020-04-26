import React from 'react'
import Trump from '../../../img/trump.jpg';

 function Review(props) {
  console.log(props);
  
  return (
    <div>
      <div className="media">
        <img className="mr-3" src={Trump} width="80"alt="" />
          <div className="media-body text-left ">
            <h5 className="mb-0">Donald Trump</h5>
            <p>April 2020</p>
            <hr />
          </div>
        </div>
      <div className="row text-left ml-3">
          <div>The Review</div>
      </div>
    </div>
  )
}

export default Review;