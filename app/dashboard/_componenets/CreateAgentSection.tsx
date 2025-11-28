"use client";
import { Button } from "@/components/ui/button";
import { Loader2Icon, Plus } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useContext, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { UserDetailContext } from "@/context/UserDetailContext";

const CreateAgentSection = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const CreateAgentMutation = useMutation(api.agent.CreateAgent);
  const [agentName, setAgentName] = useState<string>();
  const router = useRouter()
  const [loader , setLoader] = useState(false)
  const {userDetail} = useContext(UserDetailContext);

  const createAgent =async () => {
    setLoader(true)
    const agentId = uuidv4()  // unique uuid 
    const result = await CreateAgentMutation({
      name: agentName ?? 'Untitled Agent',
      agentId: agentId,
      userId: userDetail._id

    })
    setOpenDialog(false);

    setLoader(false)
    //navigate to agent builder screen
    router.push('/agent-builder'+agentId)
   };

  return (
    <div className="space-y-2 flex flex-col justify-center items-center mt-24">
      <h2 className="font-bold text-2xl">Create AI Agent </h2>

      <p className="text-lg">
        Build a AI Agent workflow with custom logic and tools
      </p>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <Button size={"lg"}>
            <Plus /> Create
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter Agent Name</DialogTitle>
            <DialogDescription>
              <Input placeholder="Agent Name" onChange={(e) => setAgentName(e.target.value)}  />
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => createAgent()} disabled={loader}> {loader&&<Loader2Icon className="animate-spin" />} Create Agent</Button>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateAgentSection;
