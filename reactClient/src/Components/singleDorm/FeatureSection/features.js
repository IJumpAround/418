import React from 'react'

function Features(props) {
   // console.log(props.features);
  
    const {bath,laundry, AC, dining, internet, fitness} = props.features;
   
    
    return (
      <div>
            <h5 className="text-left ml-4">Features</h5>
            <hr className="mx-4" style={{color: "#564D80"} }/>       
            <div className="row custom-row">
              <div className="col-lg-6 custom-spacer custom-text-center">
              <img className="custom-text-center" src="https://img.icons8.com/ios/30/000000/toilet.png" alt=""/>
              {(() => {
                  switch (bath) {
                    case "On Floor":   return <React.Fragment>
                                                <div>Floor Bathroom</div> 
                                                <del>In-Dorm Bathroom</del>
                                              </React.Fragment>
                    case "In Dorm":   return <React.Fragment>
                                                <del>Floor Bathroom</del> 
                                                <div>In-Dorm Bathroom</div>
                                              </React.Fragment>                                
                    default:           return <React.Fragment>
                                                <div>Floor Bathroom</div> 
                                                <div>In-Dorm Bathroom</div>
                                              </React.Fragment>                                
 
                  }
                })()}
              </div>
              <div className="col-lg-6 custom-spacer">
              <img src="https://img.icons8.com/ios/30/000000/washing-machine.png" alt=""/>
              {(() => {
                  switch (laundry) {
                    case "On Floor":   return <React.Fragment>
                                                <div>Floor Laundry</div> 
                                                <del>In-Dorm Laundry</del>
                                              </React.Fragment>
                    case "In Dorm":   return <React.Fragment>
                                                <del>Floor Laundry</del> 
                                                <div>In-Dorm Laundry</div>
                                              </React.Fragment>                                
                    default:           return <React.Fragment>
                                                <div>Floor Laundry</div> 
                                                <div>In-Dorm Laundry</div>
                                              </React.Fragment>                                
 
                  }
                })()}
              </div>
            </div>
            <div className="row custom-row">
              <div className="col-lg-6  custom-spacer">
              <img src="https://img.icons8.com/ios/30/000000/internet.png" alt=""/>
              {(() => {
                  switch (internet) {
                    case "Wifi":       return <React.Fragment>
                                                <div>Wifi</div> 
                                                <del>Ethernet</del>
                                              </React.Fragment>
                    case "Ethernet":   return <React.Fragment>
                                                <del>Wifi</del> 
                                                <del>Ethernet</del>
                                              </React.Fragment>                                
                    case "Both":       return <React.Fragment>
                                                <div>Wifi</div> 
                                                <div>Ethernet</div>
                                              </React.Fragment>                                
                    default:           return <React.Fragment>
                                                <div>Wifi</div> 
                                                <div>Ethernet</div>

                                              </React.Fragment>                                
 
                  }
                })()}
              </div>
              <div className="col-lg-6  custom-spacer">
              <img src="https://img.icons8.com/ios/30/000000/barbell.png" alt=""/>
              {fitness === "true" ? <div>Fitness</div> : <del>Fitness</del>}
              </div>
            </div>
            <div className="row custom-row">
              <div className="col-lg-6 custom-spacer">
              <img src="https://img.icons8.com/ios/30/000000/air-conditioner.png" alt=""/>
              {AC === "true" ? <div>Air Conditioning</div> : <del>Air Conditioning</del>}
              </div>
              <div className="col-lg-6 custom-spacer">
              <img src="https://img.icons8.com/ios/30/000000/dining-room.png" alt=""/>
              {(() => {
                  switch (dining) {
                    case "Dining Hall":       return <React.Fragment>
                                                <div>Dinning Hall</div> 
                                                <del>In Dorm Kitchen</del>
                                              </React.Fragment>
                    case "In Dorm Kitchen":   return <React.Fragment>
                                                <del>Dinning Hall</del> 
                                                <del>In-Dorm Kitchen</del>
                                              </React.Fragment>                                                             
                    default:                   return <React.Fragment>
                                                <div>Dinning Hall</div> 
                                                <div>In-Dorm Kitchen</div>
                                              </React.Fragment>                                
                  }
                })()}

              </div>
            </div>

      </div>
    )
  
}

export default Features;