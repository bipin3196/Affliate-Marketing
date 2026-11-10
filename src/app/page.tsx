"use client";

import React from "react";
import Link from "next/link";
import {
  Cpu,
  Scale,
  Zap,
  Sparkles,
  ShoppingBag,
  Layers,
  ArrowRight,
  TrendingUp,
  Star,
  ShieldCheck,
  ExternalLink
} from "lucide-react";
import { HeroSection } from "@/components/home/HeroSection";
import { PRODUCTS } from "@/data/products";
import { BUYING_GUIDES } from "@/data/buyingGuides";
import { ACTIVE_DEALS } from "@/data/deals";
import { useCurrencyStore } from "@/store/useCurrencyStore";
import { useComparisonStore } from "@/store/useComparisonStore";
import { formatPrice } from "@/lib/currency";

export default function HomePage() {
  const { currency, region } = useCurrencyStore();
  const { addToCompare } = useComparisonStore();

  const trendingProducts = PRODUCTS.slice(0, 6);
  const featuredGuides = BUYING_GUIDES.slice(0, 3);
  const hotDeals = ACTIVE_DEALS.slice(0, 3);

  return (
    <div className="space-y-14 pb-16">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Core Hardware Tool Launch Grid (Clean, high craft, no gradient washes) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/pc-builder"
            className="p-5 rounded-xl bg-card border border-border hover:border-blue-500/80 transition-all flex flex-col justify-between group shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
                <span>Configurator</span>
                <Cpu className="w-4 h-4 text-blue-500" />
              </div>
              <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                Gaming PC Builder
              </h3>
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                Step-by-step guided configuration with automated socket checks, DDR5/DDR4 validation, and wattage calculations.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-border/60 flex items-center text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:translate-x-0.5 transition-transform">
              <span>Start PC Build</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </Link>

          <Link
            href="/compare"
            className="p-5 rounded-xl bg-card border border-border hover:border-purple-500/80 transition-all flex flex-col justify-between group shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
                <span>Direct Matrix</span>
                <Scale className="w-4 h-4 text-purple-500" />
              </div>
              <h3 className="text-base font-bold text-foreground group-hover:text-purple-400 transition-colors">
                Product Comparison
              </h3>
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                Compare up to 4 components side-by-side with diff highlights, benchmark scores, and store price tracking.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-border/60 flex items-center text-xs font-semibold text-purple-500 group-hover:translate-x-0.5 transition-transform">
              <span>Compare Products</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </Link>

          <Link
            href="/fps-estimator"
            className="p-5 rounded-xl bg-card border border-border hover:border-amber-500/80 transition-all flex flex-col justify-between group shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
                <span>Lab Benchmarks</span>
                <Zap className="w-4 h-4 text-amber-500" />
              </div>
              <h3 className="text-base font-bold text-foreground group-hover:text-amber-400 transition-colors">
                FPS Estimator
              </h3>
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                Simulate Cyberpunk 2077, GTA VI, CS2 & Valorant frame rates across 1080p, 1440p, and 4K Ultra presets.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-border/60 flex items-center text-xs font-semibold text-amber-500 group-hover:translate-x-0.5 transition-transform">
              <span>Estimate Game FPS</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </Link>

          <Link
            href="/ai-advisor"
            className="p-5 rounded-xl bg-card border border-border hover:border-cyan-500/80 transition-all flex flex-col justify-between group shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
                <span>AI Buying Agent</span>
                <Sparkles className="w-4 h-4 text-cyan-500" />
              </div>
              <h3 className="text-base font-bold text-foreground group-hover:text-cyan-400 transition-colors">
                AI Buying Advisor
              </h3>
              <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                Ask natural questions (*"I have ₹80,000 for a gaming PC"*) and receive tailored hardware recommendations.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-border/60 flex items-center text-xs font-semibold text-cyan-500 group-hover:translate-x-0.5 transition-transform">
              <span>Ask Advisor</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </div>
          </Link>
        </div>
      </section>

      {/* 3. Trending Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="text-xs font-mono font-semibold text-primary uppercase tracking-wider">
              Hardware Directory
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-foreground mt-0.5">
              Tested & Verified Tech Products
            </h2>
          </div>
          <Link
            href="/category/components"
            className="text-xs font-bold text-primary hover:underline flex items-center"
          >
            Browse All <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {trendingProducts.map((product) => {
            const price =
              currency === "INR"
                ? product.basePriceINR
                : currency === "AUD"
                ? product.basePriceAUD
                : product.basePriceUSD;

            return (
              <div
                key={product.id}
                className="p-4 sm:p-5 rounded-xl bg-card border border-border hover:border-primary/60 transition-all flex flex-col justify-between group shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono font-bold text-primary uppercase">
                      {product.brand}
                    </span>
                    {product.badges && product.badges.length > 0 && (
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-secondary text-foreground">
                        {product.badges[0]}
                      </span>
                    )}
                  </div>

                  <Link href={`/product/${product.slug}`}>
                    <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>

                  <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="mt-3 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-1 text-amber-500 font-mono font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      <span>{product.rating}</span>
                      <span className="text-muted-foreground font-normal">
                        ({product.reviewCount})
                      </span>
                    </div>
                    <span className="text-[11px] text-muted-foreground font-mono capitalize">
                      {product.subcategory.replace("-", " ")}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border/80 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-mono text-muted-foreground">From:</div>
                    <div className="text-base font-black font-mono text-foreground">
                      {formatPrice(price, currency)}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => addToCompare(product)}
                      className="p-2 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground transition-colors"
                      title="Compare product"
                    >
                      <Scale className="w-3.5 h-3.5" />
                    </button>
                    <Link
                      href={`/product/${product.slug}`}
                      className="px-3.5 py-1.5 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs"
                    >
                      View Deals
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. Popular Buying Guides Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="text-xs font-mono font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              Editorial Lab
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-foreground mt-0.5">
              Popular Buying Guides
            </h2>
          </div>
          <Link
            href="/buying-guides"
            className="text-xs font-bold text-primary hover:underline flex items-center"
          >
            All Guides <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featuredGuides.map((guide) => (
            <Link
              key={guide.id}
              href={`/buying-guides/${guide.slug}`}
              className="p-5 rounded-xl bg-card border border-border hover:border-primary/60 transition-all flex flex-col justify-between group shadow-sm"
            >
              <div className="space-y-2.5">
                <div className="flex items-center space-x-2 text-[11px] font-mono text-muted-foreground">
                  <span className="text-primary font-bold capitalize">{guide.category}</span>
                  <span>•</span>
                  <span>{guide.readTime}</span>
                </div>
                <h3 className="font-bold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors leading-snug">
                  {guide.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                  {guide.summary}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-border/80 flex items-center justify-between text-xs text-muted-foreground">
                <span>{guide.author.split(",")[0]}</span>
                <span className="font-bold text-primary flex items-center text-xs">
                  Read Guide <ArrowRight className="w-3 h-3 ml-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Live Deals Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="text-xs font-mono font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
              Price Drops
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-foreground mt-0.5">
              Verified Retailer Deals
            </h2>
          </div>
          <Link
            href="/deals"
            className="text-xs font-bold text-primary hover:underline flex items-center"
          >
            View All Deals <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {hotDeals.map((deal) => {
            const currentPrice =
              currency === "INR"
                ? deal.dealPriceINR
                : currency === "AUD"
                ? deal.dealPriceAUD
                : deal.dealPriceUSD;

            const originalPrice =
              currency === "INR"
                ? deal.originalPriceINR
                : currency === "AUD"
                ? deal.originalPriceAUD
                : deal.originalPriceUSD;

            return (
              <div
                key={deal.id}
                className="p-5 rounded-xl bg-card border border-border shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-rose-500/10 text-rose-600 dark:text-rose-400">
                      {deal.saleEvent}
                    </span>
                    <span className="text-xs font-mono font-black text-emerald-600">
                      -{deal.discountPercentage}% OFF
                    </span>
                  </div>

                  <div className="text-[11px] font-mono text-muted-foreground uppercase">
                    {deal.retailer}
                  </div>
                  <h3 className="font-bold text-sm text-foreground mt-1 line-clamp-2">
                    {deal.title}
                  </h3>

                  <div className="mt-3 flex items-baseline space-x-2 font-mono">
                    <span className="text-lg font-black text-foreground">
                      {formatPrice(currentPrice, currency)}
                    </span>
                    <span className="text-xs text-muted-foreground line-through">
                      {formatPrice(originalPrice, currency)}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border">
                  <a
                    href={deal.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center space-x-1 py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs"
                  >
                    <span>Check Store Price</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. Clean, Restrained CTA Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-2xl bg-card border border-border text-center space-y-3">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-primary">
            Next-Gen PC Configurator
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
            Configure Your Build Without Bottlenecks
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto leading-relaxed">
            Automated socket checks, DDR5 validation, transient power headroom calculations, and multi-store pricing across verified retailers.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/pc-builder"
              className="px-5 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs shadow-sm"
            >
              Open PC Builder
            </Link>
            <Link
              href="/compare"
              className="px-5 py-2.5 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground font-bold text-xs border border-border"
            >
              Compare Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
