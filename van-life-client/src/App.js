import React, { Component } from "react";
import "./App.css";
//import { Switch } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from './pages/Home'
//import Signup from "./pages/Signup";
//import Login from "./pages/Login";
//import Private from "./pages/Private";

//import AnonRoute from "./components/AnonRoute";
//import PrivateRoute from "./components/PrivateRoute";

import AuthProvider from "./lib/AuthProvider";

class App extends Component {
  render() {
    return (
      <AuthProvider> 
        <Navbar />
        <div className='container'>
          
          <Home />
        </div>
      </AuthProvider> 
    );
  }
}

export default App;
