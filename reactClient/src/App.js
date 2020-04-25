import React from 'react';
import 'bootstrap/dist/js/bootstrap.bundle';
import './utils/config'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import DebugPage from './Components/debug/debug'
import LoginModal from './Components/login/LoginModal'
import RegistrationPage from "./Components/registration/registrationPage";
import SearchPage from './Components/searchComponents/SearchPage';
import Navbar from './Components/navComponents/navigation/Navbar';
import SingleDorm from './Components/singleDorm/singleDorm';
import config from 'react-global-configuration'
import {is_user_logged_in} from "./utils/auth";
import addDormForm from './Components/addDormForm/addDormForm';
import {createStore, combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form'
import {Provider} from 'react-redux';
import DashBoard from './Components/dashboard/Dash/dashboard.js';

//Returns all reducing functions as an object into the store..in our case we just have one reducing function to handle state of our addDormForm 
const reducers = combineReducers({form: formReducer});
//Redux store, this holds the complete state of our app.
//It accepts a reducing function that accepts next state tree
const store = createStore(reducers);
//console.log(store);

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showLogin: false,
            isLoggedIn: false,
            passedCoordinates: {
                lat: 42.686063,
                lng: -73.824688,
                },
            passedAddress: ''
        };

        
    }

    componentDidMount() {
        is_user_logged_in(this.setAppLoggedInState)
    }


    getLoginWindowStatus = (loginWindowStatus) => {
        this.setState({showLogin: !loginWindowStatus});
    };

    passedCoordFromMap = (coordFromOpenMap) => {
		var passedCoord = coordFromOpenMap
		this.setState({passedCoordinates: passedCoord})
    }
    
    passedAddressFromMap = (addressFromOpenMap) => {
		var address = addressFromOpenMap
		this.setState({passedAddress: address})
    }

    render() {
        
        return (
            
           <Provider store = {store}>
             {/*Set base route depending on if we are deployed to EC2 or local*/}
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
                    <Route path="/search" component={() => 
                        <SearchPage
                            coordinates = {this.passedCoordFromMap} 
                            searchAddress = {this.passedAddressFromMap}
                        />	
                    }/>
                    <Route path='/debug' component={DebugPage}/>
                    <Route path='/singleDorm' component={SingleDorm}/>
                    <Route path='/addDormForm' component={addDormForm}/>
                    <Route component={DashBoard}/>{/*KEEP THIS AS THE LAST ROUTE*/}
                </Switch>
            </Router>
           </Provider> 
        )
    }

    setAppLoggedInState = (isLoggedIn) => {
        console.log('login state function called with: ' + isLoggedIn);
        this.setState({isLoggedIn: isLoggedIn})
    }

};

export default App;