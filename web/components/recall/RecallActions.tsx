"use client";

import { motion } from "framer-motion";
import { useState } from "react";

type Props = {
  title: string;
};

export default function RecallActions({ title }: Props) {
  const [copied, setCopied] = useState(false);
  const [sharing, setSharing] = useState(false);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      alert("Unable to copy link.");
    }
  }

  async function share() {
    if (sharing) return;

    setSharing(true);

    try {
      if (navigator.share) {
        await navigator.share({
          title,
          url: window.location.href,
        });
      } else {
        copyLink();
      }
    } finally {
      setSharing(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.35,
      }}
      className="flex flex-wrap gap-4"
    >
      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={share}
        className="rounded-2xl px-6 py-3 font-semibold transition"
        style={{
          background: "var(--accent)",
          color: "#ffffff",
          boxShadow: "var(--shadow-medium)",
        }}
      >
        {sharing ? "Sharing..." : "Share"}
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={copyLink}
        className="rounded-2xl px-6 py-3 font-semibold transition"
        style={{
          background: "var(--surface)",
          color: "var(--text)",
          boxShadow: "var(--shadow-soft)",
        }}
      >
        {copied ? "✓ Copied" : "Copy Link"}
      </motion.button>
    </motion.div>
  );
}
