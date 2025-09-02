import { Bell, Search, UserCircle2 } from "lucide-react";

export default function Topbar() {
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
          <div className="flex items-center gap-2 pl-2">
            <UserCircle2 className="h-8 w-8" />
          </div>
        </div>
      </div>
    </header>
  );
}
