import { ReactNode } from "react";
import { PageHeader } from "@/components/layout/PageHeader";

interface AppLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export default function AppLayout({
  children,
  title,
  subtitle,
}: AppLayoutProps) {
  return (
    <main className="min-h-screen bg-background">
      <PageHeader
        title={title}
        subtitle={subtitle}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        {children}
      </div>
    </main>
  );
}
