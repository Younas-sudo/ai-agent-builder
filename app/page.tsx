import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <>
      <div>page</div>
      <Button>Click me</Button>
      <UserButton />
    </>
  );
};

export default page;
