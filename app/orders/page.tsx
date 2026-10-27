import type { Metadata } from "next";
import { OrdersList } from "@/modules/orders";

export const metadata: Metadata = { title: "Your orders" };

export default function Page() {
  return <OrdersList />;
}
