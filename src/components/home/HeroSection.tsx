"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, ShieldCheck, Cpu, Zap, TrendingDown } from "lucide-react";
import { useCurrencyStore } from "@/store/useCurrencyStore";

export function HeroSection() {
  const router = useRouter();
  const { currency, region } = useCurrencyStore();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const sampleQueries = [
    { label: "Best Gaming Laptop", href: "/buying-guides/best-gaming-laptops" },
    {
      label: currency === "INR" ? "Gaming PC Under ₹75,000" : currency === "AUD" ? "Gaming PC Under A$1,500" : "Gaming PC Under $1,000",
      href: "/buying-guides/best-gaming-pc-under-75000"
    },
    { label: "Best Docking Station", href: "/buying-guides/best-docking-station" },
    { label: "Best NAS Device", href: "/buying-guides/best-nas-device" },
    { label: "RTX 4070 Super Deals", href: "/deals" },
    { label: "Cyberpunk 2077 FPS Test", href: "/fps-estimator" }
  ];

  return (
    <div className="relative border-b border-border bg-card/30 pt-10 pb-12 lg:pt-16 lg:pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        {/* Subtle, restrained label */}
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-secondary/80 border border-border text-[11px] font-mono text-muted-foreground uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
          <span>Independent Hardware Lab • 2026 Edition</span>
        </div>

        {/* High-Craft Editorial Headline (No rainbow gradient) */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground max-w-4xl mx-auto leading-[1.12]">
          Discover Hardware. Validate Compatibility. Buy at the Verified Lowest Price.
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          The PCPartPicker compatibility engine meets RTINGS benchmark rigor and live multi-retailer price tracking across {region === "AU" ? "Australia" : "India"}.
        </p>

        {/* Search Bar Container */}
        <div className="max-w-2xl mx-auto pt-2">
          <form
            onSubmit={handleSearch}
            className="flex items-center bg-card border border-border focus-within:border-primary focus-within:ring-1 focus-within:ring-primary rounded-xl p-1.5 transition-all shadow-sm"
          >
            <div className="pl-3 text-muted-foreground">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What technology are you looking for? (e.g. RTX 4070, Gaming Laptop)"
              className="w-full bg-transparent border-none py-2.5 px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs px-5 py-2.5 rounded-lg transition-transform active:scale-[0.98] shrink-0"
            >
              Search
            </button>
          </form>

          {/* Quick Click Suggestion Pills */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 text-xs">
            <span className="text-muted-foreground text-[11px] font-mono mr-1">Popular:</span>
            {sampleQueries.map((item, idx) => (
              <button
                key={idx}
                onClick={() => router.push(item.href)}
                className="text-[11px] px-2.5 py-0.5 rounded-md bg-secondary/60 hover:bg-secondary text-muted-foreground hover:text-foreground border border-border/60 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Hardware Feature Strip (Clean, high-density, no floating icon tiles) */}
        <div className="pt-8 border-t border-border/60 grid grid-cols-2 md:grid-cols-4 gap-4 text-left font-mono">
          <div className="p-3 rounded-lg bg-card border border-border/80">
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
              Socket Checker
            </div>
            <div className="text-xs font-bold text-foreground mt-0.5">
              AM5, LGA1700, DDR5
            </div>
          </div>

          <div className="p-3 rounded-lg bg-card border border-border/80">
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
              FPS Estimator
            </div>
            <div className="text-xs font-bold text-foreground mt-0.5">
              Real 1% Lows & 4K Ultra
            </div>
          </div>

          <div className="p-3 rounded-lg bg-card border border-border/80">
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
              Price History
            </div>
            <div className="text-xs font-bold text-foreground mt-0.5">
              30d, 90d, 1-Year Lows
            </div>
          </div>

          <div className="p-3 rounded-lg bg-card border border-border/80">
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
              Store Network
            </div>
            <div className="text-xs font-bold text-foreground mt-0.5">
              {region === "AU" ? "Scorptec, Centre Com, Mwave" : "Amazon IN, MD, PrimeABGB"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
