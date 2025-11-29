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
  Panel,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { use, useCallback, useContext, useEffect, useState } from "react";
import StartNode from "../_customNodes/StartNode";
import AgentNode from "../_customNodes/AgentNode";
import AgentToolsPanel from "../_components/AgentToolsPanel";
import { WorkflowContext } from "@/context/WorkflowContext";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Agent } from "@/types/AgentType";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";
import EndNode from "../_customNodes/EndNode";
import IfElseNode from "../_customNodes/IfElseNode";
import WhileNode from "../_customNodes/WhileNode";
import UserApprovalNode from "../_customNodes/UserApprovalNode";
import ApiNode from "../_customNodes/ApiNode";

type Props = {};

const AgentBuilder = (props: Props) => {
  const { addedNodes, setAddedNodes, nodeEdges, setNodeEdges } =
    useContext(WorkflowContext);
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [agentDetails, setAgentDetails] = useState<Agent>();
  const [loader, setLoader] = useState(false);
  const { agentId } = useParams();
  const convex = useConvex();

  const getAgentDetails = async () => {
    const result = await convex.query(api.agent.GetAgentById, {
      agentId: (agentId as string) ?? "",
    });
    setAgentDetails(result as Agent);
  };

  const updateAgentDetail = useMutation(api.agent.UpdateAgentDetails);

  const SaveNodesAndEdges = async () => {
    setLoader(true);
    const result = await updateAgentDetail({
      id: agentDetails?._id!,
      nodes: addedNodes,
      edges: nodeEdges,
    });
    setLoader(false);
    toast.success(" Workflow Saved Successfully");
    return result;
  };

  useEffect(() => {
    agentDetails?.nodes && setAddedNodes(agentDetails.nodes);
    agentDetails?.edges && setNodeEdges(agentDetails.edges);
  }, [agentDetails]);

  useEffect(() => {
    agentId && getAgentDetails();
  }, [agentId]);

  useEffect(() => {
    addedNodes && setNodes(addedNodes);
    nodeEdges && setEdges(nodeEdges);
  }, [addedNodes]);

  useEffect(() => {
    edges && setNodeEdges(edges);
  }, [edges]);

  const onNodesChange = useCallback(
    (changes: any) =>
      setNodes((nodesSnapshot) => {
        const updated = applyNodeChanges(changes, nodesSnapshot);
        setAddedNodes(updated);
        return updated;
      }),
    [setAddedNodes]
  );
  const onEdgesChange = useCallback(
    (changes: any) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    []
  );
  const onConnect = useCallback(
    (params: any) =>
      //@ts-ignore
      setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    []
  );

  const nodeTypes = {
    StartNode: StartNode,
    AgentNode: AgentNode,
    EndNode: EndNode,
    IfElseNode: IfElseNode,
    WhileNode: WhileNode,
    UserApprovalNode: UserApprovalNode,
    ApiNode: ApiNode,
  };

  return (
    <div>
      <Header agentDetail={agentDetails} />
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
          <Panel position="top-left">
            <AgentToolsPanel />
          </Panel>
          <Panel position="top-right">Settings</Panel>
          <Panel position="bottom-center">
            <Button onClick={() => SaveNodesAndEdges()}>
              {loader ? (
                <Spinner />
              ) : (
                <>
                  <Save /> Save Workflow{" "}
                </>
              )}
            </Button>
          </Panel>
        </ReactFlow>
      </div>
    </div>
  );
};

export default AgentBuilder;
