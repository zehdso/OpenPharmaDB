"use client";

import { motion } from "framer-motion";

type Props = {
  title: string;
  classification: string;
  regulator: string;
  country: string;
  date: string;
};

function badgeStyle(classification: string) {
  const text = classification.toLowerCase();

  if (text.includes("class i")) {
    return "bg-red-500/10 text-red-700 border border-red-200";
  }

  if (text.includes("class ii")) {
    return "bg-amber-500/10 text-amber-700 border border-amber-200";
  }

  if (text.includes("class iii")) {
    return "bg-blue-500/10 text-blue-700 border border-blue-200";
  }

  return "bg-emerald-500/10 text-emerald-700 border border-emerald-200";
}

export default function RecallHero({
  title,
  classification,
  regulator,
  country,
  date,
}: Props) {
  return (
    <section
      className="relative overflow-hidden rounded-2xl p-5 md:rounded-3xl md:p-8"
      style={{
        background: "var(--card)",
        boxShadow: "var(--shadow-medium)",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.45,
          ease: "easeOut",
        }}
        className="relative z-10"
      >
        <span
          className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${badgeStyle(
            classification
          )}`}
        >
          {classification || "Recall"}
        </span>

        <h1
          className="mt-4 text-3xl font-extrabold leading-tight tracking-tight md:text-5xl"
          style={{ color: "var(--text)" }}
        >
          {title}
        </h1>

        <div className="mt-6 flex flex-wrap gap-2">
          <Chip value={regulator} />
          <Chip value={country} />
          <Chip value={date} />
        </div>
      </motion.div>
    </section>
  );
}

function Chip({ value }: { value: string }) {
  return (
    <div
      className="rounded-full px-3 py-2 text-sm font-medium"
      style={{
        background: "var(--surface)",
        color: "var(--text-secondary)",
        boxShadow: "var(--shadow-soft)",
      }}
    >
      {value || "—"}
    </div>
  );
}
