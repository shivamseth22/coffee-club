import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { stats } from "../data";

export function StatCards() {
  return (
    <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((s) => (
        <Card key={s.label}>
          <CardHeader>
            <CardDescription>{s.label}</CardDescription>
            <CardTitle className="text-2xl tabular-nums">{s.value}</CardTitle>
          </CardHeader>
          <CardContent>
            <p
              className={`flex items-center gap-1 text-xs font-medium ${
                s.up ? "text-emerald-600 dark:text-emerald-400" : "text-destructive"
              }`}
            >
              {s.up ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
              {s.change} vs last week
            </p>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}
