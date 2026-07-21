"use client";

import Link from "next/link";
import { Recall } from "@/lib/recalls";

interface RecallsTableProps {
  recalls: Recall[];
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
}: RecallsTableProps) {
  return (
    <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full">
        <thead className="border-b bg-slate-100">
          <tr>
            <th className="px-6 py-4 text-left font-semibold">Product</th>
            <th className="px-6 py-4 text-left font-semibold">Regulator</th>
            <th className="px-6 py-4 text-left font-semibold">Classification</th>
            <th className="px-6 py-4 text-left font-semibold">Recall Date</th>
          </tr>
        </thead>

        <tbody>
          {recalls.map((recall) => (
            <tr
              key={recall.id}
              className="border-b transition hover:bg-slate-50"
            >
              <td className="max-w-lg px-6 py-4">
                <Link
                  href={`/recalls/${recall.id}`}
                  className="block"
                >
                  <div className="line-clamp-2 font-medium text-blue-700 hover:underline">
                    {recall.product || recall.title}
                  </div>
                </Link>
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                {recall.regulator}
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                {recall.classification}
              </td>

              <td className="px-6 py-4 whitespace-nowrap">
                {formatDate(recall.recall_date)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
