import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle, CardText } from 'material-ui/Card';

const Dashboard = ({ user }) => (
  <Card className="container">
    <CardTitle
      title="Dashboard"
      subtitle="You should get access to this page only after authentication."
    />
  {<CardText style={{ fontSize: '16px', color: 'green' }}>Welcome <strong>{user.name}</strong></CardText>}
  </Card>
);



export default Dashboard;
