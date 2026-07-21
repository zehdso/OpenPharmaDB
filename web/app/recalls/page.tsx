"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
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
    const query = searchParams.get("search") ?? "";
    setSearch(query);
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

      const matchesRegulator =
        !regulator || recall.regulator === regulator;

      const matchesClassification =
        !classification || recall.classification === classification;

      const matchesCountry =
        !country || recall.country === country;

      return (
        matchesSearch &&
        matchesRegulator &&
        matchesClassification &&
        matchesCountry
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
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-7xl px-6 py-16">
        <h1 className="text-4xl font-bold text-slate-900">
          Recalls Database
        </h1>

        <p className="mt-4 text-lg text-slate-600">
          Browse and search pharmaceutical recalls.
        </p>

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

        <p className="mb-6 text-sm text-slate-500">
          Showing {visibleRecalls.length.toLocaleString()} of{" "}
          {filteredRecalls.length.toLocaleString()} recall(s)
        </p>

        {loading && (
          <p className="text-slate-500">
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
                    setVisibleCount((count) => count + PAGE_SIZE)
                  }
                  className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
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
