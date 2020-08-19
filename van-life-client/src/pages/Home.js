import React, { Component } from "react";
import { withAuth } from "../lib/AuthProvider";
//import { Link } from "react-router-dom";
import { Switch } from "react-router-dom";
import './Home.css';

import Signup from "./Signup";
import Login from "./Login";
import Private from "./Private";

import AnonRoute from "../components/AnonRoute";
import PrivateRoute from "../components/PrivateRoute";

class Home extends Component {
  
  render() {

    const { user, logout, isLoggedin } = this.props;
    return (
      <div className="home-cont"> 
        <h1>Home Page</h1>
        {
            isLoggedin ? 
            (<>
              <p className="navbar-user">username: {user.username}</p>	
              <button className="navbar-button" onClick={logout}>Logout</button>	
            </>) 
          : 
            (<>
              <Switch>

              
                <AnonRoute exact path='/signup' component={Signup} />
                <AnonRoute exact path='/login' component={Login} />
                <PrivateRoute exact path='/private' component={Private} />
              </Switch>
            </>)
          }
      </div>
    )
  }
}

export default withAuth(Home);