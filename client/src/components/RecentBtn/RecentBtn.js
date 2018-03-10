import React from "react";
import "./RecentBtn.css";
// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
const RecentBtn = props => (
  <button
  className="recent-btn"
  value={props.value}
  onClick={props.handleRecentClick}>
    <i class="fas fa-arrow-right"></i>
    {props.value}
  </button>
);


export default RecentBtn;
