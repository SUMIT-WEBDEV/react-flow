import React, { useState, useRef, useCallback, useEffect } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
} from "reactflow";
import "reactflow/dist/style.css";
import WorkFlowLeftDesign from "./WorkFlowLeftDesign";

import "./dnd.css";
import { useParams } from "react-router-dom";

const moduleInitial = `
<div style="display: flex; justify-content: space-between;  width: 400px; align-items: center; height: 60px; border-radius: 10px; outline: "none" ,
">
<div style="width:50px; padding-left: 20px;
height: 60px;font-weight: bold; font-size: 30px;  color: black; display: flex;  justify-content: start; align-items: center;
">
➯

</div>

<h5 style="width:300px; border-right: 1px solid #cfd9e6; font-size: 20px ; height: 60px; border-left: 1px solid #cfd9e6; margin: 0; padding-left: 7px; justify-content:center; text-align: center; display: flex; flex-direction: column; background-color: #f0f4f8;
">Input</h5> 

<p style="width:50px;  height: 60px; padding-right: 20px;
font-weight: bold; font-size: 25px;  color: black; display: flex; justify-content: end; align-items: center
 ">B</p>
 <p><MdInput/></p>

</div>
`;

const initialNodes = [
  {
    id: "1",
    type: "input",
    data: {
      label: <div dangerouslySetInnerHTML={{ __html: moduleInitial }} />,
    },
    style: {
      borderColor: "#f0f4f8",
      color: "grey",
      display: "flex",
      fontSize: "10px",
      padding: "0px",
      height: "60px",
      width: "400px",
      borderRadius: "10px",
      alignItems: "center",
      justifyContent: "center",
      stroke: "green",
    },
    position: { x: 460, y: 70 },
  },
  {
    id: "2",
    type: "input",
    data: { label: "input" },
    position: { x: 0, y: 0 },
    style: { display: "none" },
  },
];

const edgeInitial = [
  {
    id: "edge-1",
    source: "node-1",
    target: "node-2",
    type: "smoothstep",
    animated: true,
    arrowHeadColor: "blue",
    style: { stroke: "brown", strokeWidth: 2 },
  },
];

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
  const { id } = useParams();

  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(edgeInitial);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  // ---------------------------------
  const [workflow, setWorkflow] = useState(null);

  useEffect(() => {
    fetch(`https://64307b10d4518cfb0e50e555.mockapi.io/workflow/${id}`)
      .then((response) => response.json())
      .then((data) => setWorkflow(data.name));
  }, []);

  // ---------------------------------

  const onConnect = useCallback(
    (params) => {
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            animated: true,
            style: { stroke: "blue" },
            arrowHeadType: "arrowopen",
          },
          eds
        )
      );

      if (params.target === "1") {
        setIsConnected(true);
      }

      const targetNode = nodes.find((node) => node.id === params.target);
      if (targetNode) {
        return (
          (targetNode.style = {
            borderColor: "green",
            color: "grey",
            display: "flex",
            fontSize: "10px",
            padding: "0px",
            height: "60px",
            width: "400px",
            borderRadius: "10px",
            alignItems: "center",
            justifyContent: "center",
            stroke: "green",
          }),
          setNodes([...nodes])
        );
      }
    },
    [nodes, setEdges]
  );

  const onDisconnect = useCallback(
    (params) => {
      const filteredEdges = edges.filter((edge) => edge.id !== params.edgeId);
      setEdges(filteredEdges);

      if (params.target === "1") {
        setIsConnected(false);
      }
    },
    [edges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = (event) => {
    const moduleText = event.dataTransfer.getData("text/html");

    const reactFlowWrapperRect =
      reactFlowWrapper.current.getBoundingClientRect();
    const x = event.clientX - reactFlowWrapperRect.left;
    const y = event.clientY - reactFlowWrapperRect.top;

    const position = { x, y };
    const newNode = {
      id: getId(),
      position,
      type: "default",
      data: {
        label: <div dangerouslySetInnerHTML={{ __html: moduleText }} />,
      },
      style: {
        borderColor: "red",
        color: "grey",
        display: "flex",
        fontSize: "10px",
        padding: "0px",
        height: "60px",
        width: "400px",
        borderRadius: "10px",
        alignItems: "center",
        justifyContent: "center",
        stroke: "green",
      },
    };
    setNodes([...nodes, newNode]);
  };

  return (
    <>
      <h2 className="workFlow__Name">Workflow Name: {workflow}</h2>
      <div className="dndflow">
        <ReactFlowProvider>
          <div className="sidebar__Left">
            <WorkFlowLeftDesign />
          </div>
          <div className="reactflow-wrapper" ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onDisconnect={onDisconnect}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              deleteKeyCode={"Delete"}
              fitView
            >
              <Controls />
            </ReactFlow>
          </div>
        </ReactFlowProvider>
      </div>
    </>
  );
};

export default DnDFlow;
