import React from "react";
import "./List.css";

export const SearchList = ({ children }) => {
  return (
    <div className="walmartResults">
      <ul>
        {children}
      </ul>
    </div>
  );
};
