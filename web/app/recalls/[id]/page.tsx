"use client";

import { use } from "react";
import { useRecalls } from "@/components/RecallProvider";

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

  const recall = recalls.find((r) => r.id === id) ?? null;

  if (loading) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-16">
        Loading...
      </main>
    );
  }

  if (!recall) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-16">
        Recall not found.
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-4xl font-bold">
        {recall.product || recall.title}
      </h1>

      <div className="mt-10 space-y-6 rounded-3xl border bg-white p-8 shadow-sm">
        <Info label="Regulator" value={recall.regulator} />
        <Info label="Country" value={recall.country} />
        <Info label="Classification" value={recall.classification} />
        <Info label="Recall Date" value={formatDate(recall.recall_date)} />
        <Info label="Reason" value={recall.reason} />
      </div>
    </main>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: unknown;
}) {
  return (
    <div className="border-b pb-5 last:border-0">
      <div className="mb-1 text-sm font-medium text-slate-500">
        {label}
      </div>

      <div className="text-lg">
        {value ? String(value) : "—"}
      </div>
    </div>
  );
}
