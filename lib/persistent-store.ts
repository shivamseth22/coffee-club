import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

// False during SSR and the hydration render, true after. Use it to avoid flashing
// "empty" states before saved data has loaded.
export function useHydrated() {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}

// A tiny localStorage-backed store. The server (and first hydration render) always
// sees `initial`, then React swaps in the saved value, so markup never mismatches.
export function createPersistentStore<T>(key: string, initial: T) {
  let state = initial;
  let loaded = false;
  const listeners = new Set<() => void>();

  function load() {
    if (loaded || typeof window === "undefined") return;
    loaded = true;
    try {
      const raw = localStorage.getItem(key);
      if (raw) state = JSON.parse(raw) as T;
    } catch {}
  }

  function get() {
    load();
    return state;
  }

  function set(next: T | ((prev: T) => T)) {
    load();
    state = typeof next === "function" ? (next as (prev: T) => T)(state) : next;
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {}
    listeners.forEach((l) => l());
  }

  function subscribe(listener: () => void) {
    listeners.add(listener);
    // Keep other tabs in sync.
    const onStorage = (e: StorageEvent) => {
      if (e.key !== key) return;
      try {
        state = e.newValue ? (JSON.parse(e.newValue) as T) : initial;
      } catch {}
      listener();
    };
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", onStorage);
    };
  }

  function useStore() {
    return useSyncExternalStore(subscribe, get, () => initial);
  }

  return { get, set, useStore };
}
