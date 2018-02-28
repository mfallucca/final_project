import React from "react";

// Using the datalist element we can create autofill suggestions based on the props.breeds array
const SearchForm = props =>
  <form className="search">
    <div className="form-group">
      <label htmlFor="queryString">Search Text:</label>
      <input
        value={props.search}
        onChange={props.handleInputChangeQuery}
        name="queryString"
        type="text"
        className="form-control"
        placeholder="Enter Your Search Term"
        id="queryString"
      />
      <br />
      <button
        type="submit"
        onClick={props.handleFormSubmit}
        className="btn btn-success col-sm-12 col-md-6 col-md-offset-3"
      >
        Search
      </button>
    </div>
  </form>;

export default SearchForm;
