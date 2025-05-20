import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative">
      <Header />
      {children}
      <Footer/>
    </main>
  );
}
