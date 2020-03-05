import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import React from "react";
import LoginForm from "./loginForm";


class LoginModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showLogin: true
        };

        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {

        return (
            <div onClick={e => e.stopPropagation()}>
                <Modal
                    centered={true}
                    show={this.state.showLogin}
                    onHide={this.handleClose}>
                    <form id="loginForm">
                    <Modal.Header
                        closeButton
                    >
                        <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <LoginForm
                        ref={this.loginForm}/>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary"
                        onClick={this.handleClose}>Close</Button> 
                        <Button variant="primary"
                        onClick={this.handleSubmit}>Log In</Button>
                    </Modal.Footer>
                    </form>
                </Modal>
            </div>
        )


    }


    handleSubmit() {
        alert('You clicked log in!')

    }

    handleClose() {
        this.setState({showLogin: false})
    }

    handleShow() {
        this.setState({showLogin: true})
    }

}

export default LoginModal