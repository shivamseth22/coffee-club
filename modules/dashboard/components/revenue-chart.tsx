import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { weeklyRevenue } from "../data";

export function RevenueChart({ className }: { className?: string }) {
  const maxRevenue = Math.max(...weeklyRevenue.map((d) => d.amount));

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Revenue by day</CardTitle>
        <CardDescription>Last 7 days</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex h-56 items-end gap-3">
          {weeklyRevenue.map((d) => (
            <div key={d.day} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
              <span className="text-xs text-muted-foreground tabular-nums">
                ₹{(d.amount / 1000).toFixed(1)}k
              </span>
              <div
                className="w-full rounded-t-md bg-primary transition-opacity hover:opacity-80"
                style={{ height: `${(d.amount / maxRevenue) * 100}%` }}
                title={`₹${d.amount.toLocaleString("en-IN")}`}
              />
              <span className="text-xs">{d.day}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
