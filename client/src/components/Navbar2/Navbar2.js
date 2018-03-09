import React from "react";
import Form from "../Form";
import Logo from "./pickitLogo.png";


const Navbar = props => (
    <div className="navBar">
        <div id="homeTitle"><a href="/"><img src={Logo} alt="pickitLogo"/></a></div>
        <div id="homeTitleTwo"><a href="/"><img src={Logo} alt="pickitLogo"/></a></div> 
        <Form/>
        <div id="signupButton"><a href="/signup">Sign Up</a></div>
        <div id="loginButton"><a href="/login">Log In</a></div>
    </div>
  );
  
  export default Navbar;