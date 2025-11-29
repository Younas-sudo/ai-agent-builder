"use client";
import { UserDetailContext } from "@/context/UserDetailContext";
import { WorkflowContext } from "@/context/WorkflowContext";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import React, { use, useEffect, useState } from "react";

const Provider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const { user } = useUser();
  const createUser = useMutation(api.user.CreateNewUser);
  const [userDetail, setUserDetail] = useState<any>(null);
  const [addedNodes, setAddedNodes] = useState<any>([
    {
      id: "start",
      position: { x: 0, y: 0 },
      data: { label: "Start" },
      type: "StartNode",
    },
  ]);
  const [nodeEdges, setNodeEdges] = useState<any>([]);

  useEffect(() => {
    user && CreateandGetUser();
  }, [user]);

  const CreateandGetUser = async () => {
    // Logic to create and get user

    if (user) {
      const result = await createUser({
        name: user.fullName ?? "",
        email: user.emailAddresses[0]?.emailAddress ?? "",
      });
      // Save to Context
      setUserDetail(result);
    }
  };

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <WorkflowContext.Provider value={{ addedNodes, setAddedNodes, nodeEdges, setNodeEdges }}>
        <div>{children}</div>
      </WorkflowContext.Provider>
    </UserDetailContext.Provider>
  );
};

export default Provider;
