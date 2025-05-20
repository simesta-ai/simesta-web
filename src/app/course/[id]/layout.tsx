import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Course",
  description:
    "Create engaging courses with AI-generated content and illustrations in minutes.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function CourseLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return <>{children}</>;
  }