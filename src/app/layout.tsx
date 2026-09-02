import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AssistentePortal from "@/components/ui/AssistentePortal";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EduPortal - Secretaria de Educação",
  description: "Portal educacional com materiais didáticos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen pt-16 md:pt-20">{children}</main>
        <Footer />
        <AssistentePortal />
      </body>
    </html>
  );
}
