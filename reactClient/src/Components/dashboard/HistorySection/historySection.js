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
        <h3>User History</h3>
        <div className="list-group scroll">
          {renderHistory}
       </div>
      </div> 
    )
}

export default HistorySection;