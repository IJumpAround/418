import React, { Component } from 'react'
import './historySection.css';

 class historySection extends Component {

  render() {

    return (
      <div className="table table-striped border rounded">
      <thead className="custom-thead">
        <tr>
          <th>History</th>
        </tr>
      </thead>
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
    </div>
    )
  }
}

export default historySection;