"use client";

import { useEffect, useState } from "react";
import RecallCard from "./RecallCard";
import { getRecalls, Recall } from "@/lib/recalls";

function formatDate(date: string) {
  if (!date || date.length !== 8) return date;

  const year = Number(date.slice(0, 4));
  const month = Number(date.slice(4, 6)) - 1;
  const day = date.slice(6, 8);

  return `${day} ${new Date(year, month).toLocaleString(undefined, {
    month: "short",
  })} ${year}`;
}

export default function LatestRecalls() {
  const [recalls, setRecalls] = useState<Recall[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const data = await getRecalls();

        const latest = [...data]
          .sort((a, b) => b.recall_date.localeCompare(a.recall_date))
          .slice(0, 10);

        setRecalls(latest);
      } catch {
        setError("Failed to load recalls.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-3xl font-bold">
          Latest Recalls
        </h2>

        <button className="rounded-xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700">
          View All
        </button>
      </div>

      {loading && (
        <p className="text-slate-500">
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
          {recalls.map((recall) => (
            <RecallCard
              key={recall.id}
              title={recall.product || recall.title}
              regulator={recall.regulator}
              date={formatDate(recall.recall_date)}
              severity={recall.classification}
            />
          ))}
        </div>
      )}
    </section>
  );
}
