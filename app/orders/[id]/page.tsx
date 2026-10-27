import { Suspense } from "react";
import type { Metadata } from "next";
import { OrderTracker, TrackerSkeleton } from "@/modules/orders";

export const metadata: Metadata = { title: "Order status" };

// Orders live in the browser, so the id is only known at request time.
export default function Page({ params }: PageProps<"/orders/[id]">) {
  return (
    <Suspense fallback={<TrackerSkeleton />}>
      {params.then(({ id }) => (
        <OrderTracker id={id} />
      ))}
    </Suspense>
  );
}
