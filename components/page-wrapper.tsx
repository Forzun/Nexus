import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "./ui/sidebar";
import LogOut from "./LogOut";
import { ModeToggle } from "./modeToggle";
import { Fragment } from "react";

interface pageWrapperProps {
  children: React.ReactNode;
  breadcrumbs: {
    label: string;
    href: string;
  }[];
}

export default function PageWrapper({
  children,
  breadcrumbs,
}: pageWrapperProps) {
  return (
    <div className="flex flex-col gap-4">
      <header className="flex items-center justify-between gap-3 p-4 border-b">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((breadcrumb, index) => (
                <Fragment key={breadcrumb.label}>
                  <BreadcrumbItem>
                    <BreadcrumbLink href={breadcrumb.href}>
                      {breadcrumb.label}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {index !== breadcrumbs.length - 1 ? <BreadcrumbSeparator/> : null}
                </Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <LogOut />
        </div>
      </header>
      <div className="flex flex-col gap-4 px-4 sm:px-6 lg:px-8">{children}</div>
    </div>
  );
}
