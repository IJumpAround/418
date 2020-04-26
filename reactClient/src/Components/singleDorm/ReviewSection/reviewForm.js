import React, { Component } from 'react'


 class reviewForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      review: ""
    }

    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }

  handleOnChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleOnSubmit(e){
    e.preventDefualt();
    // send review to server here
    // then send review to parent(singleDorm) to render on page
    
  }

  render() {

    return (
      <div>
        <form className="form-group" onSubmit={this.handleOnSubmit}>
          <textarea className="form-control"
                    rows="5" 
                    name="review"
                    value={this.state.review}
                    onChange={this.handleOnChange}/>
        </form>
        <div className="row justify-content-end mr-1">
          <button className="btn btn-dark" type="submit">Submit</button>               
        </div>    
      </div>
    )
  }
}

export default reviewForm;