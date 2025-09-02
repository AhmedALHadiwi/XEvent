import { Bell, Search, UserCircle2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export default function Topbar() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 h-16 flex items-center gap-3">
        <h1 className="font-semibold text-lg md:text-xl">Dashboard</h1>
        <div className="ml-auto flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 rounded-full border px-3 py-1.5 bg-white">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input className="w-56 outline-none text-sm placeholder:text-muted-foreground" placeholder="Search..." />
          </div>
          <button className="relative h-9 w-9 grid place-items-center rounded-full border hover:bg-muted">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-brand text-white text-[10px] grid place-items-center">3</span>
          </button>
          <div className="flex items-center gap-2 pl-2 relative group">
            <UserCircle2 className="h-8 w-8" />
            <div className="absolute top-full right-0 mt-2 w-48 bg-card border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="p-3 border-b">
                <div className="font-medium text-sm">{user?.name}</div>
                <div className="text-xs text-muted-foreground">{user?.email}</div>
                <div className="text-xs text-brand font-medium">{user?.role}</div>
              </div>
              <div className="p-1">
                <button 
                  onClick={logout}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-muted rounded"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
