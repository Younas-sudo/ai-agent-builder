import { WorkflowContext } from "@/context/WorkflowContext";
import React, { useContext } from "react";
import AgentSetting from "../_nodeSettings/AgentSetting";
import EndSetting from "../_nodeSettings/EndSetting";
import IfElseSettings from "../_nodeSettings/IfElseSettings";

type Props = {};

const SettingPanel = (props: Props) => {
  const { selectedNode, setAddedNodes } = useContext(WorkflowContext);
  const onUpdateNodeData = (formData: any) => {
    const updatedNode = {
      ...selectedNode,
      data: {
        ...selectedNode.data,
        label: formData.name || selectedNode.data.label,
        settings: formData,
      },
    };

    setAddedNodes((prevNode: any) =>
      prevNode.map((node: any) =>
        node.id === selectedNode.id ? updatedNode : node
      )
    );
  };

  return (
    <div className="p-5 bg-white rounded-2xl w-[350px] shadow">
      {selectedNode?.type == "AgentNode" && (
        <AgentSetting
          selectedNode={selectedNode}
          updateFormData={onUpdateNodeData}
        />
      )}
      {selectedNode?.type == "EndNode" && (
        <EndSetting
          selectedNode={selectedNode}
          updateFormData={onUpdateNodeData}
        />
      )}
      {selectedNode?.type == "IfElseNode" && (
        <IfElseSettings
          selectedNode={selectedNode}
          updateFormData={onUpdateNodeData}
        />
      )}
    </div>
  );
};

export default SettingPanel;
