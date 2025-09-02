import Layout from "@/components/eventx/Layout";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Area, AreaChart } from "recharts";

export default function Analytics() {
  const revenue = [
    { m: "Jan", v: 120000 }, { m: "Feb", v: 156000 }, { m: "Mar", v: 98000 }, { m: "Apr", v: 134000 }, { m: "May", v: 162000 }, { m: "Jun", v: 189000 }
  ];
  const tickets = [
    { m: "Jan", v: 350 }, { m: "Feb", v: 420 }, { m: "Mar", v: 280 }, { m: "Apr", v: 330 }, { m: "May", v: 465 }, { m: "Jun", v: 510 }
  ];

  return (
    <Layout>
      <h2 className="text-xl font-semibold mb-4">Analytics & Reports</h2>
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
