"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { useRipple } from "@/components/ui/useRipple";
import RippleLayer from "@/components/ui/RippleLayer";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "icon";
}

export function Button({
  className,
  variant = "primary",
  children,
  ...props
}: ButtonProps) {
  const { ref, ripples, createRipple } = useRipple();

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      onPointerDown={createRipple}
      {...props}
      className={cn(
        "relative overflow-hidden select-none font-medium transition-all duration-200 outline-none",
        "active:scale-[0.97] active:shadow-[var(--shadow-inset)]",
        "disabled:opacity-50 disabled:pointer-events-none",

        variant === "primary" &&
          "rounded-2xl px-5 py-3 text-white",

        variant === "secondary" &&
          "rounded-2xl px-5 py-3",

        variant === "ghost" &&
          "rounded-2xl px-5 py-3",

        variant === "icon" &&
          "h-12 w-12 rounded-full flex items-center justify-center",

        className
      )}
      style={{
        background:
          variant === "primary"
            ? "var(--accent)"
            : variant === "ghost"
            ? "transparent"
            : "var(--surface)",

        color:
          variant === "primary"
            ? "#fff"
            : "var(--text)",

        boxShadow:
          variant === "ghost"
            ? "none"
            : "var(--shadow-soft)",
      }}
    >
      <RippleLayer ripples={ripples} />

      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
}
