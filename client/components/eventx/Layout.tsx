import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-muted/30 text-foreground">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 min-w-0">
          <Topbar />
          <main className="p-4 md:p-6 lg:p-8 max-w-[1400px] mx-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
