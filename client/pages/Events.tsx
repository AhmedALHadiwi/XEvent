import { NavLink } from "react-router-dom";
import { CalendarPlus, LayoutDashboard, Ticket, Users, BarChart3, Bell, Settings, Megaphone, Tags, LogOut, HelpCircle } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/events", label: "Manage Events", icon: CalendarPlus, adminOnly: true },
  { to: "/tickets", label: "Booking & Tickets", icon: Ticket, adminOnly: false },
  { to: "/attendee-insights", label: "Attendee Insights", icon: Users, adminOnly: true },
  { to: "/analytics", label: "Analytics & Reports", icon: BarChart3, adminOnly: true },
];

const supportItems = [
  { to: "/support", label: "Contact Support", icon: HelpCircle, adminOnly: false },
  { to: "/notifications", label: "Notifications", icon: Bell, adminOnly: false },
  { to: "/settings", label: "Settings", icon: Settings, adminOnly: false },
];

const extraItems = [
  { to: "/marketing", label: "Marketing", icon: Megaphone, adminOnly: true },
  { to: "/categories", label: "Event Categories", icon: Tags, adminOnly: true },
];

const accountItems = [
  { to: "/users", label: "Manage Users", icon: Users, adminOnly: true },
];

export default function Sidebar() {
  const { user, isAdmin, logout } = useAuth();

  if (!user) return null;

  return (
    <aside className="hidden md:flex md:flex-col w-72 shrink-0 h-screen sticky top-0 bg-sidebar text-sidebar-foreground border-r border-sidebar-border p-4 gap-4">
      <div className="flex items-center gap-2 px-2">
        <div className="h-9 w-9 rounded-xl bg-brand text-white grid place-items-center font-bold">EX</div>
        <div className="leading-tight">
          <div className="font-extrabold text-lg">EventX</div>
          <div className="text-xs opacity-70">Studio</div>
        </div>
      </div>

      {showCreateForm && (
        <div className="bg-card rounded-xl p-6 border shadow-sm mb-4">
          <h3 className="font-semibold text-lg mb-4">{editingEvent ? "Edit Event" : "Create New Event"}</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Event Title</label>
              <input 
                className="w-full rounded-lg border px-3 py-2 mt-1"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Date</label>
              <input 
                type="date"
                className="w-full rounded-lg border px-3 py-2 mt-1"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Venue</label>
              <input 
                className="w-full rounded-lg border px-3 py-2 mt-1"
                value={formData.venue}
                onChange={(e) => setFormData({...formData, venue: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Price (LKR)</label>
              <input 
                type="number"
                className="w-full rounded-lg border px-3 py-2 mt-1"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="text-sm font-medium">Total Seats</label>
              <input 
                type="number"
                className="w-full rounded-lg border px-3 py-2 mt-1"
                value={formData.totalSeats}
                onChange={(e) => setFormData({...formData, totalSeats: e.target.value})}
                required
              />
            </div>
            <div className="flex items-end gap-2">
              <button type="submit" className="rounded-lg bg-brand text-white px-4 py-2 font-medium">
                {editingEvent ? "Update Event" : "Create Event"}
              </button>
              <button 
                type="button" 
                onClick={() => {
                  setShowCreateForm(false);
                  setEditingEvent(null);
                }}
                className="rounded-lg border px-4 py-2 font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {isAdmin && (
        <button className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-brand text-white hover:brightness-95 transition">
          <CalendarPlus className="h-4 w-4" />
          <span>Add Quick Event</span>
        </button>
      )}

      <NavSection title="Main Navigation" items={navItems} isAdmin={isAdmin} />
      <NavSection title="Support & Management" items={supportItems} isAdmin={isAdmin} />
      {isAdmin && <NavSection title="Additional Features" items={extraItems} isAdmin={isAdmin} />}
      {isAdmin && <NavSection title="Account Management" items={accountItems} isAdmin={isAdmin} />}

      <div className="mt-auto">
        <button 
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2 rounded-lg transition hover:bg-sidebar-accent text-sidebar-foreground w-full text-left"
        >
          <LogOut className="h-4 w-4" />
          <span className="text-sm">Logout</span>
        </button>
        <div className="mt-2 px-3 py-2 text-xs text-muted-foreground">
          Logged in as: {user.name} ({user.role})
        </div>
      </div>
    </aside>
  );
}

function NavSection({ title, items, isAdmin }: { title: string; items: { to: string; label: string; icon: any; adminOnly: boolean }[]; isAdmin: boolean }) {
  const filteredItems = items.filter(item => !item.adminOnly || isAdmin);
  
  if (filteredItems.length === 0) return null;

  return (
        });
      } else {
        await api("/api/events", {
          method: "POST",
          body: { ...formData, price: Number(formData.price), totalSeats: Number(formData.totalSeats) }
        });
      }
      setFormData({ title: "", date: "", venue: "", price: "", totalSeats: "" });
      setShowCreateForm(false);
      setEditingEvent(null);
      loadEvents();
    } catch (error) {
      console.error("Failed to save event:", error);
    }
  };

  const handleEdit = (event: any) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      date: new Date(event.date).toISOString().split('T')[0],
      venue: event.venue,
      price: String(event.price),
      totalSeats: String(event.totalSeats)
    });
    setShowCreateForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    try {
      await api(`/api/events/${id}`, { method: "DELETE" });
      loadEvents();
    } catch (error) {
      console.error("Failed to delete event:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="bg-card rounded-xl p-8 border shadow-sm text-center max-w-md">
          <h2 className="text-xl font-semibold mb-2 text-destructive">Admin Access Required</h2>
          <p className="text-muted-foreground mb-4">You need administrator privileges to manage events.</p>
          <Link to="/" className="px-4 py-2 bg-brand text-white rounded-lg hover:brightness-95 transition">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

    <div className="space-y-2">
      <div className="text-xs uppercase tracking-wider text-muted-foreground/80 px-2">{title}</div>
      <div className="flex flex-col">
        {events.map((e) => (
          <Card key={e.id || e._id} e={e} onEdit={handleEdit} onDelete={handleDelete} />
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
          <button 
            onClick={() => {
              setEditingEvent(null);
              setFormData({ title: "", date: "", venue: "", price: "", totalSeats: "" });
              setShowCreateForm(true);
            }}
            className="inline-flex items-center gap-2 rounded-lg bg-brand text-white px-3 py-2 text-sm font-medium"
          >
            Create Event
          </button>
      }
      end
    >
      <Icon className="h-4 w-4" />
      <span className="text-sm">{label}</span>
    </NavLink>
  );
}
