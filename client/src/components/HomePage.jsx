import React from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import Auth from '../modules/Auth';
import {Redirect} from "react-router-dom";


class HomePage extends React.Component {

  componentDidMount() {
    // update authenticated state on logout
    this.props.toggleAuthenticateStatus()
  }

  render() {
    return (
      <div>
      <br />
      <Card className="container" style={{borderRadius: '10px', backgroundColor: '#fefefeec'}}>
        <CardTitle title="Welcome to Pick It Up or Ship It Out!" />
        <h5>Save time by deciding whether to order a product online or to grab it at your local Walmart!</h5>
          {Auth.isUserAuthenticated() ? (
            <Redirect to="/dashboard" push/>
          ) : (
            <div>
              <CardText style={{ fontSize: '16px', color: 'green' }}>You are not logged in.</CardText>
              <h4 class="form-signin-heading text-center">New user?  Sign up <a href = "#/signup">here</a></h4>
              <h4 class="form-signin-heading text-center">Already have an account?  Log in <a href = "#/login">here</a></h4>
              <br />
            </div>
          )}
      </Card>
      </div>
    )
  }
};

export default HomePage;
