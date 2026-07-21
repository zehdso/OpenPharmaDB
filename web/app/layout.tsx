import type { Metadata } from "next";
import "./globals.css";
import { RecallProvider } from "@/components/RecallProvider";

export const metadata: Metadata = {
  title: "OpenPharmaDB",
  description: "Open pharmaceutical recalls database",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <RecallProvider>
          {children}
        </RecallProvider>
      </body>
    </html>
  );
}
