import React, { Component } from "react";
import "./App.css";
import { Switch } from "react-router-dom";

import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Private from "./pages/Private";

import AnonRoute from "./components/AnonRoute";
import PrivateRoute from "./components/PrivateRoute";

import AuthProvider from "./lib/AuthProvider";

class App extends Component {
  render() {
    return (
      <AuthProvider> 
        <div className='container'>
          <Navbar />
          <h1>Basic React Authentication</h1>
          <Switch>
            <AnonRoute exact path='/signup' component={Signup} />
            <AnonRoute exact path='/login' component={Login} />
            <PrivateRoute exact path='/private' component={Private} />
          </Switch>
        </div>
      </AuthProvider> 
    );
  }
}

export default App;
