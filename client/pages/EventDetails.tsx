import Layout from "@/components/eventx/Layout";
import { useParams } from "react-router-dom";
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
  const { id } = useParams();
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
                <textarea className="w-full rounded-lg border px-3 py-2 min-h-28" defaultValue={"Get ready for Sri Lanka's biggest music festival — an electrifying open-air concert featuring top international and local artists. Join 10,000+ music lovers for a night filled with live performances, immersive stage effects, and a festive atmosphere like no other!"} />
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-4 mt-4">
              <Metric label="Ticket Price" value="2500 LKR" />
              <Metric label="Seat Amount" value="1200" />
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
              <QrCode className="h-40 w-40" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button className="rounded-lg border px-3 py-2 font-medium">Edit</button>
            <button className="rounded-lg bg-brand text-white px-3 py-2 font-medium">Attendee Insights</button>
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
