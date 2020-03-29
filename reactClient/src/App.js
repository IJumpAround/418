import React from 'react';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import 'bootstrap/dist/js/bootstrap.bundle';
import './utils/config'
import DebugPage from './Components/debug/debug'
import LoginModal from './Components/login/LoginModal'
import RegistrationPage from "./Components/registration/registrationPage";
import SearchPage from './Components/searchComponents/SearchPage';
import Navbar from './Components/navComponents/navigation/Navbar';
import DashBoardWrapper from './Components/dashboard/dashboardWrapper';
import SingleDorm from './Components/singleDorm/singleDorm';
import config from 'react-global-configuration'
import {is_user_logged_in} from "./utils/auth";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showLogin: false,
            isLoggedIn: false
        };
    }


    componentDidMount() {
        is_user_logged_in(this.setAppLoggedInState)
    }


    getLoginWindowStatus = (loginWindowStatus) => {
        this.setState({showLogin: !loginWindowStatus});
    };


    render() {
        return (
            // Set base route depending on if we are deployed to EC2 or local
            <Router basename={config.get('subfolder')}>
                <Navbar isLoggedIn={this.state.isLoggedIn}
                        setAppLoginState={this.setAppLoggedInState}/>
                <div className="row">
                    <div className="col">
                        <LoginModal loginResultFn={this.setAppLoggedInState}/>
                    </div>
                </div>
                <Switch>
                    <RegistrationPage path="/" exact component={RegistrationPage}/>
                    <Route path='/register' component={RegistrationPage}/>
                    <Route path="/search" component={SearchPage}/>
                    <Route path='/debug' component={DebugPage}/>
                    <Route path='/dashboard' component={DashBoardWrapper}/>
                    <Route path='/singleDorm' component={SingleDorm}/>
                </Switch>
            </Router>
        )
    }

    setAppLoggedInState = (isLoggedIn) => {
        console.log('login state function called with: ' + isLoggedIn);
        this.setState({isLoggedIn: isLoggedIn})
    }

};

export default App;