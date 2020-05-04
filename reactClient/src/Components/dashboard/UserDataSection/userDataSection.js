import React from 'react'
import './userDataSection.css';

function userDataSection(props){

    console.log(props.reviews);
    


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
    )
  
}

export default userDataSection;