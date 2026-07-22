"use client";

import { motion } from "framer-motion";
import { useRecalls } from "@/components/RecallProvider";

export default function Stats() {
  const { recalls, loading } = useRecalls();

  let totalRecalls = "—";
  let regulators = "—";
  let lastUpdated = "—";

  if (!loading && recalls.length > 0) {
    totalRecalls = recalls.length.toLocaleString();

    regulators = new Set(
      recalls.map((r) => r.regulator)
    ).size.toString();

    const latest = recalls.reduce((latest, current) =>
      current.recall_date > latest.recall_date ? current : latest
    );

    const d = latest.recall_date;

    lastUpdated = `${d.slice(6, 8)} ${new Date(
      Number(d.slice(0, 4)),
      Number(d.slice(4, 6)) - 1
    ).toLocaleString(undefined, {
      month: "short",
    })} ${d.slice(0, 4)}`;
  }

  const stats = [
    {
      value: totalRecalls,
      label: "Total Recalls",
      description: "Indexed records",
    },
    {
      value: regulators,
      label: "Regulators",
      description: "Official agencies",
    },
    {
      value: lastUpdated,
      label: "Last Updated",
      description: "Latest imported recall",
    },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 py-4 sm:px-6">
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.35,
              delay: index * 0.08,
            }}
            className="rounded-3xl p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-[var(--shadow-floating)]"
            style={{
              background: "var(--card)",
              boxShadow: "var(--shadow-medium)",
            }}
          >
            <p
              className="text-sm font-medium"
              style={{
                color: "var(--text-secondary)",
              }}
            >
              {stat.label}
            </p>

            <h3
              className="mt-3 text-3xl font-bold tracking-tight"
              style={{
                color: "var(--text)",
              }}
            >
              {stat.value}
            </h3>

            <p
              className="mt-2 text-sm"
              style={{
                color: "var(--text-secondary)",
              }}
            >
              {stat.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
