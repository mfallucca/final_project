import React from 'react';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import Auth from '../modules/Auth';

class HomePage extends React.Component {

  componentDidMount() {
    // update authenticated state on logout
    this.props.toggleAuthenticateStatus()
  }

  render() {
    return (
      <div>
      <br />
      <Card className="container">
        <CardTitle title="Welcome to Pick It Up or Ship It Out!" />
          {Auth.isUserAuthenticated() ? (
            <CardText style={{ fontSize: '16px', color: 'green' }}>Welcome! You are logged in.</CardText>
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
