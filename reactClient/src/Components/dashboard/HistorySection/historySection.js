import React from 'react'
import './historySection.css';

function HistorySection(props) {
  var reviews = props.reviews;
  const renderHistory = reviews.map((obj, index) => {    
    return(
        <tr key={reviews[index].review_id}>
          <td>Left a Review</td>
          <td>{reviews[index].review_text}</td>
          <td>{reviews[index].timestamp}</td>
        </tr>  
    )
  }
);
    return (
      <div className="table table-striped border rounded">
      <div className="custom-thead">
        <table>
          <tbody>
            <tr>
              <th>History</th>     
            </tr>
          </tbody>
        </table>
      </div>
     <table>
      <tbody style={{width:"100%"}}>
        {renderHistory}  
      </tbody>
     </table> 
    </div>
    )
}

export default HistorySection;