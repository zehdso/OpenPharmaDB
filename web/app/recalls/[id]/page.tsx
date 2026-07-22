"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { PageHeader } from "@/components/layout/PageHeader";
import { useRecalls } from "@/components/RecallProvider";
import RecallDetails from "@/components/recalls/RecallDetails";

export default function RecallPage() {
  const { id } = useParams<{ id: string }>();
  const { recalls, loading, error } = useRecalls();

  const recall = recalls.find((r) => r.id === id);

  return (
    <main
      className="min-h-screen"
      style={{ background: "var(--bg)" }}
    >
      <PageHeader
        title="Recall Details"
        subtitle="Pharmaceutical recall information"
      />

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <Link
            href="/recalls"
            className="rounded-full px-5 py-2 text-sm font-medium transition-all"
            style={{
              background: "var(--surface)",
              color: "var(--text)",
              boxShadow: "var(--shadow-soft)",
            }}
          >
            ← Back to recalls
          </Link>
        </div>

        {loading && (
          <p style={{ color: "var(--text-secondary)" }}>
            Loading recalls...
          </p>
        )}

        {error && (
          <p className="text-red-600">{error}</p>
        )}

        {!loading && !error && !recall && (
          <p style={{ color: "var(--text-secondary)" }}>
            Recall not found.
          </p>
        )}

        {!loading && !error && recall && (
          <RecallDetails recall={recall} />
        )}
      </section>
    </main>
  );
}
