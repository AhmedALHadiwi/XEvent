import Layout from "@/components/eventx/Layout";
import StatCard from "@/components/eventx/StatCard";
import { NetSalesChart, EngagementDonut, SeatGrid, LocationsBar } from "@/components/eventx/widgets";
import { UpcomingEvents, Notifications } from "@/components/eventx/lists";
import { CalendarDays, Ticket, DollarSign } from "lucide-react";

export default function Index() {
  return (
    <Layout>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <StatCard title="Events" value="28 Events" icon={<CalendarDays className="h-5 w-5" />} color="bg-sky-500" />
        <StatCard title="Bookings" value="2,7598" icon={<Ticket className="h-5 w-5" />} color="bg-amber-500" />
        <StatCard title="Revenue" value="623,500 LKR" icon={<DollarSign className="h-5 w-5" />} color="bg-emerald-600" />
        <div className="bg-card rounded-xl p-4 border shadow-sm">
          <div className="text-sm text-muted-foreground">Search, filters and actions will appear here as we build more features.</div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mt-4">
        <div className="xl:col-span-2 space-y-4">
          <NetSalesChart />
          <SeatGrid />
        </div>
        <div className="space-y-4">
          <EngagementDonut />
          <LocationsBar />
          <UpcomingEvents />
          <Notifications />
        </div>
      </div>
    </Layout>
  );
}
