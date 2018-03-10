import React from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard.jsx';
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import SearchForm from "../components/Form";
import { SearchList, SearchListItem  } from "../components/Search";
import { RecentList, RecentListItem  } from "../components/RecentSearches";
import CompareBtn from "../components/CompareBtn";
import Navbar from "../components/Navbar";
const FontAwesome = require('react-fontawesome');

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
      show: false,
      saved: []
    };
    this.handleInputChangeQuery = this.handleInputChangeQuery.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleCompareClick = this.handleCompareClick.bind(this);
    this.loadAmazon = this.loadAmazon.bind(this);
    this.loadEbay = this.loadEbay.bind(this);
    this.loadBoth = this.loadBoth.bind(this);
    this.addSaved = this.addSaved.bind(this);
    this.retrieveSaved = this.retrieveSaved.bind(this);
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
  this.addSaved()

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
        this.retrieveSaved()
      }
    });
    xhr.send();
  }

  // method to call the Amazon API

  loadAmazon() {
    const amazonxhr = new XMLHttpRequest();
    let upc = this.state.upc
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

// method to call the Saved API
  addSaved() {
    const savedxhr = new XMLHttpRequest();
    let email = this.state.user.email;
    console.log(email)
    let savedTerm = this.state.search;
    console.log(savedTerm)
    savedxhr.open('get', '/api/saved/' + email + "/" + savedTerm);
    savedxhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    savedxhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    savedxhr.responseType = 'json';
    savedxhr.addEventListener('load', () => {
    // console.log(savedxhr)
    if (savedxhr.status === 200) {
    console.log("new item saved")
  }
  });
  savedxhr.send();
  }

  retrieveSaved() {
    const retrievexhr = new XMLHttpRequest();
    let email = this.state.user.email;
    console.log(email)
    retrievexhr.open('get', '/api/retrieve/' + email);
    retrievexhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // set the authorization HTTP header
    retrievexhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    retrievexhr.responseType = 'json';
    retrievexhr.addEventListener('load', () => {
    // console.log(retrievexhr)
    if (retrievexhr.status === 200) {
    this.setState({
      saved: retrievexhr.response.savedResults
    })
    console.log(this.state.saved)
  }
  });
  retrievexhr.send();
  }


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
    if (ebayxhr.status === 200 && ebayxhr.response.ebayURL) {
    this.setState({
      ebayTitle: ebayxhr.response.ebayTitle,
      ebayImage: ebayxhr.response.ebayImage,
      ebayPrice: ebayxhr.response.ebayPrice,
      ebayShipping: ebayxhr.response.ebayShipping,
      ebayURL: ebayxhr.response.ebayURL
    })
  }
  else {
    this.setState({
      ebayTitle: '',
      ebayImage: '',
      ebayPrice: '',
      ebayShipping: '',
      ebayURL: ''
    })
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
      <div className='mainContent'>
      <SearchForm 
            handleFormSubmit={this.handleFormSubmit}
            handleInputChangeQuery={this.handleInputChangeQuery}
          />
          {!this.state.show ? (
            <div className="walmartWindowFull">

            {this.state.walmartResults.length ? (
             <div>
               <h1 className="walmartHeader">Walmart Results</h1>
                <SearchList>
                  {this.state.walmartResults.map(walmartContainer => (
                    <SearchListItem key={walmartContainer.itemId}>
                      <a target="_blank" href={walmartContainer.productUrl}>
                        <p>{walmartContainer.name}</p>
                      </a>
                      <p>${walmartContainer.salePrice}</p>
                      <CompareBtn
                        upc={walmartContainer.upc}
                        handleCompareClick={this.handleCompareClick}
                      />
                    </SearchListItem>
                  ))}
                  </SearchList>
                  </div>
                ) : (
                  <div>
                  <h3 className = "text-center">Please Search Using the Box Above!</h3>
                  <h4 className = "text-center">Your Most Recent Searches:</h4>
                  {this.state.saved.length ? (
                    <RecentList>
                      {this.state.saved.map(savedContainer => (
                      <RecentListItem>
                        <p>{savedContainer}</p>
                      </RecentListItem>
                      ))}
                    </RecentList>
                  ): (
                    console.log("no saved items")
                  )}
                  </div>
                )}
            </div>
            ) : (
            <div className="walmartWindowHalf">
            <h1 className="walmartHeader">Walmart Results</h1>
            {this.state.walmartResults.length ? (
                <SearchList>
                  {this.state.walmartResults.map(walmartContainer => (
                    <SearchListItem key={walmartContainer.itemId}>
                      <a target="_blank" href={walmartContainer.productUrl}>
                        <p>{walmartContainer.name}</p>
                      </a>
                      <p>${walmartContainer.salePrice}</p>
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
            </div>
            )}
            {this.state.show ? (
          <div className="ebayAmazonSection">
            {this.state.url ? (
            <div className="amazonWindow">
              <h2 className="amazonHeader">Amazon.com's Best Match</h2>
              <div className="amazonResult">
                <p><a target="_blank" href = {this.state.url}>{this.state.resultTitle}</a></p>
                <p>{this.state.amazonPrice}</p>
                <img src= {this.state.medimage}></img>
              </div>
            </div>
          ) : (
            <h3 className = "text-center">No Amazon Results to Display</h3>
          )}
            {this.state.ebayTitle ? (
              <div className="ebayWindow">
                <h2 className="ebayHeader">eBay.com's Best Match:</h2>
                <div className="ebayResult">
                  <p><a target="_blank" href ={this.state.ebayURL}>{this.state.ebayTitle}</a></p>
                  <p> Price: ${this.state.ebayPrice}</p>
                  <p> Shipping: ${this.state.ebayShipping}</p>
                  <img src={this.state.ebayImage}></img>
                </div>
              </div>
            ) : (
              <h3 className = "text-center">No Ebay Results to Display</h3>
            )}
            {/* {this.state.saved.length ? (
              <SearchList>
                <h2>Previous Search Terms:</h2>
              {this.state.saved.map(savedContainer => (
                <SearchListItem>
                    <strong>
                      {savedContainer}
                    </strong>
                </SearchListItem>
              ))}
              </SearchList>
            ) : (
              <h3 className = "text-center">No previous searches to display</h3>
            )} */}
          </div>
            ) : (
              console.log("hiding")
            )}
            </div>
    )
  }
};



        {/* <Dashboard user={this.state.user} />
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
                    <SearchListItem key={walmartContainer.itemId}>
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
                    <SearchListItem key={walmartContainer.itemId}>
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
                <p> Price: ${this.state.ebayPrice}</p><p> Shipping: ${this.state.ebayShipping}</p>
                <img src={this.state.ebayImage}></img>
              </Container>
            ) : (
              <h3 className = "text-center">No Ebay Results to Display</h3>
            )}
            {this.state.saved.length ? (
              <SearchList>
                <h2>Previous Search Terms:</h2>
              {this.state.saved.map(savedContainer => (
                <SearchListItem>
                    <strong>
                      {savedContainer}
                    </strong>
                </SearchListItem>
              ))}
              </SearchList>
            ) : (
              <h3 className = "text-center">No previous searches to display</h3>
            )}
          </Col>
            ) : (
              console.log("hiding")
            )}
        </Row>
      </Container><br />


      </div> */}
//     );
//   }
// }
export default DashboardPage;