"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Recall } from "@/lib/recalls";

function formatDate(date: string) {
  if (!date || date.length !== 8) return date;

  const year = Number(date.slice(0, 4));
  const month = Number(date.slice(4, 6)) - 1;
  const day = date.slice(6, 8);

  return `${day} ${new Date(year, month).toLocaleString(undefined, {
    month: "short",
  })} ${year}`;
}

function badgeStyle(classification: string) {
  const text = classification.toLowerCase();

  if (text.includes("class i")) {
    return "bg-red-100 text-red-700 border-red-200";
  }

  if (text.includes("class ii")) {
    return "bg-amber-100 text-amber-700 border-amber-200";
  }

  if (text.includes("class iii")) {
    return "bg-blue-100 text-blue-700 border-blue-200";
  }

  return "bg-emerald-100 text-emerald-700 border-emerald-200";
}

type Props = {
  recall: Recall;
};

export default function RecallCard({ recall }: Props) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Link href={`/recalls/${recall.id}`}>
        <article className="rounded-2xl border border-slate-200/70 bg-white/80 p-4 backdrop-blur-xl shadow-[var(--shadow-soft)] transition-all hover:shadow-[var(--shadow-medium)]">
          <div className="flex items-start justify-between gap-3">
            <span
              className={`rounded-full border px-3 py-1 text-xs font-semibold ${badgeStyle(
                recall.classification || ""
              )}`}
            >
              {recall.classification || "Recall"}
            </span>

            <span className="text-xs text-slate-500 whitespace-nowrap">
              {formatDate(recall.recall_date)}
            </span>
          </div>

          <h2 className="mt-3 line-clamp-2 text-lg font-semibold text-slate-900">
            {recall.product || recall.title}
          </h2>

          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
              {recall.regulator}
            </span>

            <span className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
              {recall.country || "Unknown"}
            </span>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
