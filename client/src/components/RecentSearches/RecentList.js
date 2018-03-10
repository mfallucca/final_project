import React from "react";
import "./List.css";

export const RecentList = ({ children }) => {
  return (
    <div className="walmartResults">
      <ul>
        {children}
      </ul>
    </div>
  );
};
