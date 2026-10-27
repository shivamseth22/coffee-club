"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Check, Coffee, PartyPopper, Receipt } from "lucide-react";
import { toast } from "sonner";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useHydrated } from "@/lib/persistent-store";
import { cartActions, setCartOpen } from "@/modules/cart";
import { formatPrice } from "@/modules/menu/pricing";
import { pickupLabels, stageIndex, stageProgress, stages, useNow, useOrders } from "../store";
import { OrderLines } from "./order-lines";

const stageIcons = [Receipt, Coffee, PartyPopper];

export function OrderTracker({ id }: { id: string }) {
  const hydrated = useHydrated();
  const order = useOrders().find((o) => o.id === id);
  const now = useNow();
  const stage = order ? stageIndex(order, now) : 0;

  // Celebrate once when the order turns ready while the page is open.
  const prevStage = useRef<number | null>(null);
  useEffect(() => {
    if (!order) return;
    if (prevStage.current !== null && prevStage.current < 2 && stage === 2) {
      toast.success(`${order.name}, your order is ready!`, { description: "Come grab it from the counter." });
    }
    prevStage.current = stage;
  }, [stage, order]);

  if (!hydrated) return <TrackerSkeleton />;

  if (!order) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 px-4 py-24 text-center">
        <p className="text-5xl">🤔</p>
        <h1 className="text-xl font-semibold">We couldn&apos;t find order #{id}</h1>
        <p className="text-muted-foreground">Orders are saved on this device only.</p>
        <Link href="/orders" className={buttonVariants({ className: "mt-2" })}>
          See your orders
        </Link>
      </div>
    );
  }

  const ready = stage === 2;
  const StageIcon = stageIcons[stage];

  function orderAgain() {
    order!.lines.forEach((l) => cartActions.add(l.productId, l.options, l.qty));
    setCartOpen(true);
  }

  return (
    <div className="flex-1 bg-muted/40">
      <div className="mx-auto max-w-2xl space-y-6 px-4 py-8 sm:px-6">
        <Card className="overflow-hidden pt-0">
          <div
            className={`flex flex-col items-center gap-3 px-6 py-10 text-center transition-colors duration-700 ${
              ready ? "bg-emerald-50 dark:bg-emerald-950/40" : "bg-amber-50 dark:bg-amber-950/30"
            }`}
          >
            <div
              key={stage}
              className={`flex size-16 items-center justify-center rounded-full animate-in zoom-in-50 duration-500 ${
                ready ? "bg-emerald-500 text-white" : "bg-amber-500 text-white"
              }`}
            >
              <StageIcon className={`size-7 ${stage === 1 ? "animate-pulse" : ""}`} />
            </div>
            <p className="text-sm text-muted-foreground">Order #{order.id} · for {order.name}</p>
            <h1 key={`t${stage}`} className="text-2xl font-semibold tracking-tight animate-in fade-in-0 slide-in-from-bottom-1">
              {stages[stage].label}
            </h1>
            <p className="text-muted-foreground">{stages[stage].hint}</p>
            <Progress value={stageProgress(order, now)} className="mt-2 w-full max-w-sm" aria-label="Order progress" />
          </div>
          <CardContent className="pt-6">
            <ol className="grid grid-cols-3 gap-2">
              {stages.map((s, i) => (
                <li key={s.id} className="flex flex-col items-center gap-2 text-center">
                  <span
                    className={`flex size-8 items-center justify-center rounded-full border text-xs font-medium transition-all duration-500 ${
                      i < stage
                        ? "border-primary bg-primary text-primary-foreground"
                        : i === stage
                          ? "border-primary ring-4 ring-primary/15"
                          : "text-muted-foreground"
                    }`}
                  >
                    {i < stage || (ready && i === 2) ? <Check className="size-4" /> : i + 1}
                  </span>
                  <span className={`text-xs ${i <= stage ? "font-medium" : "text-muted-foreground"}`}>{s.label}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <dl className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-muted-foreground">Pickup</dt>
                <dd className="font-medium">{pickupLabels[order.pickup]}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Placed</dt>
                <dd className="font-medium">
                  {new Date(order.createdAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
                </dd>
              </div>
              {order.note && (
                <div className="col-span-2">
                  <dt className="text-muted-foreground">Note</dt>
                  <dd className="font-medium">&ldquo;{order.note}&rdquo;</dd>
                </div>
              )}
            </dl>
            <Separator />
            <OrderLines lines={order.lines} />
            <Separator />
            <div className="flex justify-between font-semibold">
              <span>Total (pay at pickup)</span>
              <span className="tabular-nums">{formatPrice(order.total)}</span>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button variant="outline" size="lg" className="h-11 flex-1" onClick={orderAgain}>
            Order this again
          </Button>
          <Link href="/" className={buttonVariants({ size: "lg", className: "h-11 flex-1" })}>
            Back to menu
          </Link>
        </div>
      </div>
    </div>
  );
}

export function TrackerSkeleton() {
  return (
    <div className="mx-auto w-full max-w-2xl flex-1 space-y-6 px-4 py-8 sm:px-6">
      <div className="h-80 animate-pulse rounded-xl bg-muted" />
      <div className="h-56 animate-pulse rounded-xl bg-muted" />
    </div>
  );
}
