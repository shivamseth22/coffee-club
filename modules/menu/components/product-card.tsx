"use client";

import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cartActions, setCartOpen } from "@/modules/cart";
import { getSizeLabel, type Product } from "../data";
import { basePrice, defaultOptionsFor, formatPrice } from "../pricing";
import { ProductImage } from "./product-image";

export function ProductCard({
  product,
  onOpen,
  eager,
}: {
  product: Product;
  onOpen: () => void;
  eager?: boolean;
}) {
  const options = defaultOptionsFor(product);
  const price = basePrice(product);

  function quickAdd() {
    cartActions.add(product.id, options);
    toast.success(`${product.name} added`, {
      description: product.drink ? `${getSizeLabel(options.size)} · tap the card to customise` : undefined,
      action: { label: "View cart", onClick: () => setCartOpen(true) },
    });
  }

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:ring-foreground/20 animate-in fade-in-0 zoom-in-95">
      <button
        type="button"
        onClick={onOpen}
        className="flex flex-1 flex-col text-left outline-none focus-visible:ring-3 focus-visible:ring-ring/50 rounded-xl"
        aria-label={`Customise ${product.name}`}
      >
        <ProductImage
          product={product}
          eager={eager}
          sizes="(min-width: 1024px) 280px, (min-width: 768px) 33vw, (min-width: 480px) 50vw, 100vw"
          className="h-40 [&>*]:transition-transform [&>*]:duration-300 group-hover:[&>*]:scale-105"
          emojiClassName="text-6xl group-hover:-rotate-6"
        />
        <div className="flex flex-1 flex-col gap-1 p-4 pb-14">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-medium leading-tight">{product.name}</h3>
            {product.tag && (
              <Badge variant={product.tag === "New" ? "default" : "secondary"} className="shrink-0">
                {product.tag}
              </Badge>
            )}
          </div>
          <p className="line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
        </div>
      </button>
      <div className="pointer-events-none absolute inset-x-4 bottom-4 flex items-center justify-between">
        <span className="font-semibold tabular-nums">{price === undefined ? "Unavailable" : formatPrice(price)}</span>
        <Button
          size="icon-lg"
          className="pointer-events-auto rounded-full transition-transform active:scale-90"
          onClick={quickAdd}
          disabled={price === undefined}
          aria-label={`Add ${product.name} to cart`}
        >
          <Plus />
        </Button>
      </div>
    </article>
  );
}
