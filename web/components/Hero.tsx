"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  function handleSearch() {
    const query = search.trim();

    router.push(
      query
        ? `/recalls?search=${encodeURIComponent(query)}`
        : "/recalls"
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-14 text-center sm:px-6">
      <span
        className="inline-flex rounded-full px-4 py-1 text-sm font-medium"
        style={{
          background: "var(--surface)",
          color: "var(--accent)",
          boxShadow: "var(--shadow-soft)",
        }}
      >
        Trusted pharmaceutical recall database
      </span>

      <h1
        className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
        style={{
          color: "var(--text)",
        }}
      >
        Global Pharmaceutical
        <br />
        Safety Database
      </h1>

      <p
        className="mx-auto mt-5 max-w-2xl text-base leading-7 sm:text-lg"
        style={{
          color: "var(--text-secondary)",
        }}
      >
        Search official medicine recalls from trusted regulators worldwide.
        Fast, searchable, and always up to date.
      </p>

      <div className="mx-auto mt-8 flex max-w-3xl gap-3">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          placeholder="Search medicines, manufacturers, recalls..."
          className="flex-1 rounded-2xl px-5 py-4 text-base outline-none transition"
          style={{
            background: "var(--surface)",
            color: "var(--text)",
            boxShadow: "var(--shadow-inset)",
          }}
        />

        <Button
          onClick={handleSearch}
          variant="icon"
          className="h-14 w-14 shrink-0 rounded-full"
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>
    </section>
  );
}
