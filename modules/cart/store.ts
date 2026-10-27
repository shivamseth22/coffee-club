"use client";

import { useSyncExternalStore } from "react";
import { createPersistentStore } from "@/lib/persistent-store";
import { getProduct, type ItemOptions } from "@/modules/menu/data";
import { unitPrice } from "@/modules/menu/pricing";

export type CartLine = {
  key: string;
  productId: string;
  options: ItemOptions;
  qty: number;
};

export const TAX_RATE = 0.05;

const cart = createPersistentStore<CartLine[]>("brew-cart", []);

function lineKey(productId: string, o: ItemOptions) {
  return [productId, o.size, o.milk, o.shots, o.sweetness].join("|");
}

export const useCart = cart.useStore;

export const cartActions = {
  // Identical configurations merge into one line.
  add(productId: string, options: ItemOptions, qty = 1) {
    const key = lineKey(productId, options);
    cart.set((lines) =>
      lines.some((l) => l.key === key)
        ? lines.map((l) => (l.key === key ? { ...l, qty: l.qty + qty } : l))
        : [...lines, { key, productId, options, qty }],
    );
  },
  setQty(key: string, qty: number) {
    cart.set((lines) =>
      qty <= 0 ? lines.filter((l) => l.key !== key) : lines.map((l) => (l.key === key ? { ...l, qty } : l)),
    );
  },
  // Returns a function that puts the line back where it was.
  remove(key: string) {
    const lines = cart.get();
    const index = lines.findIndex((l) => l.key === key);
    if (index === -1) return () => {};
    const removed = lines[index];
    cart.set(lines.filter((l) => l.key !== key));
    return () =>
      cart.set((now) => (now.some((l) => l.key === key) ? now : now.toSpliced(index, 0, removed)));
  },
  clear() {
    cart.set([]);
  },
};

// Unit price for a saved line, or undefined if the product or its size is no longer sold.
export function linePrice(line: CartLine) {
  const product = getProduct(line.productId);
  return product && unitPrice(product, line.options);
}

export function cartTotals(lines: CartLine[]) {
  let subtotal = 0;
  let count = 0;
  for (const l of lines) {
    const price = linePrice(l);
    if (price === undefined) continue;
    subtotal += price * l.qty;
    count += l.qty;
  }
  const tax = Math.round(subtotal * TAX_RATE);
  return { subtotal, tax, total: subtotal + tax, count };
}

// Open state for the cart sheet, so any component can open it.
let open = false;
const openListeners = new Set<() => void>();

export function setCartOpen(next: boolean) {
  open = next;
  openListeners.forEach((l) => l());
}

export function useCartOpen() {
  return useSyncExternalStore(
    (l) => (openListeners.add(l), () => openListeners.delete(l)),
    () => open,
    () => false,
  );
}
