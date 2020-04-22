import React, { Component } from 'react'
import './historySection.css';

 class HistorySection extends Component {

  render() {

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
      <tbody>
            <tr>
              <td style={{width: "10%"}}> Wrote a review...</td>
            </tr>
            <tr>
              <td>Created a post...</td>
            </tr>
            <tr>
              <td> Created a tag...</td>
            </tr>    
      </tbody>
     </table> 
    </div>
    )
  }
}

export default HistorySection;