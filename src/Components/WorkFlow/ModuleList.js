import React from "react";
import Module from "./Module";
import Pagination from "../Pagination/Pagination";
import "./ModuleList.css";
import Loader from "./Loader/Loader";


export default ({ modules, onPageChange, currentPage }) => {
  const onDragStart = (event, module) => {
    const moduleText = `
        <div style="display: flex; justify-content: space-between;  width: 400px; align-items: center; height: 60px; border-radius: 10px; outline: "none",
        ">

        
        <p style="width:50px; 
     height: 60px;font-weight: bold; font-size: 25px;  color: black; display: flex; flex-direction: column; justify-content: center; align-items: center;
        ">${module.input_type}</p>
        
        <h5 style="width:300px; border-right: 1px solid #cfd9e6; font-size: 20px ; height: 58px; border-left: 1px solid #cfd9e6; margin: 0; padding-left: 7px; justify-content:center; text-align: start; display: flex; flex-direction: column; background-color: #f0f4f8;
        ">${module.name}</h5> 

        <p style="width:50px;  height: 60px; 
        font-weight: bold; font-size: 25px;  color: black; display: flex; flex-direction: column; justify-content: center; align-items: center
         ">${module.output_type}</p>

      </div>
    `;
    event.dataTransfer.setData("text/html", moduleText);
    event.dataTransfer.effectAllowed = "move";
  };

  console.log(modules);

  return (
    <div className="moduleList">
      <aside>
        <h2 className="modulist__Text">Modules</h2>
        {modules.length === 0 ? (
          <Loader />
        ) : (
          modules.map((module) => (
            <div
              key={module.id}
              className="dndnode output"
              onDragStart={(event) => onDragStart(event, module)}
              draggable
            >
              <Module module={module} />
            </div>
          ))
        )}
      </aside>

      <div className="moduleList__Pagination">
        <Pagination onPageChange={onPageChange} currentPage={currentPage} />
      </div>
    </div>
  );
};
