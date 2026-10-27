"use client";

import { Toaster } from "@/components/ui/sonner";
import { useTheme } from "../use-theme";

export function AppToaster() {
  const theme = useTheme();
  // On phones, sit above the floating "View cart" bar.
  return (
    <Toaster theme={theme} position="bottom-center" closeButton duration={3000} mobileOffset={{ bottom: 88 }} />
  );
}
