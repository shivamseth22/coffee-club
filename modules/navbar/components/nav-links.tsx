"use client";

import { Suspense } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";

const links = [
  { label: "Menu", href: "/" },
  { label: "Orders", href: "/orders" },
  { label: "Dashboard", href: "/dashboard" },
];

// The pathname is request data on dynamic routes, so the prerendered shell shows
// the links without a highlight and the active state streams in.
export function NavLinks() {
  return (
    <Suspense fallback={<Links pathname={null} />}>
      <ActiveLinks />
    </Suspense>
  );
}

function ActiveLinks() {
  return <Links pathname={usePathname()} />;
}

function Links({ pathname }: { pathname: string | null }) {
  return (
    <nav className="flex items-center gap-0.5 sm:gap-1">
      {links.map((l) => {
        const active = pathname !== null && (l.href === "/" ? pathname === "/" : pathname.startsWith(l.href));
        return (
          <Link
            key={l.href}
            href={l.href}
            aria-current={active ? "page" : undefined}
            className={buttonVariants({
              variant: active ? "secondary" : "ghost",
              className: active ? undefined : "text-muted-foreground",
            })}
          >
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}
