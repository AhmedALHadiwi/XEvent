import Layout from "@/components/eventx/Layout";
import { Link } from "react-router-dom";
import { Filter, Search, CalendarDays, Clock, MapPin, ChevronRight } from "lucide-react";

const data = [
  { id: "colombo-music-festival", title: "Colombo Music Festival", price: 5000, venue: "Open Air Theater, Colombo", date: "12 April 2025", time: "9.00PM - 11.30PM" },
  { id: "lanka-supercar", title: "Lanka Supercar Show", price: 3000, venue: "Open Air Theater, Colombo", date: "15 April 2025", time: "9.00PM - 11.30PM" },
  { id: "rock-roll-night", title: "Rock & Roll Night", price: 3000, venue: "Open Air Theater, Colombo", date: "03 March 2025", time: "6.00PM - 10.30PM" },
  { id: "galle-literary", title: "Galle Literary Fair", price: 2000, venue: "Open Air Theater, Galle", date: "10 April 2025", time: "9.00AM - 12.00PM" },
  { id: "art-exhibition", title: "Kandy Art Exhibition", price: 4000, venue: "Open Air Theater, Kandy", date: "21 April 2025", time: "9.00PM - 11.30PM" },
  { id: "sri-lanka-food", title: "Sri Lanka Food Fest", price: 2000, venue: "Open Air Theater, Colombo", date: "02 March 2025", time: "7.00PM - 11.30PM" },
];

function Card({ e }: { e: typeof data[number] }) {
  return (
    <div className="bg-card rounded-xl p-4 border shadow-sm flex flex-col gap-3">
      <div className="font-semibold text-lg">{e.title}</div>
      <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2"><span className="h-5 w-5 rounded bg-emerald-100 text-emerald-700 grid place-items-center text-xs">LKR</span><span>{e.price.toLocaleString()} LKR</span></div>
        <div className="flex items-center gap-2"><CalendarDays className="h-4 w-4" /><span>{e.date}</span></div>
        <div className="flex items-center gap-2 col-span-2"><MapPin className="h-4 w-4" /><span>{e.venue}</span></div>
        <div className="flex items-center gap-2"><Clock className="h-4 w-4" /><span>{e.time}</span></div>
      </div>
      <Link to={`/events/${e.id}`} className="ml-auto inline-flex items-center gap-1 text-sm font-medium px-3 py-1.5 border rounded-lg hover:bg-muted">
        View <ChevronRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

export default function Events() {
  return (
    <Layout>
      <div className="bg-card rounded-xl p-4 border shadow-sm mb-4 flex flex-wrap items-center gap-2 justify-between">
        <div className="font-semibold text-lg">Event Management Section</div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm"><Filter className="h-4 w-4" /> Filter</button>
          <div className="hidden sm:flex items-center gap-2 rounded-full border px-3 py-1.5 bg-white">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input className="w-56 outline-none text-sm placeholder:text-muted-foreground" placeholder="Search events..." />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {data.map((e) => (
          <Card key={e.id} e={e} />
        ))}
      </div>
    </Layout>
  );
}
