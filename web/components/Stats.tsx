"use client";

import { useEffect, useState } from "react";
import { getRecalls } from "@/lib/recalls";

export default function Stats() {
  const [totalRecalls, setTotalRecalls] = useState("—");
  const [regulators, setRegulators] = useState("—");
  const [lastUpdated, setLastUpdated] = useState("—");

  useEffect(() => {
    async function load() {
      try {
        const recalls = await getRecalls();

        setTotalRecalls(recalls.length.toLocaleString());

        setRegulators(
          new Set(recalls.map((r) => r.regulator)).size.toString()
        );

        if (recalls.length > 0) {
          const latest = recalls.reduce((latest, current) =>
            current.recall_date > latest.recall_date ? current : latest
          );

          const d = latest.recall_date;

          const formatted = `${d.slice(6, 8)} ${new Date(
            Number(d.slice(0, 4)),
            Number(d.slice(4, 6)) - 1
          ).toLocaleString(undefined, {
            month: "short",
          })} ${d.slice(0, 4)}`;

          setLastUpdated(formatted);
        }
      } catch (error) {
        console.error(error);
      }
    }

    load();
  }, []);

  const stats = [
    { value: totalRecalls, label: "Total Recalls" },
    { value: regulators, label: "Regulators" },
    { value: lastUpdated, label: "Last Updated" },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6">
      <div className="grid gap-6 md:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm"
          >
            <h3 className="text-4xl font-bold text-slate-900">
              {stat.value}
            </h3>

            <p className="mt-2 text-slate-500">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
