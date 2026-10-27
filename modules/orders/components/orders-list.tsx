"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useHydrated } from "@/lib/persistent-store";
import { getProduct } from "@/modules/menu/data";
import { formatPrice } from "@/modules/menu/pricing";
import { stageIndex, stages, useNow, useOrders } from "../store";

export function OrdersList() {
  const hydrated = useHydrated();
  const orders = useOrders();
  const now = useNow();

  return (
    <div className="flex-1 bg-muted/40">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
        <h1 className="text-2xl font-semibold tracking-tight">Your orders</h1>
        <p className="text-sm text-muted-foreground">Saved on this device.</p>

        <div className="mt-6 space-y-3">
          {!hydrated ? (
            [0, 1, 2].map((i) => <div key={i} className="h-20 animate-pulse rounded-xl bg-muted" />)
          ) : orders.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-5xl">🧾</p>
              <p className="mt-3 font-medium">No orders yet</p>
              <Link href="/" className={buttonVariants({ className: "mt-4" })}>
                Order your first coffee
              </Link>
            </div>
          ) : (
            orders.map((o) => {
              const stage = stageIndex(o, now);
              const names = o.lines.map((l) => getProduct(l.productId)?.name).filter(Boolean).join(", ");
              return (
                <Link key={o.id} href={`/orders/${o.id}`} className="block">
                  <Card className="flex-row items-center gap-4 px-4 py-4 transition-all hover:-translate-y-0.5 hover:shadow-md">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">#{o.id}</span>
                        <Badge variant={stage === 2 ? "secondary" : "default"}>{stages[stage].label}</Badge>
                      </div>
                      <p className="mt-1 truncate text-sm text-muted-foreground">{names}</p>
                    </div>
                    <span className="text-sm font-medium tabular-nums">{formatPrice(o.total)}</span>
                    <ChevronRight className="size-4 text-muted-foreground" />
                  </Card>
                </Link>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
