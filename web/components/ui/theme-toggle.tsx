"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Sparkles } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="h-10 w-10" />;
  }

  const themes = [
    {
      id: "light",
      icon: Sun,
      label: "Light",
    },
    {
      id: "dark",
      icon: Moon,
      label: "Dark",
    },
    {
      id: "soft",
      icon: Sparkles,
      label: "Soft",
    },
  ] as const;

  return (
    <div className="flex items-center rounded-[var(--radius-lg)] border border-border bg-card p-1 shadow-[var(--shadow-soft)]">
      {themes.map(({ id, icon: Icon, label }) => (
        <button
          key={id}
          onClick={() => setTheme(id)}
          title={label}
          className={`flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] transition-all ${
            theme === id
              ? "bg-accent text-white shadow-[var(--shadow-soft)]"
              : "text-muted hover:bg-surface"
          }`}
        >
          <Icon size={18} />
        </button>
      ))}
    </div>
  );
}
