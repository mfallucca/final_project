import React from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard.jsx';
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
class DashboardPage extends React.Component {
  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);
    this.state = {
      secretData: '',
      user: {},
      upc: '040000395058',
      url: '',
      medimage: '',
      resultTitle: ''
    };
  }
  /**
   * This method will be executed after initial rendering.
   */
  componentDidMount() {
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/api/dashboard');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        this.setState({
          user: xhr.response.user
        });
      }
    });
    xhr.send();
    const amazonxhr = new XMLHttpRequest();
    let upc = this.state.upc
    amazonxhr.open('get', '/api/amazon/' + upc);
    amazonxhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    amazonxhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    amazonxhr.responseType = 'json';
    amazonxhr.addEventListener('load', () => {
    // console.log(amazonxhr)
    if (xhr.status === 200) {
    this.setState({
      url: amazonxhr.response.url,
      medimage: amazonxhr.response.medimage,
      resultTitle: amazonxhr.response.title
    });
  }
    console.log(this.state.item)
  });
  amazonxhr.send();
}
  /**
   * Render the component.
   */
  render() {
    return (
      <div>
        <Dashboard user={this.state.user} />
        <Container>
          <Row>
            <Col size="md-12 sm-12">
              <Jumbotron>
                <p><a href = {this.state.url}>{this.state.resultTitle}</a></p>  
                <img src= {this.state.medimage}></img>
              </Jumbotron>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default DashboardPage;