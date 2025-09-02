import Layout from "@/components/eventx/Layout";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/lib/api";
import { useEffect, useState } from "react";

export default function Tickets() {
  const { user } = useAuth();
  const [events, setEvents] = useState<any[]>([]);
  const [tickets, setTickets] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api<{ events: any[] }>("/api/events").then((d) => setEvents(d.events));
    if (user) api<{ tickets: any[] }>("/api/tickets/my").then((d) => setTickets(d.tickets));
  }, [user]);

  const book = async (eventId: string) => {
    if (!user) return (window.location.href = "/login");
    try {
      const seatNumber = `A-${Math.floor(Math.random() * 200) + 1}`;
      await api("/api/tickets/book", { method: "POST", body: { eventId, seatNumber } });
      const d = await api<{ tickets: any[] }>("/api/tickets/my");
      setTickets(d.tickets);
    } catch (e: any) {
      setError(e.message || "Booking failed");
    }
  };

  return (
    <Layout>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2">
          <div className="font-semibold text-lg mb-3">Browse Events</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {events.map((e) => (
              <div key={e.id || e._id} className="bg-card rounded-xl border shadow-sm p-4">
                <div className="text-lg font-semibold">{e.title}</div>
                <div className="text-sm text-muted-foreground">{new Date(e.date).toDateString()}</div>
                <div className="text-sm text-muted-foreground">{e.venue}</div>
                <div className="text-sm mt-1">Price: {e.price?.toLocaleString?.() || e.price} LKR</div>
                <button onClick={() => book(e.id || e._id)} className="mt-3 rounded-lg bg-brand text-white px-3 py-2 text-sm font-medium">Book Ticket</button>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="font-semibold text-lg mb-3">My Tickets</div>
          <div className="space-y-3">
            {!user && <div className="text-sm text-muted-foreground">Please <a href="/login" className="underline">login</a> to view your tickets.</div>}
            {tickets.map((t) => (
              <div key={t.id || t._id} className="bg-card rounded-xl border shadow-sm p-3">
                <div className="font-medium">{t.event?.title || t.event}</div>
                <div className="text-sm text-muted-foreground">Seat: {t.seatNumber} • Status: {t.status}</div>
              </div>
            ))}
            {error && <div className="text-rose-600 text-sm">{error}</div>}
          </div>
        </div>
      </div>
    </Layout>
  );
}
