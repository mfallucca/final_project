import React from "react";
import "./CompareBtn.css";
// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const CompareBtn = props => (
  <button
  value={props.upc}
  onClick={props.handleCompareClick}
>
  Compare!
</button>
);

export default CompareBtn;
