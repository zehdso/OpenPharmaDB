"use client";

import Link from "next/link";
import RecallCard from "@/components/ui/RecallCard";
import { Recall } from "@/lib/recalls";

interface RecallsTableProps {
  recalls: Recall[];
  onSelect: (recall: Recall) => void;
}

function formatDate(date: string) {
  if (!date || date.length !== 8) return date;

  const year = Number(date.slice(0, 4));
  const month = Number(date.slice(4, 6)) - 1;
  const day = date.slice(6, 8);

  return `${day} ${new Date(year, month).toLocaleString(undefined, {
    month: "short",
  })} ${year}`;
}

export default function RecallsTable({
  recalls,
  onSelect,
}: RecallsTableProps) {
  return (
    <>
      <div className="space-y-5 lg:hidden">
        {recalls.map((recall) => (
          <Link
            key={recall.id}
            href={`/recalls/${recall.id}`}
            className="block"
          >
            <RecallCard
              recall={recall}
              onSelect={onSelect}
            />
          </Link>
        ))}
      </div>

      <div
        className="hidden overflow-hidden rounded-3xl lg:block"
        style={{
          background: "var(--card)",
          boxShadow: "var(--shadow-medium)",
        }}
      >
        <table className="min-w-full">
          <thead
            style={{
              background: "var(--surface)",
            }}
          >
            <tr>
              <th className="px-6 py-5 text-left text-sm font-semibold" style={{ color: "var(--text)" }}>Product</th>
              <th className="px-6 py-5 text-left text-sm font-semibold" style={{ color: "var(--text)" }}>Regulator</th>
              <th className="px-6 py-5 text-left text-sm font-semibold" style={{ color: "var(--text)" }}>Classification</th>
              <th className="px-6 py-5 text-left text-sm font-semibold" style={{ color: "var(--text)" }}>Date</th>
            </tr>
          </thead>

          <tbody>
            {recalls.map((recall) => (
              <tr
                key={recall.id}
                className="cursor-pointer transition-colors duration-200"
                style={{
                  borderTop:
                    "1px solid color-mix(in srgb, var(--text) 8%, transparent)",
                }}
                onClick={() => {
                  window.location.href = `/recalls/${recall.id}`;
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    "color-mix(in srgb, var(--surface) 85%, var(--accent) 15%)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                <td className="px-6 py-5 font-medium" style={{ color: "var(--text)" }}>
                  {recall.product || recall.title}
                </td>

                <td className="px-6 py-5" style={{ color: "var(--text-secondary)" }}>
                  {recall.regulator}
                </td>

                <td className="px-6 py-5" style={{ color: "var(--text-secondary)" }}>
                  {recall.classification}
                </td>

                <td className="whitespace-nowrap px-6 py-5" style={{ color: "var(--text-secondary)" }}>
                  {formatDate(recall.recall_date)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
