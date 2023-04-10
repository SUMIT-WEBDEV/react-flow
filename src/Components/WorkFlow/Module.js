import React from "react";
import "./Module.css";

function Module({ module }) {
  return (
    <div className="module">
      <p>{module.input_type}</p>
      <h5 className="module__Name">{module.name}</h5>
      <p className="module__Output">{module.output_type}</p>
    </div>
  );
}

export default Module;
