import React from "react";
import "./List.css";

export const RecentList = ({ children }) => {
  return (
    <div className="recentList">
      <ul>
        {children}
      </ul>
    </div>
  );
};
