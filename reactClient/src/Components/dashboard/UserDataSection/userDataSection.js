import React, { Component } from 'react'
import './userDataSection.css';

 class userDataSection extends Component {

  render() {

    return (
      
      <div className="table table-striped border rounded">
          <div className="custom-thead">
           <table>
             <tbody>
               <tr>
                <th>User Data</th>
              </tr>       
             </tbody>
             </table> 
          </div>
        <table>
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
        </table> 
        </div>
    )
  }
}

export default userDataSection;