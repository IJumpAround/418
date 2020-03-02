import React, { Component } from "react";
import LandingPageWrapper from './components/landingPage/LandingPageWrapper';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";


  class App extends Component {

    render() {
      return (

       <Router>
          <Switch>
            <LandingPageWrapper path ="/" exact component={LandingPageWrapper}/> {/*Add some paths here when others get their pages done*/}
          </Switch>
        </Router>
        
      );
   }
}

export default App;
