import React from 'react'
import Trump from '../../../img/trump.jpg';

 function Review(props) {
  console.log(props);
  //console.log(props.review[3]);
  
  return (
    <div>
     <h5 className="text-left pl-2">{props.review[2]}</h5>   
     <div className="col-lg-12">
      <div className="media">        
        <img className="mr-3" src={Trump} width="80"alt="" />
        <div className="row justify-content-end">
          <div className="col-sm-8">
          <div className="media-body text-left ">
            <h5 className="mb-0"></h5>
            <p>{props.review[3]}</p>
          </div>

          </div>
          <div className="col-sm-4">
          <p>Rating: {props.review[1]}</p>
          </div>
        </div> 
            <hr />
        </div>
     </div>
      <div className="row text-left ml-3">
          {props.review[0]}
      </div>
      <hr></hr>
    </div>
  )
}

export default Review;