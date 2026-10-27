"use client";

import { useSyncExternalStore } from "react";
import { createPersistentStore } from "@/lib/persistent-store";
import type { CartLine } from "@/modules/cart";

export type PickupTime = "asap" | "15" | "30";

export type Order = {
  id: string;
  createdAt: number;
  name: string;
  pickup: PickupTime;
  note: string;
  lines: CartLine[];
  subtotal: number;
  tax: number;
  total: number;
};

const orders = createPersistentStore<Order[]>("brew-orders", []);
const profile = createPersistentStore<{ name: string }>("brew-profile", { name: "" });

export const useOrders = orders.useStore;
export const useProfile = profile.useStore;

export function placeOrder(order: Omit<Order, "id" | "createdAt">) {
  const id = String(Math.floor(1000 + Math.random() * 9000));
  orders.set((all) => [{ ...order, id, createdAt: Date.now() }, ...all]);
  profile.set({ name: order.name });
  return id;
}

export const pickupLabels: Record<PickupTime, string> = {
  asap: "As soon as possible",
  "15": "In 15 minutes",
  "30": "In 30 minutes",
};

// Explicit order: object keys that look like numbers would otherwise sort first.
export const pickupTimes: PickupTime[] = ["asap", "15", "30"];

// Demo timeline so you can watch an order move through every stage.
export const stages = [
  { id: "received", label: "Order received", hint: "We've got it and it's in the queue." },
  { id: "brewing", label: "Brewing", hint: "Your barista is pulling shots now." },
  { id: "ready", label: "Ready for pickup", hint: "Grab it from the counter. Enjoy!" },
] as const;

const BREWING_AT = 6_000;
const READY_AT = 20_000;

export function stageIndex(order: Order, now: number) {
  const elapsed = now - order.createdAt;
  return elapsed >= READY_AT ? 2 : elapsed >= BREWING_AT ? 1 : 0;
}

export function stageProgress(order: Order, now: number) {
  return Math.min(100, Math.max(4, ((now - order.createdAt) / READY_AT) * 100));
}

// One shared 1s clock. The server snapshot is 0 so prerendering never reads the time.
let now: number | null = null;
const clockListeners = new Set<() => void>();
let timer: ReturnType<typeof setInterval> | undefined;

function subscribeClock(listener: () => void) {
  clockListeners.add(listener);
  // Refresh a value left stale while nothing was subscribed; React re-reads it after subscribing.
  if (!timer) now = Date.now();
  timer ??= setInterval(() => {
    now = Date.now();
    clockListeners.forEach((l) => l());
  }, 1000);
  return () => {
    clockListeners.delete(listener);
    if (clockListeners.size === 0) {
      clearInterval(timer);
      timer = undefined;
    }
  };
}

export function useNow() {
  return useSyncExternalStore(subscribeClock, () => (now ??= Date.now()), () => 0);
}
