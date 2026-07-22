"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const updates = [
  "3 new recalls added today",
  "FDA dataset refreshed",
  "Health Canada dataset refreshed",
  "Database synchronized successfully",
];

export default function WhatsNew() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-6 sm:px-6">
      <div
        className="rounded-3xl p-6"
        style={{
          background: "var(--card)",
          boxShadow: "var(--shadow-medium)",
        }}
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p
              className="text-sm font-medium"
              style={{ color: "var(--accent)" }}
            >
              Activity
            </p>

            <h2
              className="mt-1 text-2xl font-bold"
              style={{ color: "var(--text)" }}
            >
              What's New
            </h2>
          </div>

          <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
            Live
          </span>
        </div>

        <div className="space-y-3">
          {updates.map((update, index) => (
            <motion.div
              key={update}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.3,
                delay: index * 0.08,
              }}
              className="rounded-2xl px-4 py-4 transition-all duration-200 hover:shadow-[var(--shadow-medium)]"
              style={{
                background: "var(--surface)",
                boxShadow: "var(--shadow-soft)",
              }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full"
                  style={{
                    background: "var(--surface)",
                    boxShadow: "var(--shadow-soft)",
                  }}
                >
                  <CheckCircle2
                    className="h-5 w-5"
                    style={{ color: "#16A34A" }}
                  />
                </div>

                <div className="flex-1">
                  <p
                    className="font-medium"
                    style={{ color: "var(--text)" }}
                  >
                    {update}
                  </p>

                  <p
                    className="mt-1 text-sm"
                    style={{
                      color: "var(--text-secondary)",
                    }}
                  >
                    Recently synchronized from official sources
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
