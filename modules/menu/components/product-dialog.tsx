"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cartActions, QuantityStepper, setCartOpen } from "@/modules/cart";
import { MAX_EXTRA_SHOTS, milks, SHOT_PRICE, sweetness, type ItemOptions, type Product } from "../data";
import { availableSizes, defaultOptionsFor, formatPrice, unitPrice } from "../pricing";
import { ProductImage } from "./product-image";

export function ProductDialog({
  product,
  onOpenChange,
}: {
  product: Product | null;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog open={product !== null} onOpenChange={onOpenChange}>
      <DialogContent className="gap-0 overflow-hidden p-0 sm:max-w-md">
        {/* Keyed so options reset each time a different product opens. */}
        {product && <ProductForm key={product.id} product={product} onDone={() => onOpenChange(false)} />}
      </DialogContent>
    </Dialog>
  );
}

function ProductForm({ product, onDone }: { product: Product; onDone: () => void }) {
  const [options, setOptions] = useState<ItemOptions>(() => defaultOptionsFor(product));
  const [qty, setQty] = useState(1);
  const set = <K extends keyof ItemOptions>(key: K, value: ItemOptions[K]) =>
    setOptions((o) => ({ ...o, [key]: value }));

  const price = unitPrice(product, options);
  const sizeChoices = product.drink ? availableSizes(product) : [];

  function add() {
    if (price === undefined) return;
    cartActions.add(product.id, options, qty);
    onDone();
    toast.success(`${qty > 1 ? `${qty} × ` : ""}${product.name} added`, {
      action: { label: "View cart", onClick: () => setCartOpen(true) },
    });
  }

  return (
    <>
      <ProductImage
        product={product}
        sizes="(min-width: 640px) 448px, 100vw"
        eager
        className="h-56 animate-in fade-in-0 duration-300"
        emojiClassName="text-7xl animate-in zoom-in-75 duration-300"
      />

      <div className="space-y-5 p-5">
        <DialogHeader>
          <DialogTitle className="text-xl">{product.name}</DialogTitle>
          <DialogDescription>{product.description}</DialogDescription>
        </DialogHeader>

        {product.drink && (
          <>
            {sizeChoices.length > 1 && (
              <OptionGroup label="Size">
                <ToggleGroup
                  variant="outline"
                  spacing={0}
                  className="w-full"
                  value={[options.size]}
                  onValueChange={(v) => v[0] && set("size", v[0] as ItemOptions["size"])}
                >
                  {sizeChoices.map((s) => (
                    <ToggleGroupItem key={s.id} value={s.id} className="flex-1 flex-col gap-0 h-auto py-1.5">
                      <span>{s.label}</span>
                      <span className="text-[11px] text-muted-foreground tabular-nums">
                        {formatPrice(product.prices[s.id] ?? 0)}
                      </span>
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </OptionGroup>
            )}

            {product.milk && (
              <OptionGroup label="Milk">
                <ToggleGroup
                  variant="outline"
                  className="grid w-full grid-cols-4"
                  value={[options.milk]}
                  onValueChange={(v) => v[0] && set("milk", v[0] as ItemOptions["milk"])}
                >
                  {milks.map((m) => (
                    <ToggleGroupItem key={m.id} value={m.id} className="flex-col gap-0 h-auto py-1.5">
                      <span>{m.label}</span>
                      {m.extra > 0 && (
                        <span className="text-[11px] text-muted-foreground">+{formatPrice(m.extra)}</span>
                      )}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </OptionGroup>
            )}

            <div className="grid grid-cols-2 gap-4">
              <OptionGroup label={`Extra shots (+${formatPrice(SHOT_PRICE)})`}>
                <div className="flex items-center rounded-lg border w-fit">
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => set("shots", options.shots - 1)}
                    disabled={options.shots === 0}
                    aria-label="Fewer shots"
                  >
                    <Minus />
                  </Button>
                  <span className="w-7 text-center text-sm font-medium tabular-nums">{options.shots}</span>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => set("shots", options.shots + 1)}
                    disabled={options.shots === MAX_EXTRA_SHOTS}
                    aria-label="More shots"
                  >
                    <Plus />
                  </Button>
                </div>
              </OptionGroup>
              <OptionGroup label="Sweetness">
                <ToggleGroup
                  variant="outline"
                  size="sm"
                  spacing={0}
                  value={[options.sweetness]}
                  onValueChange={(v) => v[0] && set("sweetness", v[0] as ItemOptions["sweetness"])}
                >
                  {sweetness.map((s) => (
                    <ToggleGroupItem key={s} value={s}>
                      {s}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </OptionGroup>
            </div>
          </>
        )}
      </div>

      <DialogFooter className="m-0 flex-row items-center gap-3 rounded-none border-t bg-muted/50 p-4">
        <QuantityStepper label="quantity" value={qty} onChange={setQty} min={1} />
        <Button size="lg" className="h-10 flex-1 text-base" onClick={add} disabled={price === undefined}>
          {price === undefined ? "Unavailable" : <>Add · <span className="tabular-nums">{formatPrice(price * qty)}</span></>}
        </Button>
      </DialogFooter>
    </>
  );
}

function OptionGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">{label}</p>
      {children}
    </div>
  );
}
