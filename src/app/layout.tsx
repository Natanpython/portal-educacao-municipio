import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RoboMascote from "@/components/ui/RoboMascote";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portal Educacional - Robótica",
  description: "Materiais didáticos de robótica e tecnologia para educação municipal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Header />
        <main className="min-h-screen">{children}</main>
        <RoboMascote />
        <Footer />
      </body>
    </html>
  );
}