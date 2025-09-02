import { ChevronRight } from "lucide-react";

export function UpcomingEvents() {
  const events = [
    { name: "Cynosure Festival", date: "24 March 2025" },
    { name: "Nightor Festival", date: "30 March 2025" },
    { name: "Cynders Festival", date: "03 April 2025" },
    { name: "Hyper Festival", date: "10 April 2025" },
    { name: "EDM Festival", date: "15 April 2025" },
  ];
  return (
    <div className="bg-card rounded-xl p-4 border shadow-sm">
      <div className="font-semibold mb-3">Upcoming Events</div>
      <ul className="space-y-2">
        {events.map((e) => (
          <li key={e.name} className="flex items-center justify-between text-sm">
            <div>
              <div className="font-medium">{e.name}</div>
              <div className="text-muted-foreground">{e.date}</div>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Notifications() {
  const items = [
    "Payout released for artists at Woyo Event",
    "Total revenue has been transferred to bank",
    "@Alan Walker event in 3 days",
    "Paycheck released for artists @Cynders event",
  ];
  return (
    <div className="bg-card rounded-xl p-4 border shadow-sm">
      <div className="font-semibold mb-3">Notifications</div>
      <ul className="space-y-2 text-sm">
        {items.map((t, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand"></span>
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
