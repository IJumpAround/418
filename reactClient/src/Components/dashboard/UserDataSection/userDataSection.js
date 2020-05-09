import React from 'react'
import './userDataSection.css';

function userDataSection(props){

    console.log(props.reviews);
    


    return (
      <div className="list-group">
        <div className="list-group-item">
          <h4>User Data</h4>
        </div>
        <div className="list-group-item">
          <p>Reviews: {props.reviews}</p>
        </div>
        <div className="list-group-item">
          <p>Tags: {props.tags}</p>
        </div>

      </div>
      /*
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
                  <td style={{width: "10%"}}>Posts: {props.posts}</td>
                </tr>
                <tr>
                  <td>Reviews: {props.reviews}</td>
                </tr>
                <tr>
                  <td>Tags: {props.tags}</td>
                </tr>    
          </tbody>
        </table> 
        </div>
        */
    )
  
}

export default userDataSection;