import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import SearchForm from "../../components/Form";
import { SavedList, SavedListItem  } from "../../components/Saved";
import { SearchList, SearchListItem  } from "../../components/Search";

class Home extends Component {
    state = {
      search: "",
      results: []
    };

    handleInputChange = event => {
      this.setState({ search: event.target.value });
    };


    handleFormSubmit = event => {
      event.preventDefault();
      API.nytQuery(this.state.search, this.state.startDate, this.state.endDate)
        .then(res => {
          console.log(res);
          if (res.data.status === "error") {
            throw new Error(res.data.message);
          }
          this.setState({ results: res.data.message, error: "" });
        })
        .catch(err => this.setState({ error: err.message }));
    };

render() {
  return (
    <div>

    </div>
  );
}
}

export default Home;
