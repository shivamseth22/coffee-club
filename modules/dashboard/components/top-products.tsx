import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { topProducts } from "../data";

export function TopProducts() {
  const maxSold = Math.max(...topProducts.map((p) => p.sold));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top products</CardTitle>
        <CardDescription>Cups sold this week</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {topProducts.map((p) => (
            <li key={p.name}>
              <div className="mb-1.5 flex justify-between text-sm">
                <span>{p.name}</span>
                <span className="text-muted-foreground tabular-nums">{p.sold}</span>
              </div>
              <Progress value={(p.sold / maxSold) * 100} aria-label={`${p.name} sales`} />
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
