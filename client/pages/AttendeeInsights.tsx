import Layout from "@/components/eventx/Layout";
import { useAuth } from "@/hooks/useAuth";
import { Navigate, Link } from "react-router-dom";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts";

const COLORS = ["#3b82f6", "#f59e0b", "#22c55e", "#ef4444", "#a855f7", "#06b6d4", "#000000", "#94a3b8"];

export default function AttendeeInsights() {
  const { user, isAdmin, loading } = useAuth();

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
          <p className="text-muted-foreground mb-4">You need administrator privileges to view attendee insights.</p>
          <Link to="/" className="px-4 py-2 bg-brand text-white rounded-lg hover:brightness-95 transition">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const locations = [
    { name: "Colombo", value: 853 },
    { name: "Kandy", value: 743 },
    { name: "Galle", value: 763 },
    { name: "Negombo", value: 934 },
    { name: "Matara", value: 783 },
    { name: "Jaffna", value: 643 },
    { name: "Kurunegala", value: 687 },
    { name: "Batticaloa", value: 936 },
  ];

  const interests = [
    { name: "Live Music", value: 265 },
    { name: "Innovation", value: 218 },
    { name: "EDM Music", value: 234 },
    { name: "Food Fests", value: 212 },
  ];

  const ages = [
    { name: "18-24", value: 2345 },
    { name: "25-34", value: 1342 },
    { name: "35-44", value: 245 },
  ];

  return (
    <Layout>
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <h2 className="text-xl font-semibold">All Attendee Insights</h2>
        <div className="ml-auto flex items-center gap-2">
          <button className="rounded-lg border px-3 py-2 text-sm">Filter</button>
          <input placeholder="Search..." className="rounded-full border px-3 py-1.5 text-sm w-56" />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="space-y-4">
          <InsightCard title="Attendee Age" value="18 - 24 Years" delta="30% increase" positive />
          <InsightCard title="Attendee Gender" value="Male" delta="18% increase" positive />
          <InsightCard title="Attendee Location" value="Colombo" delta="15% decrease" />
          <InsightCard title="Attendee Interests" value="EDM Music" delta="63% increase" positive />
          <InsightCard title="Total Engagement" value="Facebook ADS" delta="21% decrease" />
        </div>

        <div className="xl:col-span-2 space-y-4">
          <div className="bg-card rounded-xl p-4 border shadow-sm">
            <div className="font-semibold mb-2">All Attendee Locations</div>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={locations}>
                  <XAxis dataKey="name" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Bar dataKey="value" radius={[8,8,0,0]}>
                    {locations.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-card rounded-xl p-4 border shadow-sm">
              <div className="font-semibold mb-2">Attendee Interests</div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={interests} dataKey="value" nameKey="name" innerRadius={60} outerRadius={86} paddingAngle={2}>
                      {interests.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-card rounded-xl p-4 border shadow-sm">
              <div className="font-semibold mb-2">Attendee Ages</div>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={ages} dataKey="value" nameKey="name" innerRadius={60} outerRadius={86} paddingAngle={2}>
                      {ages.map((_, i) => (
                        <Cell key={i} fill={COLORS[(i+4) % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function InsightCard({ title, value, delta, positive }: { title: string; value: string; delta: string; positive?: boolean }) {
  return (
    <div className="bg-card rounded-xl p-4 border shadow-sm">
      <div className="text-xs text-muted-foreground">{title}</div>
      <div className="text-2xl font-bold">{value}</div>
      <div className={`text-sm mt-1 ${positive ? "text-emerald-600" : "text-rose-600"}`}>{delta}</div>
    </div>
  );
}
