"use client";

import { use } from "react";
import { motion } from "framer-motion";

import { useRecalls } from "@/components/RecallProvider";

import RecallHeader from "@/components/recall/RecallHeader";
import RecallHero from "@/components/recall/RecallHero";
import RecallMetaGrid from "@/components/recall/RecallMetaGrid";
import RecallReason from "@/components/recall/RecallReason";
import RecallActions from "@/components/recall/RecallActions";

function formatDate(date: string) {
  if (!date || date.length !== 8) return date;

  const year = Number(date.slice(0, 4));
  const month = Number(date.slice(4, 6)) - 1;
  const day = date.slice(6, 8);

  return `${day} ${new Date(year, month).toLocaleString(undefined, {
    month: "short",
  })} ${year}`;
}

export default function RecallDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const { recalls, loading } = useRecalls();

  const recall = recalls.find((r) => r.id === id);

  if (loading) {
    return (
      <main
        className="min-h-screen"
        style={{ background: "var(--bg)" }}
      >
        <div className="mx-auto w-full max-w-5xl px-4 py-24 sm:px-6 lg:max-w-6xl">
          <div
            className="h-12 w-2/3 animate-pulse rounded-2xl"
            style={{
              background: "var(--surface)",
              boxShadow: "var(--shadow-inset)",
            }}
          />

          <div
            className="mt-6 h-56 animate-pulse rounded-3xl"
            style={{
              background: "var(--surface)",
              boxShadow: "var(--shadow-inset)",
            }}
          />

          <div className="mt-6 grid grid-cols-2 gap-4">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-32 animate-pulse rounded-2xl"
                style={{
                  background: "var(--surface)",
                  boxShadow: "var(--shadow-inset)",
                }}
              />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (!recall) {
    return (
      <main
        className="flex min-h-screen items-center justify-center px-4"
        style={{ background: "var(--bg)" }}
      >
        <div
          className="rounded-3xl p-8 text-center"
          style={{
            background: "var(--card)",
            boxShadow: "var(--shadow-medium)",
          }}
        >
          <h1
            className="text-3xl font-bold"
            style={{ color: "var(--text)" }}
          >
            Recall not found
          </h1>

          <p
            className="mt-4"
            style={{
              color: "var(--text-secondary)",
            }}
          >
            This recall may have been removed or the URL is invalid.
          </p>
        </div>
      </main>
    );
  }

  const title = recall.product || recall.title;
  const formattedDate = formatDate(recall.recall_date);

  return (
    <main
      className="relative min-h-screen overflow-x-hidden"
      style={{ background: "var(--bg)" }}
    >
      <RecallHeader title={title} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 mx-auto w-full max-w-5xl space-y-6 px-4 pb-8 pt-24 sm:px-6 lg:max-w-6xl lg:space-y-8"
      >
        <RecallHero
          title={title}
          classification={recall.classification}
          regulator={recall.regulator}
          country={recall.country}
          date={formattedDate}
        />

        <RecallActions
          title={title}
        />

        <RecallMetaGrid
          regulator={recall.regulator}
          country={recall.country}
          classification={recall.classification}
          date={formattedDate}
        />

        <RecallReason
          reason={recall.reason}
        />
      </motion.div>
    </main>
  );
}
