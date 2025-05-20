import Header from "@/components/layout/Header";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - Simesta AI",
  description:
    "Create engaging courses with AI-generated content and illustrations in minutes.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative">
      <Header />
      {children}
    </main>
  );
}
