import React from 'react'
import {Form,Row,Col} from 'react-bootstrap';
import {reduxForm, Field,} from 'redux-form';

const onSubmit = values => {
  alert(JSON.stringify(values));
}

function addDormForm ({handleSubmit}) { //We can grab handleSubmit from redux-form
  return(
      <div className="container">     
        <div className="card">
          <div className="card-body">
            <h3 className="card-title text-center">Add Your Dorm</h3>
            <form className="card-text" onSubmit={handleSubmit}>
              <div className="form-group">
                <div className="row">
                  <div className="col-sm-4">
                <label>Quad:</label>                
                  <Field name="quad" className="custom-select mb-2" defaultValue={'Select Quad'} component="select">
                    <option value="Select Quad">Select Quad</option>
                    <option value="Colonial">Colonial</option>
                    <option value="Dutch">Dutch</option>
                    <option value="Indian">Indian</option>
                    <option value="State">State</option>
                  ></Field>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6 mb-2">
                    <label>Building:</label>                
                    <Field type="text" className="form-control" name="building" component="input"/>       
                  </div>
                  <div className="col-sm-2">
                    <label>Floor #:</label>                
                    <Field type="number" className="form-control" name="floor" component="input" />
                  </div>
                  <div className="col-sm-2">
                    <label>Room #:</label>                
                    <Field type="number" className="form-control" name="room_number" component="input"/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-7">
                    <label>Address:</label>                
                    <Field type="text" className="form-control mb-2" name="address" component="input"/>
                  </div>
                  <div className="col-sm-3">
                    <label>Zip:</label>                
                    <Field type="number" className="form-control" name="zip_code" component="input"/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-2">
                    <label>State:</label>                
                    <Field type="text" className="form-control mb-2" name="state" component="input"/>
                  </div>
                  <div className="col-sm-3">
                    <label>City:</label>                
                    <Field type="text" className="form-control" name="city" component="input"/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-4">
                    <label>Room Type:</label>                
                      <Field name="room_type" className="custom-select mb-2" defaultValue={'Select Type'} component="select"> 
                        <option value="Select Type">Select Type</option>
                        <option value="Single">Single</option>
                        <option value="Double">Double</option>
                        <option value="Triple">Triple</option>
                        <option value="Quad">Quad</option>
                      ></Field>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-5">
                    <label className="">Dorm Image:</label>
                    <Field type="file" className="mb-2 mt-2" id="dorm_image" name="dorm_image" component="input"/>
                  </div>
                </div>               
                <div className="row mt-3">
                  <div className="col-sm-4">
                    <label>Bathroom:</label>                                                                
                      <div className="row">  
                        <div>
                          <Field  type="checkbox" 
                                  name="bath_dorm"
                                  id="bath_dorm" 
                                  component="input"/>In Dorm                                           
                        </div>  
                    </div>                                                                 
                      <div className="row">  
                        <div>
                          <Field  type="checkbox" 
                                  name="bath_floor"
                                  id="bath_floor" 
                                  component="input"/>On Floor                                           
                        </div>  
                    </div>                                                                 
                  </div>
                  <div className="col-sm-4">
                    <label>Air Conditioning:</label>                                                                
                      <div className="row">  
                        <div>
                          <Field  type="checkbox" 
                                  name="ac_yes"
                                  id="ac_yes" 
                                  component="input"/>Yes                                          
                        </div>  
                    </div>                                                                 
                      <div className="row">  
                        <div>
                          <Field  type="checkbox" 
                                  name="ac_no"
                                  id="ac_no" 
                                  component="input"/>No                                           
                        </div>  
                    </div>                                                                 
                  </div>
                  <div className="col-sm-4 mb-4">
                    <label>Fitness Area:</label>                                                                
                      <div className="row">  
                        <div>
                          <Field  type="checkbox" 
                                  name="gym_yes"
                                  id="gym_yes" 
                                  component="input"/>Yes                                         
                        </div>  
                    </div>                                                                 
                      <div className="row">  
                        <div>
                          <Field  type="checkbox" 
                                  name="gym_no"
                                  id="gym_no" 
                                  component="input"/>No                                         
                        </div>  
                    </div>                                                                 
                  </div>
                  <div className="col-sm-4">
                    <label>Laundry:</label>                                                                
                      <div className="row">  
                        <div>
                          <Field  type="checkbox" 
                                  name="laundry_dorm"
                                  id="laundry_dorm" 
                                  component="input"/>In Dorm                                      
                        </div>  
                    </div>                                                                 
                      <div className="row">  
                        <div>
                          <Field  type="checkbox" 
                                  name="laundry_floor"
                                  id="laundry_floor" 
                                  component="input"/>On Floor                                     
                        </div>  
                    </div>                                                                 
                  </div>
                  <div className="col-sm-4">
                    <label>Internet:</label>                                                                
                      <div className="row">  
                        <div>
                          <Field  type="checkbox" 
                                  name="wifi"
                                  id="wifi" 
                                  component="input"/>Wifi                                     
                        </div>  
                    </div>                                                                 
                      <div className="row">  
                        <div>
                          <Field  type="checkbox" 
                                  name="ethernet"
                                  id="ethernet" 
                                  component="input"/>Ethernet                                   
                        </div>  
                    </div>                                                                 
                      <div className="row">  
                        <div>
                          <Field  type="checkbox" 
                                  name="internet_both"
                                  id="internet_both" 
                                  component="input"/>Both                                   
                        </div>  
                    </div>                                                                 
                  </div>
                  <div className="col-sm-4">
                    <label>Dinning:</label>                                                                
                      <div className="row">  
                        <div>
                          <Field  type="checkbox" 
                                  name="dinning_hall"
                                  id="dinning_hall" 
                                  component="input"/>Dinning Hall                                      
                        </div>  
                    </div>                                                                 
                      <div className="row">  
                        <div>
                          <Field  type="checkbox" 
                                  name="dorm_kitchen"
                                  id="dorm_kitchen" 
                                  component="input"/>In Dorm Kitchen                                     
                        </div>  
                    </div>                                                                 
                  </div>
                </div>              
              </div>
              <div className="align-items-center">
              <button className="btn btn-dark">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>

  );
}

 
export default reduxForm({ //Wrapping our component with reduxForm
  form: 'add-dorm-form', //config form with unique name
  onSubmit, //created own onSubmit 
})(addDormForm);