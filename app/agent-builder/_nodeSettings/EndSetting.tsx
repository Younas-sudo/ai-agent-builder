import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
  selectedNode: any;
  updateFormData: (formData: any) => void;
};

const EndSetting = ({ selectedNode, updateFormData }: Props) => {
  const [formData, setFormData] = useState({ schema: "" });

  useEffect(() => {
    selectedNode && setFormData(selectedNode?.data?.settings);
  }, [selectedNode]);

  const onSave = () => {
    updateFormData(formData);
    toast.success("Updated");
  };

  return (
    <div>
      <h2 className="font-bold">Agent</h2>
      <p className="text-gray-500 mt-1">Choose the workflow output</p>
      <div className="mt-2 space-y-2">
        <Label>Output</Label>
        <Textarea
          placeholder="{name:string}"
          onChange={(e) => setFormData({ schema: e.target.value })}
          value={formData.schema}
        />
      </div>

      <Button className="w-full mt-5" onClick={onSave}>
        Save
      </Button>
    </div>
  );
};

export default EndSetting;
