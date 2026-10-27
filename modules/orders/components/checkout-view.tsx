"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Store } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useHydrated } from "@/lib/persistent-store";
import { cartActions, cartTotals, setCartOpen, useCart } from "@/modules/cart";
import { formatPrice } from "@/modules/menu/pricing";
import { pickupLabels, pickupTimes, placeOrder, useProfile, type PickupTime } from "../store";
import { OrderLines } from "./order-lines";

export function CheckoutView() {
  const hydrated = useHydrated();
  const lines = useCart();
  const profile = useProfile();
  const router = useRouter();
  const [name, setName] = useState<string | null>(null);
  const [pickup, setPickup] = useState<PickupTime>("asap");
  const [note, setNote] = useState("");
  const [placing, setPlacing] = useState(false);
  const [touched, setTouched] = useState(false);

  // Prefill with the name from last time until the user types.
  const nameValue = name ?? profile.name;
  const nameError = touched && !nameValue.trim() ? "Add a name so we can call you" : null;
  const { subtotal, tax, total, count } = cartTotals(lines);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (!nameValue.trim() || placing) return;
    setPlacing(true);
    // Simulated network round trip.
    await new Promise((r) => setTimeout(r, 900));
    const id = placeOrder({ name: nameValue.trim(), pickup, note: note.trim(), lines, subtotal, tax, total });
    router.push(`/orders/${id}`);
    cartActions.clear();
  }

  if (!hydrated) return <div className="flex-1" />;

  if (count === 0 && !placing) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 px-4 py-24 text-center">
        <p className="text-5xl">☕</p>
        <h1 className="text-xl font-semibold">Your cart is empty</h1>
        <p className="text-muted-foreground">Add a drink or two before checking out.</p>
        <Link href="/" className={buttonVariants({ className: "mt-2" })}>
          Browse the menu
        </Link>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-muted/40">
      <form onSubmit={submit} className="mx-auto grid max-w-5xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <div>
            <Link href="/" className={buttonVariants({ variant: "ghost", size: "sm", className: "-ml-2.5 text-muted-foreground" })}>
              <ArrowLeft /> Back to menu
            </Link>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight">Checkout</h1>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Who&apos;s it for?</CardTitle>
              <CardDescription>We&apos;ll call this name when it&apos;s ready.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={nameValue}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => setTouched(true)}
                placeholder="e.g. Priya"
                autoComplete="given-name"
                aria-invalid={!!nameError}
                aria-describedby={nameError ? "name-error" : undefined}
                className="h-10"
              />
              {nameError && (
                <p id="name-error" className="text-sm text-destructive animate-in fade-in-0 slide-in-from-top-1">
                  {nameError}
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pickup time</CardTitle>
              <CardDescription>Brew &amp; Co., 12 Bean Street</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={pickup} onValueChange={(v) => setPickup(v as PickupTime)} className="gap-2">
                {pickupTimes.map((p) => (
                  <Label
                    key={p}
                    className="flex cursor-pointer items-center gap-3 rounded-lg border p-3 font-normal transition-colors hover:bg-muted/60 has-data-checked:border-primary has-data-checked:bg-muted/60"
                  >
                    <RadioGroupItem value={p} />
                    {pickupLabels[p]}
                  </Label>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Anything else?</CardTitle>
              <CardDescription>Optional note for your barista.</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Extra hot, please"
                maxLength={140}
                aria-label="Note for your barista"
              />
            </CardContent>
          </Card>
        </div>

        <Card className="h-fit lg:sticky lg:top-20">
          <CardHeader>
            <CardTitle>Order summary</CardTitle>
            <CardDescription>
              {count} item{count === 1 ? "" : "s"} ·{" "}
              <button type="button" className="underline underline-offset-2 hover:text-foreground" onClick={() => setCartOpen(true)}>
                Edit
              </button>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <OrderLines lines={lines} />
            <Separator />
            <dl className="space-y-1 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <dt>Subtotal</dt>
                <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <dt>GST (5%)</dt>
                <dd className="tabular-nums">{formatPrice(tax)}</dd>
              </div>
              <div className="flex justify-between pt-1 text-base font-semibold">
                <dt>Total</dt>
                <dd className="tabular-nums">{formatPrice(total)}</dd>
              </div>
            </dl>
            <p className="flex items-center gap-2 rounded-lg bg-muted px-3 py-2 text-xs text-muted-foreground">
              <Store className="size-4 shrink-0" /> You&apos;ll pay at the counter when you pick up.
            </p>
            <Button type="submit" size="lg" className="h-11 w-full text-base" disabled={placing}>
              {placing ? (
                <>
                  <Loader2 className="animate-spin" /> Placing order…
                </>
              ) : (
                <>Place order · {formatPrice(total)}</>
              )}
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
