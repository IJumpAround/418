import React from 'react'
import Trump from '../../../img/trump.jpg';

 function Review(props) {
  console.log(props);
  
  return (
    <div>
      <div className="media">
        <img className="mr-3" src={Trump} width="80"alt="" />
        <div className="row justify-content-end">
          <div className="col-sm-8">
          <div className="media-body text-left ">
            <h5 className="mb-0">Donald Trump</h5>
            <p>April 2020</p>
          </div>

          </div>
          <div className="col-sm-4">
            <p>Rating: 4</p>
          </div>
        </div> 
            <hr />
        </div>
      <div className="row text-left ml-3">
      {props.review}
      </div>
    </div>
  )
}

export default Review;