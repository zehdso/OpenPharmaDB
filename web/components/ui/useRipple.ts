"use client";

import { useRef, useState } from "react";

export interface RippleItem {
  id: number;
  x: number;
  y: number;
  size: number;
}

export function useRipple() {
  const ref = useRef<HTMLElement>(null);
  const nextId = useRef(0);
  const [ripples, setRipples] = useState<RippleItem[]>([]);

  function createRipple(
    e:
      | React.MouseEvent<HTMLElement>
      | React.PointerEvent<HTMLElement>
  ) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const size =
      Math.max(rect.width, rect.height) * 2;

    const id = nextId.current++;

    setRipples((prev) => [
      ...prev,
      {
        id,
        size,
        x: e.clientX - rect.left - size / 2,
        y: e.clientY - rect.top - size / 2,
      },
    ]);

    window.setTimeout(() => {
      setRipples((prev) =>
        prev.filter((r) => r.id !== id)
      );
    }, 550);
  }

  return {
    ref,
    ripples,
    createRipple,
  };
}
