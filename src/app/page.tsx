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
  Award,
  ExternalLink,
  CheckCircle2,
  Monitor,
  Laptop,
  HardDrive
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
    <div className="space-y-16 pb-16">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Core Interactive Tool Launch Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/pc-builder"
            className="p-6 rounded-3xl bg-gradient-to-br from-blue-600/10 via-card to-card border border-blue-500/20 shadow-md hover:border-blue-500 transition-all group"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-600/15 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold mb-4 group-hover:scale-110 transition-transform">
              <Cpu className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Flagship Configurator
            </div>
            <h3 className="text-lg font-black text-foreground mt-1">Gaming PC Builder</h3>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
              Build by budget or purpose with automated socket, DDR4/DDR5, wattage, and clearance checks.
            </p>
            <div className="mt-4 flex items-center text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform">
              <span>Start PC Build</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </Link>

          <Link
            href="/compare"
            className="p-6 rounded-3xl bg-gradient-to-br from-purple-600/10 via-card to-card border border-purple-500/20 shadow-md hover:border-purple-500 transition-all group"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-600/15 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold mb-4 group-hover:scale-110 transition-transform">
              <Scale className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
              Side-by-Side Matrix
            </div>
            <h3 className="text-lg font-black text-foreground mt-1">Product Comparison</h3>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
              Compare up to 4 products at once with winner badges, value ratings, and store pricing.
            </p>
            <div className="mt-4 flex items-center text-xs font-bold text-purple-600 dark:text-purple-400 group-hover:translate-x-1 transition-transform">
              <span>Compare Products</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </Link>

          <Link
            href="/fps-estimator"
            className="p-6 rounded-3xl bg-gradient-to-br from-amber-600/10 via-card to-card border border-amber-500/20 shadow-md hover:border-amber-500 transition-all group"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-600/15 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold mb-4 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
              Real Benchmarks
            </div>
            <h3 className="text-lg font-black text-foreground mt-1">FPS Estimator</h3>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
              Simulate Cyberpunk 2077, GTA VI, CS2 & Valorant frame rates across 1080p, 1440p, and 4K.
            </p>
            <div className="mt-4 flex items-center text-xs font-bold text-amber-600 dark:text-amber-400 group-hover:translate-x-1 transition-transform">
              <span>Estimate FPS</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </Link>

          <Link
            href="/ai-advisor"
            className="p-6 rounded-3xl bg-gradient-to-br from-cyan-600/10 via-card to-card border border-cyan-500/20 shadow-md hover:border-cyan-500 transition-all group"
          >
            <div className="w-12 h-12 rounded-2xl bg-cyan-600/15 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold mb-4 group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
              Natural Language Advisor
            </div>
            <h3 className="text-lg font-black text-foreground mt-1">AI Buying Advisor</h3>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
              Ask questions like "I have ₹80,000 for a gaming PC" and receive tailored hardware picks.
            </p>
            <div className="mt-4 flex items-center text-xs font-bold text-cyan-600 dark:text-cyan-400 group-hover:translate-x-1 transition-transform">
              <span>Ask AI Advisor</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </div>
          </Link>
        </div>
      </section>

      {/* 3. Trending Tech Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              <TrendingUp className="w-4 h-4" />
              <span>Tested & Verified Hardware</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground mt-1">
              Trending Tech Products
            </h2>
          </div>
          <Link
            href="/category/components"
            className="text-xs font-bold text-primary hover:underline flex items-center"
          >
            Browse All Catalog <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                className="p-5 rounded-3xl bg-card border border-border shadow-md hover:border-primary/50 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-primary uppercase">
                      {product.brand}
                    </span>
                    {product.badges && product.badges.length > 0 && (
                      <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
                        {product.badges[0]}
                      </span>
                    )}
                  </div>

                  <Link href={`/product/${product.slug}`}>
                    <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>

                  <p className="text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-1 text-amber-500 font-bold">
                      <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                      <span>{product.rating}</span>
                      <span className="text-muted-foreground font-normal">
                        ({product.reviewCount})
                      </span>
                    </div>
                    <span className="text-[11px] text-muted-foreground capitalize">
                      {product.subcategory.replace("-", " ")}
                    </span>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-muted-foreground">From:</div>
                    <div className="text-lg font-black text-foreground">
                      {formatPrice(price, currency)}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => addToCompare(product)}
                      className="p-2 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground"
                      title="Compare product"
                    >
                      <Scale className="w-4 h-4" />
                    </button>
                    <Link
                      href={`/product/${product.slug}`}
                      className="px-3.5 py-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs shadow-sm"
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
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              <Layers className="w-4 h-4" />
              <span>Independent Editorial Reviews</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground mt-1">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredGuides.map((guide) => (
            <Link
              key={guide.id}
              href={`/buying-guides/${guide.slug}`}
              className="p-5 rounded-3xl bg-card border border-border shadow-md hover:border-primary/50 transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <span className="text-primary font-bold capitalize">{guide.category}</span>
                  <span>•</span>
                  <span>{guide.readTime}</span>
                </div>
                <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors leading-snug">
                  {guide.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                  {guide.summary}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-border/80 flex items-center justify-between text-xs text-muted-foreground">
                <span>{guide.author.split(",")[0]}</span>
                <span className="font-bold text-primary flex items-center">
                  Read Guide <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. Live Deals & Sales Drop Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
              <ShoppingBag className="w-4 h-4" />
              <span>Festive & Limited-Time Discounts</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-foreground mt-1">
              Latest Price Drops
            </h2>
          </div>
          <Link
            href="/deals"
            className="text-xs font-bold text-primary hover:underline flex items-center"
          >
            View All Deals <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                className="p-5 rounded-3xl bg-card border border-border shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400">
                      {deal.saleEvent}
                    </span>
                    <span className="text-xs font-black px-2 py-0.5 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                      -{deal.discountPercentage}% OFF
                    </span>
                  </div>

                  <div className="text-xs font-bold text-muted-foreground uppercase">
                    {deal.retailer}
                  </div>
                  <h3 className="font-bold text-sm text-foreground mt-1 line-clamp-2">
                    {deal.title}
                  </h3>

                  <div className="mt-3 flex items-baseline space-x-2">
                    <span className="text-xl font-black text-foreground">
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
                    className="w-full flex items-center justify-center space-x-1 py-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs"
                  >
                    <span>Check {deal.retailer.split(" ")[0]} Deal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. High-Conversion SEO Cluster Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-blue-900/40 via-indigo-950/40 to-purple-950/40 border border-blue-500/30 text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
            Intelligent Tech Platform
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Ready to Configure Your Dream Setup?
          </h2>
          <p className="text-sm text-blue-100/80 max-w-xl mx-auto leading-relaxed">
            Validate component socket compatibility, calculate power supply requirements, preview game FPS, and compare multi-store pricing with zero guesswork.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/pc-builder"
              className="px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-sm shadow-lg shadow-primary/30 transition-transform hover:scale-105"
            >
              Launch PC Builder
            </Link>
            <Link
              href="/ai-advisor"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition-colors"
            >
              Ask AI Advisor
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
