import React from 'react'
import './historySection.css';

function HistorySection(props) {
  var reviews = props.reviews;
  const renderHistory = reviews.map((obj, index) => {    
    return(
      
          <li key={reviews[index].review_id} className="list-group-item">
            <div className="row">
            <div className="col-sm-4">
               <tr>Left a Review</tr>
            </div>
            <div className="col-sm-4">
              <tr>{reviews[index].review_text}</tr>
            </div>
            <div className="col-sm-4">
              <tr>{reviews[index].timestamp}</tr>
            </div>
            </div>
          </li>
         
    )
  }
);
    return (
      <div>
        
        <div className="list-group">
          <div className="list-group-item">
            <h4>User History</h4>
          </div>
          <div className="scroll">
           {renderHistory}
          </div>
       </div>
      </div> 
    )
}

export default HistorySection;