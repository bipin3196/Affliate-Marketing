"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, Sparkles, TrendingUp, Cpu, ShieldCheck, Zap } from "lucide-react";
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
    <div className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-border/50 bg-gradient-to-b from-blue-500/5 via-background to-background">
      {/* Background Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-500/10 dark:bg-blue-600/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[250px] bg-cyan-500/10 dark:bg-cyan-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge Pill */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 text-xs font-bold tracking-wide uppercase mb-6 animate-pulse">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Definitive Tech Buying Engine • 2026 Edition</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground max-w-4xl mx-auto leading-[1.15]">
          Find the Right Tech. <br />
          <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500 bg-clip-text text-transparent">
            Build Without Bottlenecks.
          </span>{" "}
          Buy at the Lowest Price.
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          The all-in-one platform combining PCPartPicker compatibility checks, TechRadar lab insights, RTINGS spec benchmarks, and live multi-retailer price tracking across {region === "AU" ? "Australia" : "India"}.
        </p>

        {/* Search Bar Container */}
        <div className="mt-8 max-w-2xl mx-auto">
          <form
            onSubmit={handleSearch}
            className="relative flex items-center bg-card shadow-2xl shadow-blue-500/10 border-2 border-border/80 focus-within:border-primary rounded-2xl p-2 transition-all"
          >
            <div className="pl-3.5 text-muted-foreground">
              <Search className="w-5 h-5" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What technology are you looking for?"
              className="w-full bg-transparent border-none py-3 px-3 text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm px-6 py-3 rounded-xl transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-primary/25 shrink-0"
            >
              Search
            </button>
          </form>

          {/* Quick Click Suggestion Pills */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs text-muted-foreground font-medium flex items-center">
              <TrendingUp className="w-3.5 h-3.5 mr-1 text-blue-500" /> Examples:
            </span>
            {sampleQueries.map((item, idx) => (
              <button
                key={idx}
                onClick={() => router.push(item.href)}
                className="text-xs font-semibold px-3 py-1 rounded-full bg-secondary/80 hover:bg-secondary text-foreground border border-border/80 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Highlights Row */}
        <div className="mt-12 pt-8 border-t border-border/40 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
          <div className="flex items-center space-x-3 p-3 rounded-xl bg-card/60 border border-border/60">
            <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center font-bold">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-foreground">Socket Checks</div>
              <div className="text-[11px] text-muted-foreground">AM5, LGA1700, DDR5</div>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 rounded-xl bg-card/60 border border-border/60">
            <div className="w-9 h-9 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center font-bold">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-foreground">FPS Estimator</div>
              <div className="text-[11px] text-muted-foreground">Cyberpunk, GTA VI, CS2</div>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 rounded-xl bg-card/60 border border-border/60">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-foreground">Price History</div>
              <div className="text-[11px] text-muted-foreground">30d, 90d, 1yr Lows</div>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 rounded-xl bg-card/60 border border-border/60">
            <div className="w-9 h-9 rounded-lg bg-cyan-500/10 text-cyan-500 flex items-center justify-center font-bold">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-foreground">Multi-Store Tracker</div>
              <div className="text-[11px] text-muted-foreground">
                {region === "AU" ? "AU Authorized Stores" : "Amazon IN, MD, Prime"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
