"use client";

import { useDeferredValue, useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CartBar } from "@/modules/cart";
import { categories, products, type CategoryId, type Product } from "../data";
import { ProductCard } from "./product-card";
import { ProductDialog } from "./product-dialog";

type Filter = CategoryId | "all";

export function MenuView() {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Product | null>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const deferredQuery = useDeferredValue(query);

  // Press "/" anywhere to jump to search.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      if (e.key === "/" && !target.closest("input, textarea, [contenteditable]")) {
        e.preventDefault();
        searchRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const q = deferredQuery.trim().toLowerCase();
  const visible = products.filter(
    (p) =>
      (filter === "all" || p.category === filter) &&
      (!q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)),
  );

  return (
    <div className="flex-1 pb-24 sm:pb-12">
      <section className="border-b bg-gradient-to-b from-amber-50 to-background dark:from-amber-950/30">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <p className="text-sm font-medium text-amber-700 dark:text-amber-400">Order ahead · skip the line</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">What are you sipping today?</h1>
          <p className="mt-2 max-w-lg text-muted-foreground">
            Fresh roasts, made your way. Order now and it&apos;ll be ready in about 10 minutes.
          </p>
        </div>
      </section>

      <div className="sticky top-14 z-10 border-b bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:px-6">
          <Tabs value={filter} onValueChange={(v) => setFilter(v as Filter)} className="min-w-0 overflow-x-auto">
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              {categories.map((c) => (
                <TabsTrigger key={c.id} value={c.id}>
                  {c.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <div className="relative sm:ml-auto sm:w-64">
            <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              ref={searchRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Escape" && setQuery("")}
              placeholder="Search the menu"
              aria-label="Search the menu"
              className="pr-8 pl-8"
            />
            {query ? (
              <Button
                variant="ghost"
                size="icon-xs"
                className="absolute top-1/2 right-1.5 -translate-y-1/2"
                onClick={() => setQuery("")}
                aria-label="Clear search"
              >
                <X />
              </Button>
            ) : (
              <kbd className="pointer-events-none absolute top-1/2 right-2 hidden -translate-y-1/2 rounded border bg-muted px-1.5 font-mono text-[10px] text-muted-foreground sm:block">
                /
              </kbd>
            )}
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
        {visible.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-4xl">🔍</p>
            <p className="mt-3 font-medium">Nothing matches &ldquo;{query}&rdquo;</p>
            <Button variant="link" onClick={() => (setQuery(""), setFilter("all"))}>
              Show the full menu
            </Button>
          </div>
        ) : (
          <div
            key={filter}
            className="grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          >
            {visible.map((p, i) => (
              <ProductCard key={p.id} product={p} eager={i < 4} onOpen={() => setSelected(p)} />
            ))}
          </div>
        )}
      </main>

      <ProductDialog product={selected} onOpenChange={(open) => !open && setSelected(null)} />
      <CartBar />
    </div>
  );
}
