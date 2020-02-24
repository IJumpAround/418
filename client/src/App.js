import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/navigation/navigation/Navbar";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Navbar /> {/*Add some paths here when others get their pages done*/}
        </Switch>
        <body class="bg-color"></body>
      </Router>
    );
  }
}

export default App;
