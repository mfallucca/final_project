import React from "react";
import Form from "../Form";
import Logo from "./pickitLogo.png";


const Navbar = props => (
    <div className="navBar">
        <div id="homeTitle"><a href="/"><img src={Logo} alt="pickitLogo"/></a></div>
        <div id="homeTitleTwo"><a href="/"><img src={Logo} alt="pickitLogo"/></a></div> 
        <Form/>
        <div id="logoutButtonOne"><a id="logoutOne" href="/logout">Log out</a></div>
        <div id="logoutButtonTwo"><a id="logoutTwo" href="/logout">Log out</a></div>
    </div>
  );
  
  export default Navbar;