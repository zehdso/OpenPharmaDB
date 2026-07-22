"use client";

import { motion } from "framer-motion";
import { Recall } from "@/lib/recalls";
import { useRipple } from "@/components/ui/useRipple";
import RippleLayer from "@/components/ui/RippleLayer";

interface Props {
  recall: Recall;
  compact?: boolean;
  onSelect?: (recall: Recall) => void;
}

function formatDate(date: string) {
  if (!date || date.length !== 8) return date;

  const year = Number(date.slice(0, 4));
  const month = Number(date.slice(4, 6)) - 1;
  const day = date.slice(6, 8);

  return `${day} ${new Date(year, month).toLocaleString(undefined, {
    month: "short",
  })} ${year}`;
}

function badge(classification: string) {
  const c = classification.toLowerCase();

  if (c.includes("class i"))
    return "bg-red-100 text-red-700 border-red-200";

  if (c.includes("class ii"))
    return "bg-amber-100 text-amber-700 border-amber-200";

  if (c.includes("class iii"))
    return "bg-blue-100 text-blue-700 border-blue-200";

  return "bg-emerald-100 text-emerald-700 border-emerald-200";
}

export default function RecallCard({
  recall,
  compact = false,
  onSelect,
}: Props) {
  const { ref, ripples, createRipple } = useRipple();

  return (
    <motion.div
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.18 }}
    >
      <article
        ref={ref as React.RefObject<HTMLElement>}
        onPointerDown={createRipple}
        onClick={() => onSelect?.(recall)}
        className="group relative overflow-hidden rounded-[24px] p-6 transition-all duration-200 active:shadow-[var(--shadow-inset)] cursor-pointer"
        style={{
          background: "var(--card)",
          color: "var(--text)",
          boxShadow: "var(--shadow-medium)",
        }}
      >
        <RippleLayer ripples={ripples} />

        <div className="relative z-10 mb-4 flex items-start justify-between gap-4">
          <span
            className={`rounded-full border px-3 py-1 text-xs font-semibold ${badge(
              recall.classification || ""
            )}`}
          >
            {recall.classification}
          </span>

          <span
            className="whitespace-nowrap text-sm"
            style={{ color: "var(--text-secondary)" }}
          >
            {formatDate(recall.recall_date)}
          </span>
        </div>

        <h2
          className={`relative z-10 font-bold leading-[1.3] tracking-[-0.02em] ${
            compact
              ? "line-clamp-2 text-xl sm:text-2xl"
              : "line-clamp-3 text-xl sm:text-2xl"
          }`}
          style={{ color: "var(--text)" }}
        >
          {recall.product || recall.title}
        </h2>

        <div className="relative z-10 mt-5 flex flex-wrap gap-2">
          <span
            className="rounded-full px-3 py-2 text-sm"
            style={{
              background: "var(--surface)",
              color: "var(--text-secondary)",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            {recall.regulator}
          </span>

          {recall.country && (
            <span
              className="rounded-full px-3 py-2 text-sm"
              style={{
                background: "var(--surface)",
                color: "var(--text-secondary)",
                boxShadow: "var(--shadow-soft)",
              }}
            >
              {recall.country}
            </span>
          )}
        </div>
      </article>
    </motion.div>
  );
}
