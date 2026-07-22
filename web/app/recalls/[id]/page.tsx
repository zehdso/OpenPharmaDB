import { promises as fs } from "fs";
import path from "path";

import type { Recall } from "@/lib/recalls";

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

async function loadRecalls(): Promise<Recall[]> {
  const file = path.join(process.cwd(), "public", "recalls.json");
  const json = await fs.readFile(file, "utf8");
  return JSON.parse(json);
}

export async function generateStaticParams() {
  const recalls = await loadRecalls();

  return recalls.map((recall) => ({
    id: recall.id,
  }));
}

export default async function RecallDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const recalls = await loadRecalls();
  const recall = recalls.find((r) => r.id === id);

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
            style={{ color: "var(--text-secondary)" }}
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

      <div className="relative z-10 mx-auto w-full max-w-5xl space-y-6 px-4 pb-8 pt-24 sm:px-6 lg:max-w-6xl lg:space-y-8">
        <RecallHero
          title={title}
          classification={recall.classification}
          regulator={recall.regulator}
          country={recall.country}
          date={formattedDate}
        />

        <RecallActions title={title} />

        <RecallMetaGrid
          regulator={recall.regulator}
          country={recall.country}
          classification={recall.classification}
          date={formattedDate}
        />

        <RecallReason reason={recall.reason} />
      </div>
    </main>
  );
}
