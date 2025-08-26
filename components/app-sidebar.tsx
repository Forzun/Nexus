import * as React from "react";
import { ChevronRight, File } from "lucide-react";

import { SearchForm } from "@/components/search-form";
import { VersionSwitcher } from "@/components/version-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { getNotebooks } from "@/server/notebook";
import SidebarData from "./sidebar-data";

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const notebook = await getNotebooks();

  const data = {
    versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
    navMain:
      notebook.data?.map((notebook) => ({
        title: notebook.name,
        url: `/dashboard/${notebook.id}`,
        items:
          notebook.notes?.map((note) => ({
            title: note.title,
            url: `/dashboard/notebook/note/${note.id}`,
          })) || [],
      })) ?? [],
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcher
          versions={data.versions}
          defaultVersion={data.versions[0]}
        />
        <SearchForm />
      </SidebarHeader>
      <SidebarContent className="gap-0">
       <SidebarData data={data} />
       </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
