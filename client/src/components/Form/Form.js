import React from "react";

// Using the datalist element we can create autofill suggestions based on the props.breeds array
const SearchForm = props =>
  <form className="search">
    <div className="form-group">
      <label htmlFor="queryString">Search:</label>
      <input
        value={props.search}
        onChange={props.handleInputChangeQuery}
        name="queryString"
        type="text"
        className="form-control"
        placeholder="Enter Your Search Term"
        id="queryString"
      />
      <input
        value={props.search}
        onChange={props.handleInputChangeStart}
        name="startDate"
        type="text"
        className="form-control"
        placeholder="Start Date YYYYMMDD"
        id="startDate"
      />
      <input
        value={props.search}
        onChange={props.handleInputChangeEnd}
        name="endDate"
        type="text"
        className="form-control"
        placeholder="End Date YYYYMMDD"
        id="endDate"
      />
      <button
        type="submit"
        onClick={props.handleFormSubmit}
        className="btn btn-success"
      >
        Search
      </button>
    </div>
  </form>;

export default SearchForm;
