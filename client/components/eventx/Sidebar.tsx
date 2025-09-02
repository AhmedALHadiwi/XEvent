import { NavLink } from "react-router-dom";
import { CalendarPlus, LayoutDashboard, Ticket, Users, BarChart3, Bell, Settings, Megaphone, Tags, LogOut, HelpCircle } from "lucide-react";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/events", label: "Manage Events", icon: CalendarPlus },
  { to: "/tickets", label: "Booking & Tickets", icon: Ticket },
  { to: "/attendee-insights", label: "Attendee Insights", icon: Users },
  { to: "/analytics", label: "Analytics & Reports", icon: BarChart3 },
];

const supportItems = [
  { to: "/support", label: "Contact Support", icon: HelpCircle },
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/settings", label: "Settings", icon: Settings },
];

const extraItems = [
  { to: "/marketing", label: "Marketing", icon: Megaphone },
  { to: "/categories", label: "Event Categories", icon: Tags },
];

const accountItems = [
  { to: "/users", label: "Manage Users", icon: Users },
];

export default function Sidebar() {
  return (
    <aside className="hidden md:flex md:flex-col w-72 shrink-0 h-screen sticky top-0 bg-sidebar text-sidebar-foreground border-r border-sidebar-border p-4 gap-4">
      <div className="flex items-center gap-2 px-2">
        <div className="h-9 w-9 rounded-xl bg-brand text-white grid place-items-center font-bold">EX</div>
        <div className="leading-tight">
          <div className="font-extrabold text-lg">EventX</div>
          <div className="text-xs opacity-70">Studio</div>
        </div>
      </div>

      <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-brand text-white hover:brightness-95 transition">
        <CalendarPlus className="h-4 w-4" />
        <span>Add Quick Event</span>
      </button>

      <NavSection title="Main Navigation" items={navItems} />
      <NavSection title="Support & Management" items={supportItems} />
      <NavSection title="Additional Features" items={extraItems} />
      <NavSection title="Account Management" items={accountItems} />

      <div className="mt-auto">
        <NavRow to="/logout" label="Logout" icon={LogOut} />
      </div>
    </aside>
  );
}

function NavSection({ title, items }: { title: string; items: { to: string; label: string; icon: any }[] }) {
  return (
    <div className="space-y-2">
      <div className="text-xs uppercase tracking-wider text-muted-foreground/80 px-2">{title}</div>
      <div className="flex flex-col">
        {items.map((it) => (
          <NavRow key={it.to} {...it} />
        ))}
      </div>
    </div>
  );
}

function NavRow({ to, label, icon: Icon }: { to: string; label: string; icon: any }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-lg transition hover:bg-sidebar-accent ${isActive ? "bg-sidebar-accent text-sidebar-primary" : "text-sidebar-foreground"}`
      }
      end
    >
      <Icon className="h-4 w-4" />
      <span className="text-sm">{label}</span>
    </NavLink>
  );
}
