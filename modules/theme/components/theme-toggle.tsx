"use client";

import { useLayoutEffect } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

function currentTheme() {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

export function ThemeToggle() {
  // Re-apply after React clears it on the dev remount. This is a no-op in production.
  useLayoutEffect(() => {
    try {
      const theme = localStorage.getItem("theme");
      if (theme) document.documentElement.setAttribute("data-theme", theme);
    } catch {}
  }, []);

  function toggle() {
    const next = currentTheme() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  }

  // Both icons are rendered and CSS picks one, so server and client markup always match.
  return (
    <Button
      variant="outline"
      size="icon-lg"
      onClick={toggle}
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
    >
      <Moon className="dark:hidden" />
      <Sun className="hidden dark:block" />
    </Button>
  );
}
