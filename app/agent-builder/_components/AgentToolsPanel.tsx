import { WorkflowContext } from "@/context/WorkflowContext";
import {
  Merge,
  MousePointer,
  Repeat,
  Square,
  ThumbsUp,
  Webhook,
} from "lucide-react";
import React, { useContext } from "react";


const AgentTools = [
  {
    name: "Agent",
    icon: MousePointer,
    bgColor: "#CDF7E3",
    id: "Agent",
    type: "AgentNode",
  },
  {
    name: "End",
    icon: Square,
    bgColor: "#FFE3E3",
    id: "end",
    type: "EndNode",
  },
  {
    name: "If/Else",
    icon: Merge,
    bgColor: "#FFF3CD",
    id: "IfElseNode",
    type: "IfElseNode",
  },
  {
    name: "While",
    icon: Repeat,
    bgColor: "#E3F2FD", 
    id: "while",
    type: "WhileNode",
  },
  {
    name: "User Approval",
    icon: ThumbsUp,
    bgColor: "#EADCF8",
    id: "approval",
    type: "UserApprovalNode",
  },
  {
    name: "API",
    icon: Webhook,
    bgColor: "#D1f0FF",
    id: "api",
    type: "ApiNode",
  },
];

const AgentToolsPanel = () => {
    const {addedNodes, setAddedNodes} = useContext(WorkflowContext)
    const onAgentToolClick = (tool:any) => {
        const newNode = {
            id: `${tool.id}-${Date.now()}`,
            position: {x:0, y:100},
            data: {label:tool.name, bgColor:tool.bgColor, id: tool.id, type: tool.type},
            type: tool.type,

        }
        setAddedNodes([...addedNodes, newNode])

    }

  return <div className="bg-white p-5 shadow rounded-2xl">
    <h2 className="font-semibold mb-4 text-gray-700">AI Agent Tools</h2>
    <div>
        {AgentTools.map((tool, index) => (
            <div key={index} className="flex items-center cursor-pointer gap-3 p-2 hover:bg-gray-100 rounded-xl" onClick={() => onAgentToolClick(tool)}>
                <tool.icon className="p-2 rounded-lg h-8 w-8" style={{
                    background:tool.bgColor
                }}/>
                <h2 className="text-sm font-medium text-gray-700">{tool.name}</h2>
            </div>
        ))}
    </div>
  </div>;
};

export default AgentToolsPanel;
