import React, { Component } from 'react'
import {Form,Row,Col} from 'react-bootstrap';

class addDormForm extends Component {

  render() {
    return (
      <div className="container">     
        <div className="card">
          <div className="card-body">
            <h3 className="card-title text-center">Add Your Dorm</h3>
            <form className="card-text">
              <div className="form-group">
                <label>Quad:</label>                
                  <select name="buildings" className="custom-select mb-2">
                    <option selected>Select Quad</option>
                    <option value="Colonial">Colonial</option>
                    <option value="Dutch">Dutch</option>
                    <option value="Indian">Indian</option>
                    <option value="State">State</option>
                  </select>
                <div className="row">
                  <div className="col-sm-6 mb-2">
                    <label>Building:</label>                
                    <input type="text" className="form-control" />       
                  </div>
                  <div className="col-sm-2">
                    <label>Floor #:</label>                
                    <input type="number" className="form-control" />
                  </div>
                  <div className="col-sm-2">
                    <label>Room #:</label>                
                    <input type="number" className="form-control" />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-7">
                    <label>Address:</label>                
                    <input type="text" className="form-control mb-2" />
                  </div>
                  <div className="col-sm-3">
                    <label>Zip:</label>                
                    <input type="number" className="form-control" />
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-5">
                    <label>Room Type:</label>                
                      <select name="room-types" className="custom-select mb-2">
                        <option selected>Select Type</option>
                        <option value="Single">Single</option>
                        <option value="Double">Double</option>
                        <option value="Triple">Triple</option>
                        <option value="Quad">Quad</option>
                     </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-5">
                    <label className="">Dorm Image:</label>
                    <input type="file" className="mb-2 mt-2" id="dormImage" name="dormImage"></input>
                    <button type="submit" className="btn btn-dark mb-2">Upload</button>
                  </div>
                </div>               
                <div className="row">
                  <div className="col-sm-4">
                    <fieldset>   
                      <Form.Group as={Row}>
                        <Form.Label as="legend" row sm={2}>
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
                          <Form.Label as="legend" row sm={2}>
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
                          <Form.Label as="legend" row sm={2}>
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
                          <Form.Label as="legend" row sm={2}>
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
                          <Form.Label as="legend" row sm={2}>
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
                          <Form.Label as="legend" row sm={2}>
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
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default addDormForm;