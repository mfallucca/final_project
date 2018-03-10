import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Logo from "./images/pickitLogo.png";
import Form from "./components/Form";
// import routes from './routes.js';
import './Main.css';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter,
  HashRouter
} from 'react-router-dom'

import Navbar from "./components/Navbar"
import Navbar2 from "./components/Navbar2"

import Base from './components/Base.jsx';
import HomePage from './components/HomePage.jsx';
import LoginPage from './containers/LoginPage.jsx';
import LogoutFunction from './containers/LogoutFunction.jsx';
import SignUpPage from './containers/SignUpPage.jsx';
import DashboardPage from './containers/DashboardPage.jsx';
import Auth from './modules/Auth';

// remove tap delay, essential for MaterialUI to work properly
injectTapEventPlugin();

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    Auth.isUserAuthenticated() ? (
      <Component {...props} {...rest} />
    ) : (
      <Redirect to={{
        pathname: '/dashboard',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

const LoggedOutRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    Auth.isUserAuthenticated() ? (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}/>
    ) : (
      <Component {...props} {...rest} />
    )
  )}/>
)

const PropsRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    <Component {...props} {...rest} />
  )}/>
)

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false
    }
  };

  componentDidMount() {
    // check if user is logged in on refresh
    this.toggleAuthenticateStatus()
  }

  toggleAuthenticateStatus() {
    // check authenticated status and toggle state based on that
    this.setState({ authenticated: Auth.isUserAuthenticated() })
  }

  render() {
    return (

      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <HashRouter>
          <div className="pageWrapper">
            <div className="background"/>

          {this.state.authenticated ? (
            <div className="navBar">
              <div id="homeTitle"><a href="#/dashboard"><img src={Logo} alt="pickitLogo"/></a></div>
              <div id="homeTitleTwo"><a href="#/dashboard"><img src={Logo} alt="pickitLogo"/></a></div> 
              
              <div id="logoutButtonOne"><Link to='/logout'><a id="logoutOne" href="/logout">Log out</a></Link></div>
              <div id="logoutButtonTwo"><Link to='/logout'><a id="logoutTwo" href="/logout">Log out</a></Link></div>
            </div>
              ) : (

    
            <div className="navBar">
              <div id="homeTitle"><Link to='/'><a href="/"><img src={Logo} alt="pickitLogo"/></a></Link></div>
              <div id="homeTitleTwo"><Link to='/'><a href="/"><img src={Logo} alt="pickitLogo"/></a></Link></div> 
              <div id="navbarHeader"><h1>Pick It Up or Ship It Out!</h1></div>
              <div id="signupButton"><Link to='/signup'><a className="signupA" href="/signup">Sign Up</a></Link></div>
              <div id="loginButton"><Link to='/login'><a className="loginA" href="/login">Log In</a></Link></div>
            </div>
              )}



            {/* <div className="top-bar">
              <div className="top-bar-left">
                <Link to="/">Pick It or Ship It?</Link>
              </div>
              <br />
              {this.state.authenticated ? (
                <div className="top-bar-right">
                  <Link to="/dashboard">Home</Link>
                  <Link to="/logout">Log out</Link>
                </div>
              ) : (
                <div className="top-bar-right">
                  <Link to="/login">Log in</Link>
                  <Link to="/signup">Sign up</Link>
                </div>
              )}
            </div> */}

            <PropsRoute exact path="/" component={HomePage} toggleAuthenticateStatus={() => this.toggleAuthenticateStatus()} />
            <PrivateRoute path="/dashboard" component={DashboardPage}/>
            <LoggedOutRoute path="/login" component={LoginPage} toggleAuthenticateStatus={() => this.toggleAuthenticateStatus()} />
            <LoggedOutRoute path="/signup" component={SignUpPage}/>
            <Route path="/logout" component={LogoutFunction}/>
          </div>

        </HashRouter>
      </MuiThemeProvider>
    );
  }
}

export default Main;
