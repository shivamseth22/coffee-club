"use client";

import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/modules/menu/pricing";
import { cartTotals, setCartOpen, useCart } from "../store";

// Floating "view cart" bar for small screens.
export function CartBar() {
  const { count, subtotal } = cartTotals(useCart());
  if (!count) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-20 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:hidden animate-in slide-in-from-bottom-4 fade-in-0">
      <Button className="h-12 w-full justify-between rounded-xl px-4 text-base shadow-lg" onClick={() => setCartOpen(true)}>
        <span className="flex items-center gap-2">
          <ShoppingBag />
          View cart · {count}
        </span>
        <span className="tabular-nums">{formatPrice(subtotal)}</span>
      </Button>
    </div>
  );
}
