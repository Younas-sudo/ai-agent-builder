import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
  selectedNode: any;
  updateFormData: (formData: any) => void;
};
const IfElseSettings = ({selectedNode, updateFormData}: Props) => {
  const [formData, setFormData] = useState({ condition: "" });

  useEffect(() => {
    selectedNode.data.settings && setFormData(selectedNode?.data?.settings);
  }, [selectedNode]);

  const onSave = () => {
    updateFormData(formData);
    toast.success("Updated");
  };

  return (
    <div>
      <h2 className="font-bold">If / Else</h2>
      <p className="text-gray-500 mt-1">Create Conditions to branch your workflow</p>
      <div className="mt-2 space-y-2">
        <Label>If</Label>
        <Input
          placeholder="Enter Condition e.g output='any conditon'"
          onChange={(e) => setFormData({ condition: e.target.value })}
          value={formData.condition}
        />
      </div>

      <Button className="w-full mt-5" onClick={onSave}>
        Save
      </Button>
    </div>
  );
};

export default IfElseSettings;
