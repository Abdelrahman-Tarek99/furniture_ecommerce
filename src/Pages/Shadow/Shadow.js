import React from "react";
import "bootstrap/dist/css/bootstrap.css";

function Shadow(props) {
  return (
    <div className="container-fluid shadow-lg p-3 my-5 bg-body-tertiary rounded">
      {props.children}
    </div>
  );
}

export default Shadow;
