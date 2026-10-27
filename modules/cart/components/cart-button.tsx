"use client";

import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cartTotals, setCartOpen, useCart } from "../store";

export function CartButton() {
  const { count } = cartTotals(useCart());

  return (
    <Button
      variant="outline"
      size="icon-lg"
      className="relative"
      onClick={() => setCartOpen(true)}
      aria-label={count ? `Open cart, ${count} items` : "Open cart"}
    >
      <ShoppingBag />
      {count > 0 && (
        // Keyed on count so the badge pops each time it changes.
        <span
          key={count}
          className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-semibold text-primary-foreground tabular-nums animate-in zoom-in-50 duration-200"
        >
          {count}
        </span>
      )}
    </Button>
  );
}
