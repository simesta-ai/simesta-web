import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Continue with Simesta",
  description:
    "Create engaging courses with AI-generated content and illustrations in minutes.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
