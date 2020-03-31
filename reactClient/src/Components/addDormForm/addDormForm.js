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
                <label>Quad:</label>                
                  <Field name="buildings" className="custom-select mb-2" defaultValue={'Select Quad'} component="select">
                    <option value="Select Quad">Select Quad</option>
                    <option value="Colonial">Colonial</option>
                    <option value="Dutch">Dutch</option>
                    <option value="Indian">Indian</option>
                    <option value="State">State</option>
                  ></Field>
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
                    <Field type="number" className="form-control" name="roomNumber" component="input"/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-7">
                    <label>Address:</label>                
                    <Field type="text" className="form-control mb-2" name="address" component="input"/>
                  </div>
                  <div className="col-sm-3">
                    <label>Zip:</label>                
                    <Field type="number" className="form-control" name="zipcode" component="input"/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-5">
                    <label>Room Type:</label>                
                      <Field name="room-types" className="custom-select mb-2" defaultValue={'Select Type'} component="select"> 
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
                    <Field type="file" className="mb-2 mt-2" id="dormImage" name="dormImage" component="input"/>
                    <button type="submit" className="btn btn-dark mb-2">Upload</button>
                  </div>
                </div>               
                <div className="row">
                  <div className="col-sm-4">
                    <fieldset>   
                      <Form.Group as={Row}>
                        <Form.Label as="legend" row="true" sm={2}>
                          Bathroom:
                        </Form.Label>
                        <Col sm={10}>
                          <Form.Check
                          
                            type="checkbox"
                            label="In Dorm"
                            name=""
                            id=""
                          />
                          <Form.Check
                            type="checkbox"
                            label="On Floor"
                            name=""
                            id=""
                          />                      
                        </Col>
                      </Form.Group>
                    </fieldset>
                  </div>
                  <div className="col-sm-4">
                    <fieldset>   
                        <Form.Group as={Row}>
                          <Form.Label as="legend" row="true"sm={2}>
                            Air Conditioning:
                          </Form.Label>
                          <Col sm={10}>
                            <Form.Check
                              type="checkbox"
                              label="Yes"
                              name=""
                              id=""
                            />
                            <Form.Check
                              type="checkbox"
                              label="No"
                              name=""
                              id=""
                            />                      
                          </Col>
                        </Form.Group>
                      </fieldset>
                  </div>
                  <div className="col-sm-4">
                    <fieldset>   
                        <Form.Group as={Row}>
                          <Form.Label as="legend" row="true" sm={2}>
                            Fitness Area:
                          </Form.Label>
                          <Col sm={10}>
                            <Form.Check
                              type="checkbox"
                              label="Yes"
                              name=""
                              id=""
                            />
                            <Form.Check
                              type="checkbox"
                              label="No"
                              name=""
                              id=""
                            />                      
                          </Col>
                        </Form.Group>
                      </fieldset>
                  </div>
                  <div className="col-sm-4">
                    <fieldset>   
                        <Form.Group as={Row}>
                          <Form.Label as="legend" row="true" sm={2}>
                            Laundry:
                          </Form.Label>
                          <Col sm={10}>
                            <Form.Check
                              type="checkbox"
                              label="In Dorm"
                              name=""
                              id=""
                            />
                            <Form.Check
                              type="checkbox"
                              label="On Floor"
                              name=""
                              id=""
                            />                      
                          </Col>
                        </Form.Group>
                      </fieldset>
                  </div>
                  <div className="col-sm-4">
                    <fieldset>   
                        <Form.Group as={Row}>
                          <Form.Label as="legend" row="true" sm={2}>
                            Internet:
                          </Form.Label>
                          <Col sm={10}>
                            <Form.Check
                              type="checkbox"
                              label="Wifi"
                              name=""
                              id=""
                            />
                            <Form.Check
                              type="checkbox"
                              label="Ethernet"
                              name=""
                              id=""
                            />                      
                            <Form.Check
                              type="checkbox"
                              label="Both"
                              name=""
                              id=""
                            />                      
                          </Col>
                        </Form.Group>
                      </fieldset>
                  </div>
                  <div className="col-sm-4">
                    <fieldset>   
                        <Form.Group as={Row}>
                          <Form.Label as="legend" row="true"sm={2}>
                            Dinning:
                          </Form.Label>
                          <Col sm={10}>
                            <Form.Check
                              type="checkbox"
                              label="Dining Hall"
                              name=""
                              id=""
                            />
                            <Form.Check
                              type="checkbox"
                              label="In Dorm Kitchen "
                              name=""
                              id=""
                            />                                                                   
                          </Col>
                        </Form.Group>
                      </fieldset>
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