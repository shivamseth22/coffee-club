"use client";

import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function QuantityStepper({
  value,
  onChange,
  min = 0,
  max = 20,
  label,
}: {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  label: string;
}) {
  // At 1 with no floor, the minus button removes the item instead.
  const removes = min === 0 && value <= 1;

  return (
    <div className="flex items-center rounded-lg border" role="group" aria-label={label}>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label={removes ? `Remove ${label}` : `Decrease ${label}`}
      >
        {removes ? <Trash2 /> : <Minus />}
      </Button>
      <span className="w-7 text-center text-sm font-medium tabular-nums" aria-live="polite">
        {value}
      </span>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label={`Increase ${label}`}
      >
        <Plus />
      </Button>
    </div>
  );
}
