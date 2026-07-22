"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Search } from "lucide-react";

import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useRipple } from "@/components/ui/useRipple";
import RippleLayer from "@/components/ui/RippleLayer";

interface PageHeaderProps {
  title?: string;
  subtitle?: string;
  rightSlot?: React.ReactNode;
  className?: string;
}

function CircleButton({
  children,
  onClick,
  ariaLabel,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  ariaLabel: string;
}) {
  const { ref, ripples, createRipple } = useRipple();

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      onPointerDown={createRipple}
      onClick={onClick}
      aria-label={ariaLabel}
      className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full transition-all duration-200 active:scale-95 active:shadow-[var(--shadow-inset)]"
      style={{
        background: "var(--surface)",
        color: "var(--text)",
        boxShadow: "var(--shadow-medium)",
      }}
    >
      <RippleLayer ripples={ripples} />
      <span className="relative z-10">
        {children}
      </span>
    </button>
  );
}

export function PageHeader({
  title,
  subtitle,
  rightSlot,
  className,
}: PageHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isRecallDetails =
    pathname.startsWith("/recalls/") &&
    pathname !== "/recalls";

  function handleBack() {
    if (isRecallDetails) {
      router.push("/recalls");
    } else {
      router.push("/");
    }
  }

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 backdrop-blur-xl",
        className
      )}
      style={{
        background: "color-mix(in srgb, var(--bg) 88%, transparent)",
      }}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          {!isHome && (
            <CircleButton
              onClick={handleBack}
              ariaLabel="Back"
            >
              <ArrowLeft size={20} strokeWidth={2.2} />
            </CircleButton>
          )}

          <Link
            href="/"
            className="text-lg font-bold tracking-tight"
            style={{ color: "var(--text)" }}
          >
            OpenPharmaDB
          </Link>

          {(title || subtitle) && (
            <div
              className="hidden pl-4 md:block"
              style={{
                borderLeft:
                  "1px solid color-mix(in srgb, var(--text) 12%, transparent)",
              }}
            >
              {title && (
                <h1
                  className="text-sm font-semibold"
                  style={{ color: "var(--text)" }}
                >
                  {title}
                </h1>
              )}

              {subtitle && (
                <p
                  className="text-xs"
                  style={{
                    color: "var(--text-secondary)",
                  }}
                >
                  {subtitle}
                </p>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <CircleButton ariaLabel="Search">
            <Search size={20} strokeWidth={2.2} />
          </CircleButton>

          <ThemeToggle />

          {rightSlot}
        </div>
      </div>
    </motion.header>
  );
}
