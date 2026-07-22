"use client";

import Link from "next/link";

import RecallCard from "@/components/ui/RecallCard";
import { useRecalls } from "@/components/RecallProvider";

export default function LatestRecalls() {
  const { recalls, loading, error } = useRecalls();

  const latest = [...recalls]
    .sort((a, b) => b.recall_date.localeCompare(a.recall_date))
    .slice(0, 10);

  return (
    <section className="py-10">
      <div className="mb-6 flex items-center justify-between">
        <h2
          className="text-4xl font-bold tracking-tight"
          style={{ color: "var(--text)" }}
        >
          Latest Recalls
        </h2>

        <Link
          href="/recalls"
          className="rounded-full px-6 py-3 font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-floating)]"
          style={{
            background: "var(--accent)",
            color: "#ffffff",
            boxShadow: "var(--shadow-medium)",
          }}
        >
          View All
        </Link>
      </div>

      {loading && (
        <p
          style={{
            color: "var(--text-secondary)",
          }}
        >
          Loading recalls...
        </p>
      )}

      {error && (
        <p className="text-red-600">
          {error}
        </p>
      )}

      {!loading && !error && (
        <div className="space-y-5">
          {latest.map((recall) => (
            <RecallCard
              key={recall.id}
              recall={recall}
              compact
            />
          ))}
        </div>
      )}
    </section>
  );
}
