import Layout from "@/components/eventx/Layout";
import { useParams, Navigate, Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { CalendarDays, Clock, MapPin, Tag, QrCode } from "lucide-react";

function SeatMatrix() {
  const rows = 8, cols = 14;
  const grid = Array.from({ length: rows * cols }, (_, i) => {
    const r = Math.floor(i / cols), c = i % cols;
    const isEdge = r === 0 || r === rows - 1 || c === 0 || c === cols - 1;
    const reserved = (r + c) % 4 === 0;
    const sold = (r * c) % 7 === 0;
    return { id: i, visible: !isEdge, reserved, sold };
  });
  return (
    <div className="rounded-xl border bg-card p-4 shadow-sm">
      <div className="font-semibold text-center mb-3">Seat Allocation</div>
      <div className="grid grid-cols-14 gap-1.5 justify-center">
        {grid.map((s) => (
          <div key={s.id} className={`${s.visible ? "h-5 w-5 rounded" : "opacity-0"} ${s.sold ? "bg-brand" : s.reserved ? "bg-brand/30" : "bg-muted"}`} />
        ))}
      </div>
      <div className="flex items-center gap-4 justify-center mt-4 text-xs">
        <div className="flex items-center gap-2"><span className="h-3 w-3 rounded bg-brand"></span> Paid Seats</div>
        <div className="flex items-center gap-2"><span className="h-3 w-3 rounded bg-brand/30"></span> Reserved Seats</div>
        <div className="flex items-center gap-2"><span className="h-3 w-3 rounded bg-muted"></span> Available</div>
      </div>
    </div>
  );
}

export default function EventDetails() {
  const { user, isAdmin, loading } = useAuth();
  const { id } = useParams();
  const [event, setEvent] = useState<any>(null);
  const [qrCode, setQrCode] = useState<string>("");

  useEffect(() => {
    if (user && isAdmin && id) {
      // In a real app, you'd fetch the specific event
      // For now, we'll use the ID to generate a title
      const mockEvent = {
        id,
        title: (id || "").split("-").map((x) => x.charAt(0).toUpperCase() + x.slice(1)).join(" "),
        date: "2025-04-12",
        venue: "Viharamahadevi Open Air Theater, Colombo",
        price: 2500,
        totalSeats: 1200,
        description: "Get ready for Sri Lanka's biggest music festival — an electrifying open-air concert featuring top international and local artists."
      };
      setEvent(mockEvent);
      
      // Generate QR code data (in real app, this would be a proper QR code)
      setQrCode(`EVENT:${id}:${Date.now()}`);
    }
  }, [user, isAdmin, id]);

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
          <p className="text-muted-foreground mb-4">You need administrator privileges to manage event details.</p>
          <Link to="/" className="px-4 py-2 bg-brand text-white rounded-lg hover:brightness-95 transition">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const title = (id || "").split("-").map((x) => x.charAt(0).toUpperCase() + x.slice(1)).join(" ");
  
  return (
    <Layout>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 space-y-4">
          <div className="rounded-xl border bg-card p-4 shadow-sm">
            <div className="font-semibold text-xl mb-4">Event Details</div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">Event Name</label>
                <input className="w-full rounded-lg border px-3 py-2" defaultValue={title || "Colombo Music Festival 2025"} />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-muted-foreground">Event Date</label>
                <div className="flex items-center gap-2 rounded-lg border px-3 py-2"><CalendarDays className="h-4 w-4" /> April 12, 2025</div>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs text-muted-foreground">Event Venue</label>
                <div className="flex items-center gap-2 rounded-lg border px-3 py-2"><MapPin className="h-4 w-4" /> Viharamahadevi Open Air Theater, Colombo</div>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs text-muted-foreground">Event Time</label>
                <div className="flex items-center gap-2 rounded-lg border px-3 py-2"><Clock className="h-4 w-4" /> 6.00PM - 10.30PM</div>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs text-muted-foreground">Event Description</label>
                <textarea className="w-full rounded-lg border px-3 py-2 min-h-28" defaultValue={event?.description || "Get ready for Sri Lanka's biggest music festival — an electrifying open-air concert featuring top international and local artists. Join 10,000+ music lovers for a night filled with live performances, immersive stage effects, and a festive atmosphere like no other!"} />
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-4 mt-4">
              <Metric label="Ticket Price" value={`${event?.price || 2500} LKR`} />
              <Metric label="Seat Amount" value={String(event?.totalSeats || 1200)} />
              <Metric label="Available Seats" value="523" />
              <Metric label="Popularity" value="High" />
            </div>
          </div>

          <SeatMatrix />
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border bg-card p-4 shadow-sm">
            <div className="font-semibold mb-3">Tags</div>
            <div className="flex flex-wrap gap-2">
              {["#Music", "#Festival", "#EDM"].map((t) => (
                <span key={t} className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm"><Tag className="h-4 w-4" /> {t}</span>
              ))}
            </div>
          </div>

          <div className="rounded-xl border bg-card p-4 shadow-sm">
            <div className="font-semibold mb-3">Scan QR code for easy payments</div>
            <div className="grid place-items-center py-2">
              <div className="relative">
                <QrCode className="h-40 w-40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 px-2 py-1 rounded text-xs font-mono">
                    {qrCode.slice(0, 12)}...
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link to="/events" className="rounded-lg border px-3 py-2 font-medium text-center">Back to Events</Link>
            <Link to="/attendee-insights" className="rounded-lg bg-brand text-white px-3 py-2 font-medium text-center">Attendee Insights</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border bg-card p-3">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-lg font-semibold">{value}</div>
    </div>
  );
}
