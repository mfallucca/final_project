import React from "react";
import "./CompareBtn.css";
const FontAwesome = require('react-fontawesome');
// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const CompareBtn = props => (
  <button
  className="compareButton"
  value={props.upc}
  onClick={props.handleCompareClick}>
  <FontAwesome name='arrow-right' />
    {/* <i class="fas fa-arrow-right"></i> */}
  </button>
);


export default CompareBtn;
