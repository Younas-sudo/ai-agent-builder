"use client";
import { ChevronLeft, Code, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Agent } from "@/types/AgentType";
import { useRouter } from "next/navigation";

interface Props {
  agentDetail: Agent | undefined;
}

const Header = ({ agentDetail }: Props) => {
  const router = useRouter();
  return (
    <div className="w-full p-3 flex items-center justify-between">
      <div className="flex gap-2 items-center">
        <ChevronLeft className="h-8 w-8 cursor-pointer" onClick={() => router.back()}/>
        <h2 className="text-xl ">{agentDetail?.name}</h2>
      </div>
      <div className="flex gap-3 items-center">
        <Button variant={"ghost"}>
          <Code />
          Code
        </Button>
        <Button>
          <Play />
          Preview
        </Button>
        <Button>Publish</Button>
      </div>
    </div>
  );
};

export default Header;
