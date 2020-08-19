import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";

class Navbar extends Component {
  render() {

    //const { user, logout, isLoggedin } = this.props;	//	<-- UPDATE HERE
    return (
      <nav className="navbar">
            <Link to={'/'} id='home-btn'>
              <h4>Home</h4>
            </Link>
        
      </nav>
    );
  }
}

export default withAuth(Navbar);