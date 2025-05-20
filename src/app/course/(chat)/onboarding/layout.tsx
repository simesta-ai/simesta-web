import { Metadata } from "next";

export const metadata: Metadata = {
  title: "How do you Learn",
  description:
    "Create engaging courses with AI-generated content and illustrations in minutes.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function OnboardingLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return <>{children}</>;
  }