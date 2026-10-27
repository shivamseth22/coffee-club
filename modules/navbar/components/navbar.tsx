import Link from "next/link";
import { Coffee } from "lucide-react";
import { CartButton } from "@/modules/cart";
import { ThemeToggle } from "@/modules/theme";
import { NavLinks } from "./nav-links";

export function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3 sm:gap-8">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Coffee className="size-4" />
            </span>
            <span className="hidden font-semibold tracking-tight sm:inline">Brew &amp; Co.</span>
          </Link>
          <NavLinks />
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <CartButton />
        </div>
      </div>
    </header>
  );
}
