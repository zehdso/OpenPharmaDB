"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import { PageHeader } from "@/components/layout/PageHeader";
import { useRecalls } from "@/components/RecallProvider";

import RecallsTable from "@/components/recalls/RecallsTable";
import SearchBar from "@/components/recalls/SearchBar";
import FilterBar from "@/components/recalls/FilterBar";

const PAGE_SIZE = 50;

export default function RecallsPage() {
  const { recalls, loading, error } = useRecalls();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(
    searchParams.get("search") ?? ""
  );

  const [regulator, setRegulator] = useState("");
  const [classification, setClassification] = useState("");
  const [country, setCountry] = useState("");

  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    setSearch(searchParams.get("search") ?? "");
  }, [searchParams]);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [search, regulator, classification, country]);

  const sortedRecalls = useMemo(
    () =>
      [...recalls].sort((a, b) =>
        b.recall_date.localeCompare(a.recall_date)
      ),
    [recalls]
  );

  const regulators = useMemo(
    () =>
      [...new Set(sortedRecalls.map((r) => r.regulator))]
        .filter(Boolean)
        .sort(),
    [sortedRecalls]
  );

  const classifications = useMemo(
    () =>
      [...new Set(sortedRecalls.map((r) => r.classification))]
        .filter(Boolean)
        .sort(),
    [sortedRecalls]
  );

  const countries = useMemo(
    () =>
      [...new Set(sortedRecalls.map((r) => r.country))]
        .filter(Boolean)
        .sort(),
    [sortedRecalls]
  );

  const filteredRecalls = useMemo(() => {
    const query = search.trim().toLowerCase();

    return sortedRecalls.filter((recall) => {
      const matchesSearch =
        !query ||
        (recall.product ?? "").toLowerCase().includes(query) ||
        (recall.title ?? "").toLowerCase().includes(query) ||
        (recall.regulator ?? "").toLowerCase().includes(query);

      return (
        matchesSearch &&
        (!regulator || recall.regulator === regulator) &&
        (!classification || recall.classification === classification) &&
        (!country || recall.country === country)
      );
    });
  }, [
    sortedRecalls,
    search,
    regulator,
    classification,
    country,
  ]);

  const visibleRecalls = filteredRecalls.slice(0, visibleCount);

  return (
    <main
      className="min-h-screen"
      style={{ background: "var(--bg)" }}
    >
      <PageHeader
        title="Recalls"
        subtitle="Browse and search pharmaceutical recalls"
      />

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mt-8">
          <SearchBar
            value={search}
            onChange={setSearch}
          />

          <FilterBar
            regulators={regulators}
            classifications={classifications}
            countries={countries}
            regulator={regulator}
            classification={classification}
            country={country}
            onRegulatorChange={setRegulator}
            onClassificationChange={setClassification}
            onCountryChange={setCountry}
          />
        </div>

        <p
          className="mb-6 text-sm"
          style={{
            color: "var(--text-secondary)",
          }}
        >
          Showing {visibleRecalls.length.toLocaleString()} of{" "}
          {filteredRecalls.length.toLocaleString()} recall(s)
        </p>

        {loading && (
          <p
            style={{
              color: "var(--text-secondary)",
            }}
          >
            Loading recalls...
          </p>
        )}

        {error && (
          <p className="text-red-600">
            {error}
          </p>
        )}

        {!loading && !error && (
          <>
            <RecallsTable recalls={visibleRecalls} />

            {visibleCount < filteredRecalls.length && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() =>
                    setVisibleCount((v) => v + PAGE_SIZE)
                  }
                  className="rounded-full px-6 py-3 font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-floating)] active:scale-95"
                  style={{
                    background: "var(--accent)",
                    color: "#ffffff",
                    boxShadow: "var(--shadow-medium)",
                  }}
                >
                  Load 50 More
                </button>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}
