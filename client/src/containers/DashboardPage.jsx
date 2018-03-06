import React from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard.jsx';
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import SearchForm from "../components/Form";
import { SearchList, SearchListItem  } from "../components/Search";
import CompareBtn from "../components/CompareBtn";
class DashboardPage extends React.Component {
  /**
   * Class constructor.
   */
  constructor(props) {
    super(props);
    this.state = {
      secretData: '',
      user: {},
      upc: '',
      url: '',
      medimage: '',
      resultTitle: '',
      walmartResults: [],
      search: '',
      amazonPrice: '',
      ebayTitle: '',
      ebayImage: '',
      ebayPrice: '',
      ebayShipping: '',
      ebayURL: '',
      show: false
    };
    this.handleInputChangeQuery = this.handleInputChangeQuery.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleCompareClick = this.handleCompareClick.bind(this);
    this.loadAmazon = this.loadAmazon.bind(this);
    this.loadEbay = this.loadEbay.bind(this);
    this.loadBoth = this.loadBoth.bind(this);
  }

  handleInputChangeQuery(event) {
    this.setState({ search: event.target.value });
  };

  handleCompareClick(event) {
    this.setState({ upc: event.target.value, show: true }, this.loadBoth)
    console.log(this.state.upc)
  }


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
  }

  // method to call the Amazon API

  loadAmazon() {
    const amazonxhr = new XMLHttpRequest();
    let upc = this.state.upc
    console.log(amazonxhr);
    amazonxhr.open('get', '/api/amazon/' + upc);
    amazonxhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    amazonxhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    amazonxhr.responseType = 'json';
    amazonxhr.addEventListener('load', () => {
    // console.log(amazonxhr)
    if (amazonxhr.status === 200 && amazonxhr.response.url) {
      this.setState({
        url: amazonxhr.response.url,
        medimage: amazonxhr.response.medimage,
        resultTitle: amazonxhr.response.title,
        amazonPrice: amazonxhr.response.newprice
      })
    }
    else {
      this.setState({
        url: '',
        medimage: '',
        resultTitle: '',
        amazonPrice: ''
    })
  }
  });
  amazonxhr.send();
}

// method to call the Ebay API

  loadEbay() {
    const ebayxhr = new XMLHttpRequest();
    let upc = this.state.upc
    ebayxhr.open('get', '/api/ebay/' + upc);
    ebayxhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    ebayxhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    ebayxhr.responseType = 'json';
    ebayxhr.addEventListener('load', () => {
    // console.log(ebayxhr)
    if (ebayxhr.status === 200) {
    this.setState({
      ebayTitle: ebayxhr.response.ebayTitle,
      ebayImage: ebayxhr.response.ebayImage,
      ebayPrice: ebayxhr.response.ebayPrice,
      ebayShipping: ebayxhr.response.ebayShipping,
      ebayURL: ebayxhr.response.ebayURL
    });
  }
  });
  ebayxhr.send();
  }

// Method to call both the amazon and ebay APIs simultaneously

  loadBoth() {
    this.loadAmazon();
    this.loadEbay();
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
        </Container><br />
        <Container fluid>
        <Row>
          {!this.state.show ? (
            <Col size="sm-12 md-12">
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
                      <CompareBtn
                        upc={walmartContainer.upc}
                        handleCompareClick={this.handleCompareClick}
                      />
                    </SearchListItem>
                  ))}
                </SearchList>
            ) : (
              <h3 className = "text-center">Please Search Using the Box Above!</h3>
            )}
          </Col>
          ) : (
            <Col size="sm-6 md-6">
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
                      <CompareBtn
                        upc={walmartContainer.upc}
                        handleCompareClick={this.handleCompareClick}
                      />
                    </SearchListItem>
                  ))}
                </SearchList>
            ) : (
              <h3>Please Search Using the Box Above!</h3>
            )}
          </Col>
          )}
          {this.state.show ? (
            <Col size="md-6 sm-6">
          {this.state.url ? (
            <Container>
              <h2>Amazon.com's Best Match:</h2>
              <p><a href = {this.state.url}>{this.state.resultTitle}</a></p>
              <p>{this.state.amazonPrice}</p>
              <img src= {this.state.medimage}></img>
            </Container>
          ) : (
            <h3 className = "text-center">No Amazon Results to Display</h3>
          )}
          <hr />
            {this.state.ebayTitle ? (
              <Container>
                <h2>eBay.com's Best Match:</h2>
                <p><a href ={this.state.ebayURL}>{this.state.ebayTitle}</a></p>
                <p> Price: {this.state.ebayPrice}</p><p> Shipping: {this.state.ebayShipping}</p>
                <img src={this.state.ebayImage}></img>
              </Container>
            ) : (
              <h3 className = "text-center">No Ebay Results to Display</h3>
            )}
          </Col>
            ) : (
              console.log("hiding")
            )}
        </Row>
      </Container><br />


      </div>
    );
  }
}
export default DashboardPage;