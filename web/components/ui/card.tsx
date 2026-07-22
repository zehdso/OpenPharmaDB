import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cardVariants = cva(
  "transition-all duration-200",
  {
    variants: {
      variant: {
        default:
          "shadow-[var(--shadow-soft)] active:shadow-[var(--shadow-inset)]",

        elevated:
          "shadow-[var(--shadow-medium)] active:shadow-[var(--shadow-inset)]",

        floating:
          "shadow-[var(--shadow-floating)] active:shadow-[var(--shadow-inset)]",

        inset:
          "shadow-[var(--shadow-inset)]",
      },

      radius: {
        sm: "rounded-xl",
        md: "rounded-2xl",
        lg: "rounded-3xl",
        xl: "rounded-[32px]",
      },

      padding: {
        none: "",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },

      interactive: {
        true: "cursor-pointer hover:-translate-y-0.5 active:translate-y-0",
        false: "",
      },
    },

    defaultVariants: {
      variant: "default",
      radius: "lg",
      padding: "md",
      interactive: false,
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

export function Card({
  className,
  variant,
  radius,
  padding,
  interactive,
  style,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        cardVariants({
          variant,
          radius,
          padding,
          interactive,
        }),
        className
      )}
      style={{
        background: "var(--card)",
        color: "var(--text)",
        border: "none",
        ...style,
      }}
      {...props}
    />
  );
}
