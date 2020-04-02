import React from "react";

let Preloader = props => {
  return (
    <div className="align-middle mx-auto" style={{ width: "100%" }}>
      <div className="spinner-border " role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Preloader;
