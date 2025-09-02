import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Pie, PieChart, Cell, BarChart, Bar } from "recharts";

export function NetSalesChart() {
  const data = [
    { name: "Mon", sales: 35000 },
    { name: "Tue", sales: 15000 },
    { name: "Wed", sales: 46000 },
    { name: "Thu", sales: 18000 },
    { name: "Fri", sales: 28000 },
    { name: "Sat", sales: 34000 },
    { name: "Sun", sales: 22000 },
  ];
  return (
    <div className="bg-card rounded-xl p-4 border shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <div className="font-semibold">Net Sales</div>
        <button className="text-xs rounded-full border px-2 py-1">Weekly</button>
      </div>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ left: -10, right: 10, top: 10, bottom: 0 }}>
            <XAxis dataKey="name" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} tickFormatter={(v)=>`${v/1000}k`} />
            <Tooltip formatter={(v)=>[`LKR ${v.toLocaleString()}`, "Sales"]} />
            <Line type="monotone" dataKey="sales" stroke="#ef4444" strokeWidth={3} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function EngagementDonut() {
  const COLORS = ["#22c55e", "#eab308", "#3b82f6", "#a855f7", "#ef4444"];
  const data = [
    { name: "Event A", value: 250 },
    { name: "Event B", value: 170 },
    { name: "Event C", value: 450 },
    { name: "Event D", value: 285 },
    { name: "Event E", value: 212 },
  ];
  return (
    <div className="bg-card rounded-xl p-4 border shadow-sm">
      <div className="font-semibold mb-2">Customer Engagement</div>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" innerRadius={60} outerRadius={86} paddingAngle={2}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function LocationsBar() {
  const data = [
    { name: "Colombo", count: 227 },
    { name: "Kandy", count: 123 },
    { name: "Galle", count: 143 },
    { name: "Jaffna", count: 70 },
  ];
  return (
    <div className="bg-card rounded-xl p-4 border shadow-sm">
      <div className="font-semibold mb-2">Attendee Locations</div>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <Bar dataKey="count" radius={[8,8,0,0]} fill="#60a5fa" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function SeatGrid({ rows = 7, cols = 12 }: { rows?: number; cols?: number }) {
  const seats = Array.from({ length: rows * cols }, (_, i) => {
    const col = i % cols;
    const row = Math.floor(i / cols);
    const isGap = row < 1 || row > rows - 2 || col < 1 || col > cols - 2;
    const reserved = (row + col) % 5 === 0;
    const sold = (row * col) % 7 === 0;
    return { id: i, isGap, reserved, sold };
  });
  return (
    <div className="bg-card rounded-xl p-4 border shadow-sm">
      <div className="font-semibold mb-3">Latest Event</div>
      <div className="grid grid-cols-12 gap-1.5">
        {seats.map((s) => (
          <div
            key={s.id}
            className={`h-5 rounded ${s.isGap ? "opacity-0" : s.sold ? "bg-brand/90" : s.reserved ? "bg-brand/30" : "bg-muted"}`}
          />
        ))}
      </div>
    </div>
  );
}
