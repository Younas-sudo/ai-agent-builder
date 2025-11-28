import { Handle, Position } from "@xyflow/react";
import { MousePointer, Pointer } from "lucide-react";


const AgentNode = () => {
  return (
    <div className="bg-white rounded-2xl p-2 px-3 border">
      <div className="flex gap-2 items-center">
        <MousePointer  className="p-2 rounded-lg h-8 w-8 bg-green-100" />
        <h2>Agent</h2>
        <Handle type="source" position={Position.Right} />
        <Handle type="target" position={Position.Left} />

      </div>
    </div>
  );
};

export default AgentNode;
