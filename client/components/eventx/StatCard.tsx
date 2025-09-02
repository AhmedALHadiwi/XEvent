import { ReactNode } from "react";

export default function StatCard({ title, value, icon, color = "" }: { title: string; value: string; icon: ReactNode; color?: string }) {
  return (
    <div className="bg-card rounded-xl p-4 border shadow-sm flex items-center gap-3">
      <div className={`h-10 w-10 rounded-lg grid place-items-center text-white ${color}`}>
        {icon}
      </div>
      <div>
        <div className="text-xs text-muted-foreground uppercase tracking-wide">{title}</div>
        <div className="text-xl font-semibold">{value}</div>
      </div>
    </div>
  );
}
