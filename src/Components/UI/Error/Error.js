import React from "react";
import "./Error.css";

const Error = ({ msg }) => {
  return (
    <div className="error-section">
      <img src="/Images/Extras/Error.png" alt="Error" />
      <span>{msg}</span>
    </div>
  );
};

export default Error;
