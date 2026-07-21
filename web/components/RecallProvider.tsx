"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Recall } from "@/lib/recalls";

interface RecallContextValue {
  recalls: Recall[];
  loading: boolean;
  error: string | null;
}

const RecallContext = createContext<RecallContextValue>({
  recalls: [],
  loading: true,
  error: null,
});

export function RecallProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [recalls, setRecalls] = useState<Recall[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadRecalls() {
      try {
        const response = await fetch("/recalls.json");

        if (!response.ok) {
          throw new Error("Failed to load recalls");
        }

        const data: Recall[] = await response.json();
        setRecalls(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    }

    loadRecalls();
  }, []);

  const value = useMemo(
    () => ({
      recalls,
      loading,
      error,
    }),
    [recalls, loading, error]
  );

  return (
    <RecallContext.Provider value={value}>
      {children}
    </RecallContext.Provider>
  );
}

export function useRecalls() {
  return useContext(RecallContext);
}
