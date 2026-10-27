import { RecentOrders } from "./recent-orders";
import { RevenueChart } from "./revenue-chart";
import { StatCards } from "./stat-cards";
import { TopProducts } from "./top-products";

export function DashboardView() {
  return (
    <div className="flex-1 bg-muted/40">
      <main className="mx-auto w-full max-w-6xl space-y-6 px-4 py-8 sm:px-6">
        <header>
          <h1 className="text-2xl font-semibold tracking-tight">Coffee Shop Dashboard</h1>
          <p className="text-sm text-muted-foreground">Sales overview for this week</p>
        </header>
        <StatCards />
        <section className="grid gap-4 lg:grid-cols-3">
          <RevenueChart className="lg:col-span-2" />
          <TopProducts />
        </section>
        <RecentOrders />
      </main>
    </div>
  );
}
