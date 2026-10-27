"use client";

import { useSyncExternalStore } from "react";

export type Theme = "light" | "dark";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

function getTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

// Reads the theme off <html data-theme>, so it stays in sync however it gets changed.
export function useTheme() {
  return useSyncExternalStore(subscribe, getTheme, () => "light" as Theme);
}
