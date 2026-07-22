"use client";

import React, { useRef, useState } from "react";

type RippleItem = {
  id: number;
  x: number;
  y: number;
  size: number;
};

interface RippleProps {
  children: React.ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export default function Ripple({
  children,
  className = "",
  onClick,
}: RippleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const nextId = useRef(0);
  const [ripples, setRipples] = useState<RippleItem[]>([]);

  function handleClick(
    e: React.MouseEvent<HTMLDivElement>
  ) {
    const rect = ref.current!.getBoundingClientRect();

    const size =
      Math.max(rect.width, rect.height) * 2;

    const id = nextId.current++;

    const ripple: RippleItem = {
      id,
      size,
      x: e.clientX - rect.left - size / 2,
      y: e.clientY - rect.top - size / 2,
    };

    setRipples((prev) => [...prev, ripple]);

    window.setTimeout(() => {
      setRipples((prev) =>
        prev.filter((r) => r.id !== id)
      );
    }, 550);

    onClick?.(e);
  }

  return (
    <div
      ref={ref}
      onClick={handleClick}
      className={`relative overflow-hidden ${className}`}
    >
      {children}

      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="pointer-events-none absolute rounded-full bg-black/20"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            animation:
              "material-ripple 550ms cubic-bezier(0.2,0,0,1) forwards",
          }}
        />
      ))}
    </div>
  );
}
