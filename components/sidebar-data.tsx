"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ChevronRight, File } from "lucide-react";
import { parseAsInteger, useQueryState } from "nuqs";

interface sidebarDataProps {
  data: {
    navMain: {
      title: string;
      url?: string;
      items: {
        title: string;
        url: string;
      }[];
    }[];
  };
}

export default function SidebarData({ data }: sidebarDataProps) {
  const [search]= useQueryState(
    "search",
    {defaultValue:""}
  );

  const filterData = data.navMain.filter((item) => { 
    const notebookMatch = item.title.toLowerCase().includes(search.toLowerCase());
    const notebook = item.items.some((note) => note.title.toLowerCase().includes(search.toLowerCase()));
    return notebookMatch || notebook;
  })

  return (
    <>
        {filterData.map((item) => (
          <Collapsible
            key={item.title}
            title={item.title}
            defaultOpen
            className="group/collapsible"
          >
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
              >
                <CollapsibleTrigger>
                  {item.title}{" "}
                  {item.items.length > 0 && (
                    <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                  )}
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {item.items.map((noteItem) => (
                      <SidebarMenuItem key={noteItem.title}>
                        <SidebarMenuButton asChild>
                          <a href={noteItem.url}>
                            <File />
                            {noteItem.title}
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
    </>
  );
}
