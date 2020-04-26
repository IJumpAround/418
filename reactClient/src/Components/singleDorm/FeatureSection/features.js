import React from 'react'

function Features(props) {
    console.log(props);
  
    const {bath,laundry, AC, dining, internet, fitness} = props.features;
   
    return (
      <div>
            <h5 className="text-left ml-4">Features</h5>
            <hr className="mx-4" style={{color: "#564D80"} }/>       
            <div className="row custom-row">
              <div className="col-lg-6 custom-spacer custom-text-center">
              <img className="custom-text-center" src="https://img.icons8.com/ios/30/000000/toilet.png" alt=""/>
              {bath ? <div>Floor Bathroom</div> : <del>Floor Bathroom</del>}
              </div>
              <div className="col-lg-6 custom-spacer">
              <img src="https://img.icons8.com/ios/30/000000/washing-machine.png" alt=""/>
              {laundry ? <div>Floor Laundry</div> : <del>Floor Laundry</del>}
              </div>
            </div>
            <div className="row custom-row">
              <div className="col-lg-6 custom-spacer">
              <img src="https://img.icons8.com/ios/30/000000/air-conditioner.png" alt=""/>
              {AC ? <div>Air Conditioning</div> : <del>Air Conditioning</del>}
              </div>
              <div className="col-lg-6 custom-spacer">
              <img src="https://img.icons8.com/ios/30/000000/dining-room.png" alt=""/>
              {dining ? <div>Dining</div> : <del>Dining</del>}
              </div>
            </div>
            <div className="row custom-row">
              <div className="col-lg-6  custom-spacer">
              <img src="https://img.icons8.com/ios/30/000000/internet.png" alt=""/>
              {internet ? <div>Internet</div> : <del>Internet</del>}
              </div>
              <div className="col-lg-6  custom-spacer">
              <img src="https://img.icons8.com/ios/30/000000/barbell.png" alt=""/>
              {fitness ? <div>Fitness</div> : <del>Fitness</del>}
              </div>
            </div>
      </div>
    )
  
}

export default Features;