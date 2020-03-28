import React, { Component } from 'react'
import './userDataSection.css';

 class userDataSection extends Component {

  render() {

    return (
      <div className="table table-striped border rounded">
          <thead className="custom-thead">
            <tr>
              <th>User Data</th>
            </tr>
          </thead>
          <tbody>
                <tr>
                  <td style={{width: "10%"}}>Posts: 5</td>
                </tr>
                <tr>
                  <td>Tags: 2</td>
                </tr>
                <tr>
                  <td>Reviews: 7</td>
                </tr>    
          </tbody>
        </div>
    )
  }
}

export default userDataSection;