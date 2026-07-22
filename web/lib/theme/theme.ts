export const theme = {
  radius: {
    sm: "12px",
    md: "18px",
    lg: "24px",
    xl: "32px",
  },

  shadow: {
    soft:
      "0 4px 12px rgba(15,23,42,.06), 0 1px 2px rgba(15,23,42,.04)",

    medium:
      "0 10px 30px rgba(15,23,42,.08), 0 2px 6px rgba(15,23,42,.05)",

    floating:
      "0 24px 60px rgba(15,23,42,.14)",
  },

  light: {
    background: "#F3F5F9",

    surface: "#F8FAFC",

    card: "#F6F8FB",

    text: "#0F172A",

    secondary: "#64748B",

    border: "#E2E8F0",

    accent: "#2563EB",
  },

  dark: {
    background: "#0D1117",

    surface: "#161B22",

    card: "#1C2128",

    text: "#F8FAFC",

    secondary: "#94A3B8",

    border: "#30363D",

    accent: "#60A5FA",
  },

  soft: {
    background: "#E9EEF5",

    surface: "#EEF3F9",

    card: "#F4F7FB",

    text: "#0F172A",

    secondary: "#64748B",

    border: "#DCE3EC",

    accent: "#2563EB",
  },
};

export type Theme = keyof Omit<typeof theme, "radius" | "shadow">;
