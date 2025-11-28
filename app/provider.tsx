"use client";
import { UserDetailContext } from "@/context/UserDetailContext";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import React, { use, useEffect, useState } from "react";

const Provider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const { user } = useUser();
  const createUser = useMutation(api.user.CreateNewUser);
  const [userDetail, setUserDetail] = useState<any>(null);

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
      <div>{children}</div>
    </UserDetailContext.Provider>
  );
};

export default Provider;
