"use client";
import Header from "../_components/Header";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Background,
  MiniMap,
  Controls,
  BackgroundVariant,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useState } from "react";
import StartNode from "../_customNodes/StartNode";
import AgentNode from "../_customNodes/AgentNode";

type Props = {};

const initialNodes = [
  { id: "n1", position: { x: 0, y: 0 }, data: { label: "Node 1" }, type: "StartNode" },
  { id: "n2", position: { x: 0, y: 100 }, data: { label: "Node 2" }, type: "AgentNode" },
];
const initialEdges = [{ id: "n1-n2", source: "n1", target: "n2" }];

const AgentBuilder = (props: Props) => {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const onNodesChange = useCallback(
    (changes : any) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    []
  );
  const onEdgesChange = useCallback(
    (changes : any) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    []
  );
  const onConnect = useCallback(
    (params : any) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    []
  );

  const nodeTypes = {
    StartNode: StartNode,
    AgentNode: AgentNode
  }

  return (
    <div>
      <Header />
      <div style={{ width: "100vw", height: "90vh" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          onConnect={onConnect}
          fitView
        >
            <MiniMap />
            <Controls />
             {/* @ts-ignore */}
            <Background variant={BackgroundVariant.Dots} gap={12} size={1} />


        </ReactFlow>
      </div>
    </div>
  );
};

export default AgentBuilder;
