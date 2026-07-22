"use client";

import { motion } from "framer-motion";

type Props = {
  regulator: string;
  country: string;
  classification: string;
  date: string;
};

type Item = {
  label: string;
  value: string;
  span: string;
};

export default function RecallMetaGrid({
  regulator,
  country,
  classification,
  date,
}: Props) {
  const items: Item[] = [
    {
      label: "Classification",
      value: classification || "—",
      span: "col-span-2 md:col-span-8",
    },
    {
      label: "Regulator",
      value: regulator || "—",
      span: "col-span-1 md:col-span-4",
    },
    {
      label: "Country",
      value: country || "—",
      span: "col-span-1 md:col-span-4",
    },
    {
      label: "Recall Date",
      value: date || "—",
      span: "col-span-1 md:col-span-4",
    },
  ];

  return (
    <section className="grid grid-cols-2 gap-4 md:grid-cols-12 md:gap-6">
      {items.map((item, index) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: index * 0.06,
            duration: 0.4,
          }}
          whileHover={{ y: -3 }}
          className={`${item.span} group rounded-2xl p-4 transition-all md:rounded-3xl md:p-6 hover:shadow-[var(--shadow-medium)]`}
          style={{
            background: "var(--card)",
            boxShadow: "var(--shadow-soft)",
          }}
        >
          <div
            className="text-[10px] font-semibold uppercase tracking-[0.18em] md:text-xs"
            style={{
              color: "var(--text-secondary)",
            }}
          >
            {item.label}
          </div>

          <div
            className={`mt-3 break-words font-bold ${
              item.label === "Classification"
                ? "text-2xl md:text-3xl"
                : "text-lg md:text-2xl"
            }`}
            style={{
              color: "var(--text)",
            }}
          >
            {item.value}
          </div>

          <div
            className="mt-4 h-1 overflow-hidden rounded-full"
            style={{
              background: "color-mix(in srgb, var(--text) 10%, transparent)",
            }}
          >
            <div
              className="h-full w-0 rounded-full transition-all duration-500 group-hover:w-full"
              style={{
                background: "var(--accent)",
              }}
            />
          </div>
        </motion.div>
      ))}
    </section>
  );
}
