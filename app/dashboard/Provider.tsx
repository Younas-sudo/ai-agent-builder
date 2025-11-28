import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";
import { AppSidebar } from "./_componenets/AppSidebar";
import { AppHeader } from "./_componenets/AppHeader";

const DashboardProvider = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full">
        <AppHeader />

        {children}
      </div>
    </SidebarProvider>
  );
};

export default DashboardProvider;
