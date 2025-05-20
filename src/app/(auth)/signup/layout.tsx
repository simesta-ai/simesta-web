import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create an account",
  description:
    "Create engaging courses with AI-generated content and illustrations in minutes.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function SignupLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
