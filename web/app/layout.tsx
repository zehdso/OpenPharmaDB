import type { Metadata, Viewport } from "next";
import "./globals.css";

import { RecallProvider } from "@/components/RecallProvider";
import { ThemeProvider } from "@/components/providers/theme-provider";

export const metadata: Metadata = {
  title: "OpenPharmaDB",
  description: "Open pharmaceutical recalls database",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: "#E9EEF5",
    },
    {
      media: "(prefers-color-scheme: dark)",
      color: "#1D222B",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body
        style={{
          background: "var(--bg)",
          color: "var(--text)",
        }}
      >
        <ThemeProvider>
          <RecallProvider>{children}</RecallProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
