import React from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard.jsx';
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import SearchForm from "../components/Form";
import { SearchList, SearchListItem  } from "../components/Search";
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
      resultTitle: '',
      walmartResults: [],
      search: ''
    };
    this.handleInputChangeQuery = this.handleInputChangeQuery.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  handleInputChangeQuery(event) {
    this.setState({ search: event.target.value });
  };

  handleFormSubmit(event) {
    event.preventDefault();
    const walmartxhr = new XMLHttpRequest();
    let search = this.state.search
    walmartxhr.open('get', '/api/walmart/' + search);
    walmartxhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    walmartxhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    walmartxhr.responseType = 'json';
    walmartxhr.addEventListener('load', () => {
    // console.log(walmartxhr)
    if (walmartxhr.status === 200) {
      this.setState({
        walmartResults: walmartxhr.response.queryResults[0].items
      });
      console.log(this.state.walmartResults)
    }
  });
  walmartxhr.send();

  };

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
    if (amazonxhr.status === 200) {
    this.setState({
      url: amazonxhr.response.url,
      medimage: amazonxhr.response.medimage,
      resultTitle: amazonxhr.response.title
    });
  }
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
          <SearchForm 
            handleFormSubmit={this.handleFormSubmit}
            handleInputChangeQuery={this.handleInputChangeQuery}
          />
        </Container>
        <Container fluid>
        <Row>
          <Col size="col-sm-6 col-md-6 col-md-offset-3">
              {this.state.walmartResults.length ? (
                <SearchList>
                  {this.state.walmartResults.map(walmartContainer => (
                    <SearchListItem key={walmartContainer._id}>
                      <a href={walmartContainer.productUrl}>
                        <strong>
                          {walmartContainer.name}
                        </strong>
                      </a>
                      <p>
                          ${walmartContainer.salePrice}
                      </p>
                    </SearchListItem>
                  ))}
                </SearchList>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
        {/* <Container>
          <Row>
            <Col size="md-12 sm-12">
              <Jumbotron>
                <p><a href = {this.state.url}>{this.state.resultTitle}</a></p>  
                <img src= {this.state.medimage}></img>
              </Jumbotron>
            </Col>
          </Row>
        </Container> */}
      </div>
    );
  }
}
export default DashboardPage;