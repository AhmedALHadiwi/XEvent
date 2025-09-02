import Layout from "@/components/eventx/Layout";
import { useAuth } from "@/hooks/useAuth";
import { Navigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Area, AreaChart } from "recharts";
import { Download, FileText, Calendar } from "lucide-react";

export default function Analytics() {
  const { user, isAdmin, loading } = useAuth();
  const [analytics, setAnalytics] = useState({
    totalRevenue: 0,
    totalAttendees: 0,
    totalTickets: 0,
    events: 0
  });

  useEffect(() => {
    if (user && isAdmin) {
      loadAnalytics();
    }
  }, [user, isAdmin]);

  const loadAnalytics = async () => {
    try {
      const response = await api<any>("/api/analytics/dashboard");
      setAnalytics(response);
    } catch (error) {
      console.error("Failed to load analytics:", error);
    }
  };

  const exportReport = async (format: 'csv' | 'excel') => {
    try {
      const response = await fetch(`/api/analytics/export?format=${format}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `analytics-report.${format}`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to export report:", error);
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
          <p className="text-muted-foreground mb-4">You need administrator privileges to view analytics and reports.</p>
          <Link to="/" className="px-4 py-2 bg-brand text-white rounded-lg hover:brightness-95 transition">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const revenue = [
    { m: "Jan", v: 120000 }, { m: "Feb", v: 156000 }, { m: "Mar", v: 98000 }, { m: "Apr", v: 134000 }, { m: "May", v: 162000 }, { m: "Jun", v: 189000 }
  ];
  const tickets = [
    { m: "Jan", v: 350 }, { m: "Feb", v: 420 }, { m: "Mar", v: 280 }, { m: "Apr", v: 330 }, { m: "May", v: 465 }, { m: "Jun", v: 510 }
  ];

  return (
    <Layout>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Analytics & Reports</h2>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => exportReport('csv')}
            className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-muted"
          >
            <FileText className="h-4 w-4" />
            Export CSV
          </button>
          <button 
            onClick={() => exportReport('excel')}
            className="inline-flex items-center gap-2 rounded-lg bg-brand text-white px-3 py-2 text-sm font-medium"
          >
            <Download className="h-4 w-4" />
            Export Excel
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-card rounded-xl p-4 border shadow-sm">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-emerald-500 text-white grid place-items-center">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">Total Events</div>
              <div className="text-xl font-semibold">{analytics.events}</div>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-xl p-4 border shadow-sm">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-blue-500 text-white grid place-items-center">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">Total Tickets</div>
              <div className="text-xl font-semibold">{analytics.totalTickets.toLocaleString()}</div>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-xl p-4 border shadow-sm">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-purple-500 text-white grid place-items-center">
              <Download className="h-5 w-5" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">Total Attendees</div>
              <div className="text-xl font-semibold">{analytics.totalAttendees.toLocaleString()}</div>
            </div>
          </div>
        </div>
        <div className="bg-card rounded-xl p-4 border shadow-sm">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-green-500 text-white grid place-items-center">
              <span className="text-xs font-bold">LKR</span>
            </div>
            <div>
              <div className="text-xs text-muted-foreground uppercase tracking-wide">Total Revenue</div>
              <div className="text-xl font-semibold">{analytics.totalRevenue.toLocaleString()} LKR</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-card rounded-xl p-4 border shadow-sm">
          <div className="font-semibold mb-2">Revenue</div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenue} margin={{ left: -10, right: 10, top: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.6}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="m" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} tickFormatter={(v)=>`${v/1000}k`} />
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <Tooltip formatter={(v)=>[`LKR ${v.toLocaleString()}`, "Revenue"]} />
                <Area type="monotone" dataKey="v" stroke="#16a34a" fill="url(#rev)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-card rounded-xl p-4 border shadow-sm">
          <div className="font-semibold mb-2">Tickets Sold</div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={tickets} margin={{ left: -10, right: 10, top: 10, bottom: 0 }}>
                <XAxis dataKey="m" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <Tooltip />
                <Line type="monotone" dataKey="v" stroke="#3b82f6" strokeWidth={3} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Layout>
  );
}
