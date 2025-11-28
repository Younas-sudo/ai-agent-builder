"use client";
import {
  Calendar,
  Database,
  Gem,
  HeadphonesIcon,
  Home,
  Inbox,
  LayoutDashboard,
  Search,
  Settings,
  User,
  WalletCards,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { useContext } from "react";
import { UserDetailContext } from "@/context/UserDetailContext";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import Link from "next/link";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Ai Agents",
    url: "#",
    icon: HeadphonesIcon,
  },
  {
    title: "Data",
    url: "#",
    icon: Database,
  },
  {
    title: "Pricing",
    url: "#",
    icon: WalletCards,
  },
  {
    title: "Profile",
    url: "#",
    icon: User,
  },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const path = usePathname();
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex gap-2 items-center">
          <Image src={"/logo.svg"} alt="logo" width={35} height={35} />
          {open && <h2 className="font-bold text-lg">AI Agent</h2>}
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    size={open ? "lg" : "default"}
                    isActive={path === item.url}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      {open && <span>{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="mb-10 ">
          <div className="flex gap-2 items-center">
            <Gem />
            {open && <h2>Remaining Credit : {userDetail?.token}</h2>}
          </div>
          {open && <Button>Upgrade to Unlimited</Button>}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
