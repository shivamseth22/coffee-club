import type { Metadata } from "next";
import { CheckoutView } from "@/modules/orders";

export const metadata: Metadata = { title: "Checkout" };

export default function Page() {
  return <CheckoutView />;
}
