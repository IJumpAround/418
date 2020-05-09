import React, {useState} from 'react'
import placeholder from '../../../img/placeholder-profile-male-500x500.png';
import {retrieveProfileImage} from '../../../utils/images';
import {auth} from '../../../utils/auth';
 function Review(props) {
  console.log(props);
  //console.log(props.review[3]);
  console.log(props.review[5]);
  
  const [image, setImage] = useState('');

  var user_id = auth.user_id;
  var userImage = retrieveProfileImage(props.review[5]);
 
  userImage.then((list) => {
    const image = list[0];
    setImage(image)
  })
  
  return (
    <div>
     <h5 className="text-left pl-2">{props.review[2]}</h5>   
     <div className="col-lg-12">
      <div className="media">        
        <img className="mr-3" src={image == null ? placeholder : image} width="80"alt="" />
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