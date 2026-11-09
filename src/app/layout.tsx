import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "TechAdvisor AI - Gaming PC Builder, Price Comparison & Technology Recommendations",
  description:
    "The PCPartPicker + TechRadar + PriceRunner for Australia and India. Intelligent technology recommendations, gaming PC configurator, live price tracking across 14+ stores, and FPS estimator.",
  keywords: [
    "TechAdvisor AI",
    "PC Builder India",
    "PC Builder Australia",
    "PCPartPicker Alternative",
    "RTX 4070 Super Price",
    "Ryzen 7 7800X3D Price Comparison",
    "Best Gaming Laptops 2026",
    "FPS Estimator Cyberpunk 2077"
  ],
  authors: [{ name: "TechAdvisor AI Hardware Labs" }],
  openGraph: {
    title: "TechAdvisor AI - Technology Discovery & Gaming PC Builder",
    description: "Compare prices, validate compatibility, and discover top tech across Australia and India.",
    type: "website",
    locale: "en_AU",
    url: "https://techadvisor.ai",
    siteName: "TechAdvisor AI",
  },
  twitter: {
    card: "summary_large_image",
    title: "TechAdvisor AI - The Definitive Technology Decision Platform",
    description: "Intelligent PC Builder, 4-Way Product Comparison, and Real-Time Multi-Retailer Price Drops.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
