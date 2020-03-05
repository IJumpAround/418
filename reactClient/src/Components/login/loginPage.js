import React from 'react'
import NavBar from '../navComponents/navigation/Navbar'
import LoginModal from "./LoginModal";

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isFlushed: false
        };
    }

    render() {
        return (
            <div>
            <NavBar/>
                <div className="row">
                    <div className="col">
                        <LoginModal
                            showLogin={true}/>
                    </div>
                </div>
            </div>
        )
    }
}


export default LoginPage