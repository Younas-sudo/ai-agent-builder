import React from "react";
import DashboardProvider from "./Provider";

const DashboardLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <DashboardProvider>
      <div>{children}</div>
    </DashboardProvider>
  );
};

export default DashboardLayout;
