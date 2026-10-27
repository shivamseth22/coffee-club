"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ProductImage } from "@/modules/menu/components/product-image";
import { getProduct } from "@/modules/menu/data";
import { describeOptions, formatPrice } from "@/modules/menu/pricing";
import { cartActions, cartTotals, linePrice, setCartOpen, useCart, useCartOpen, type CartLine } from "../store";
import { QuantityStepper } from "./quantity-stepper";

export function CartSheet() {
  const open = useCartOpen();
  const lines = useCart();
  const { subtotal, tax, total, count } = cartTotals(lines);

  return (
    <Sheet open={open} onOpenChange={setCartOpen}>
      <SheetContent className="w-full gap-0 sm:max-w-md">
        <SheetHeader className="border-b">
          <SheetTitle>Your order</SheetTitle>
          <SheetDescription>
            {count ? `${count} item${count > 1 ? "s" : ""} · ready in about 10 min` : "Nothing here yet"}
          </SheetDescription>
        </SheetHeader>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center">
            <div className="flex size-14 items-center justify-center rounded-full bg-muted">
              <ShoppingBag className="size-6 text-muted-foreground" />
            </div>
            <p className="font-medium">Your cart is empty</p>
            <p className="text-sm text-muted-foreground">Pick something warm (or iced) from the menu.</p>
          </div>
        ) : (
          <>
            <ScrollArea className="min-h-0 flex-1">
              <ul className="divide-y px-4">
                {lines.map((line) => (
                  <CartLineRow key={line.key} line={line} />
                ))}
              </ul>
            </ScrollArea>
            <SheetFooter className="border-t">
              <dl className="space-y-1 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <dt>Subtotal</dt>
                  <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <dt>GST (5%)</dt>
                  <dd className="tabular-nums">{formatPrice(tax)}</dd>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between text-base font-semibold">
                  <dt>Total</dt>
                  <dd className="tabular-nums">{formatPrice(total)}</dd>
                </div>
              </dl>
              <Link
                href="/checkout"
                onClick={() => setCartOpen(false)}
                className={buttonVariants({ size: "lg", className: "h-11 w-full text-base" })}
              >
                Checkout · {formatPrice(total)}
              </Link>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

function CartLineRow({ line }: { line: CartLine }) {
  const product = getProduct(line.productId);
  const price = linePrice(line);
  if (!product || price === undefined) return null;

  function remove() {
    const undo = cartActions.remove(line.key);
    toast(`Removed ${product!.name}`, { action: { label: "Undo", onClick: undo } });
  }

  return (
    <li className="flex items-center gap-3 py-4 animate-in fade-in-0 slide-in-from-right-2">
      <ProductImage product={product} sizes="48px" className="size-12 shrink-0 rounded-lg" emojiClassName="text-2xl" />
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium">{product.name}</p>
        {product.drink && (
          <p className="truncate text-xs text-muted-foreground">{describeOptions(product, line.options)}</p>
        )}
        <p className="mt-0.5 text-sm tabular-nums">{formatPrice(price * line.qty)}</p>
      </div>
      <QuantityStepper
        label={product.name}
        value={line.qty}
        onChange={(qty) => (qty <= 0 ? remove() : cartActions.setQty(line.key, qty))}
      />
    </li>
  );
}
