"use client";

import { RippleItem } from "./useRipple";

interface Props {
  ripples: RippleItem[];
}

export default function RippleLayer({
  ripples,
}: Props) {
  return (
    <>
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="pointer-events-none absolute rounded-full bg-black/15"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            animation:
              "material-ripple 550ms cubic-bezier(.2,0,0,1) forwards",
          }}
        />
      ))}
    </>
  );
}
