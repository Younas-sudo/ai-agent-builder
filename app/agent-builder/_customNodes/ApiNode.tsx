import { Input } from "@/components/ui/input";
import { Handle, Position } from "@xyflow/react";
import { Webhook } from "lucide-react";

const ApiNode = ({ data }: any) => {
  return (
    <div className="bg-white rounded-2xl p-2 px-3 border">
      <div className="flex gap-2 items-center">
        <Webhook
          className="p-2 rounded-lg h-8 w-8 "
          style={{
            backgroundColor: data?.bgColor,
          }}
        />
        <div className="flex flex-col">
          <h2>API</h2>
          <p className="text-xs text-gray-500"> API</p>
        </div>
        <Handle type="source" position={Position.Right} />
        <Handle type="target" position={Position.Left} />
      </div>
    </div>
  );
};

export default ApiNode;
