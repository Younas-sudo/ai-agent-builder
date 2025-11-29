import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { SelectValue } from "@radix-ui/react-select";
import { FileJson } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
  selectedNode: any;
  updateFormData: (formData: any) => void;
};

const AgentSetting = ({ selectedNode, updateFormData }: Props) => {
  const [formData, setFormData] = useState<any>({
    name: "",
    instruction: "",
    includeHistory: true,
    model: "gemini",
    output: "text",
    schema: "",
  });
  useEffect(() => {
    selectedNode.data.settings && setFormData(selectedNode?.data?.settings);
  }, [selectedNode]);

  const handlechange = (key: any, value: any) => {
    setFormData((prev: any) => ({ ...prev, [key]: value }));
  };

  const onSave = () => {
    updateFormData(formData);
    toast.success("Agent Setting Updated");
  };
  return (
    <div>
      <h2 className="font-bold">Agent</h2>
      <p className="text-gray-500 mt-1">
        Call the AI model with your instruction
      </p>

      <div className="mt-3 space-y-1">
        <Label>Name</Label>
        <Input
          placeholder="Agent Name"
          value={formData.name}
          onChange={(e) => handlechange("name", e.target.value)}
        />
      </div>
      <div className="mt-3 space-y-1">
        <Label>Instruction</Label>
        <Textarea
          placeholder="Instructions"
          value={formData.instructions}
          onChange={(e) => handlechange("instructions", e.target.value)}
        />
        <h2 className="text-sm p-1 flex gap-2 items-center">
          Add Context <FileJson className="h-3 w-3" />
        </h2>
      </div>
      <div className="mt-3 space-y-1 flex items-center justify-between">
        <Label>Include Chat History</Label>
        <Switch
          checked={formData.includeHistory}
          onCheckedChange={(checked) => handlechange("includeHistory", checked)}
        />
      </div>
      <div className="mt-3 flex justify-between item-center">
        <Label>Model</Label>
        <Select
          value={formData.model}
          onValueChange={(value) => handlechange("model", value)}
        >
          <SelectTrigger>
            <SelectValue placeholder={"Gemini"}></SelectValue>
            <SelectContent>
              <SelectItem value="gemini">Gemini</SelectItem>
              <SelectItem value="chatgpt">Chatgpt</SelectItem>
              <SelectItem value="claude">Claude</SelectItem>
            </SelectContent>
          </SelectTrigger>
        </Select>
      </div>
      <div className="mt-3 space-y-2 ">
        <Label>Output Format</Label>
        <Tabs
          defaultValue="text"
          className="w-[400px]"
          onValueChange={(value) => handlechange("output", value)}
          value={formData.output}
        >
          <TabsList>
            <TabsTrigger value="text">Text</TabsTrigger>
            <TabsTrigger value="json">Json</TabsTrigger>
          </TabsList>
          <TabsContent value="text">
            <h2 className="text-sm text-gray-700">Output will be Text</h2>
          </TabsContent>
          <TabsContent value="json">
            <h2 className="text-sm text-gray-700">Enter Json Schema</h2>

            <Textarea
              value={formData.schema}
              placeholder="{title:string}"
              className="max-w-[300px] mt-1"
              onChange={(e) => handlechange("schema", e.target.value)}
            />
          </TabsContent>
        </Tabs>
      </div>
      <Button className="mt-5 w-full" onClick={onSave}>
        Save
      </Button>
    </div>
  );
};

export default AgentSetting;
