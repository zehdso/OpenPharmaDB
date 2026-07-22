"use client";

import { motion } from "framer-motion";

type Props = {
  reason: string;
};

export default function RecallReason({ reason }: Props) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.45,
        delay: 0.18,
      }}
      className="rounded-2xl p-5 md:rounded-3xl md:p-8"
      style={{
        background: "var(--card)",
        boxShadow: "var(--shadow-soft)",
      }}
    >
      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xl"
          style={{
            background: "var(--surface)",
            boxShadow: "var(--shadow-soft)",
          }}
        >
          📄
        </div>

        <div>
          <p
            className="text-[10px] font-semibold uppercase tracking-[0.2em] md:text-xs"
            style={{ color: "var(--text-secondary)" }}
          >
            Details
          </p>

          <h2
            className="text-xl font-bold md:text-2xl"
            style={{ color: "var(--text)" }}
          >
            Reason for Recall
          </h2>
        </div>
      </div>

      <div
        className="mt-5 border-l-4 pl-4 md:pl-6"
        style={{ borderColor: "var(--accent)" }}
      >
        <p
          className="whitespace-pre-wrap break-words text-[15px] leading-7 md:text-base"
          style={{ color: "var(--text-secondary)" }}
        >
          {reason || "No reason was provided by the regulator."}
        </p>
      </div>
    </motion.section>
  );
}
