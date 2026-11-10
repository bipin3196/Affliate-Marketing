"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  CheckCircle2,
  XCircle,
  Scale,
  Cpu,
  Share2,
  ExternalLink,
  ChevronDown,
  HelpCircle,
  Bookmark,
  ShieldCheck,
  Award,
  Zap,
} from "lucide-react";
import { Product } from "@/types";
import { useCurrencyStore } from "@/store/useCurrencyStore";
import { useComparisonStore } from "@/store/useComparisonStore";
import { usePCBuilderStore } from "@/store/usePCBuilderStore";
import { useUserStore } from "@/store/useUserStore";
import { PriceComparisonTable } from "./PriceComparisonTable";
import { PriceHistoryChart } from "./PriceHistoryChart";
import { formatPrice } from "@/lib/currency";
import {
  generateProductSchema,
  generateReviewSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
} from "@/lib/schema";

interface ProductDetailViewProps {
  product: Product;
}

export function ProductDetailView({ product }: ProductDetailViewProps) {
  const { currency, region } = useCurrencyStore();
  const { addToCompare, isInCompare } = useComparisonStore();
  const { setPart } = usePCBuilderStore();
  const { toggleBookmark, isBookmarked } = useUserStore();

  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(0);
  const [selectedImage, setSelectedImage] = useState<string>(product.images[0]);
  const [shareFeedback, setShareFeedback] = useState(false);

  const price =
    currency === "INR"
      ? product.basePriceINR
      : currency === "AUD"
      ? product.basePriceAUD
      : product.basePriceUSD;

  const currentUrl = typeof window !== "undefined" ? window.location.href : `https://techadvisor.ai/product/${product.slug}`;

  // Structured Data Schemas
  const productSchema = generateProductSchema(product, currentUrl);
  const reviewSchema = generateReviewSchema(product);
  const faqSchema = generateFAQSchema(product.faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://techadvisor.ai" },
    { name: product.category, url: `https://techadvisor.ai/category/${product.category}` },
    { name: product.name, url: currentUrl },
  ]);

  const handleShare = () => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setShareFeedback(true);
      setTimeout(() => setShareFeedback(false), 2000);
    }
  };

  return (
    <>
      {/* Search Engine Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />
      {product.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs text-muted-foreground font-mono">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link href={`/category/${product.category}`} className="capitalize hover:text-foreground">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-foreground truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Product Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left: Image Showcase */}
          <div className="space-y-3">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-secondary/20 border border-border flex items-center justify-center p-6 shadow-xs">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover rounded-lg"
              />
              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                {product.badges?.map((badge, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-foreground text-background font-semibold"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Thumbnail switcher */}
            {product.images.length > 1 && (
              <div className="flex items-center space-x-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(img)}
                    className={`w-16 h-12 rounded-lg overflow-hidden border transition-colors ${
                      selectedImage === img
                        ? "border-foreground"
                        : "border-border opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details & Buying Actions */}
          <div className="space-y-5">
            <div>
              <div className="flex items-center space-x-2 text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                <span>{product.brand}</span>
                <span>/</span>
                <span className="capitalize">{product.subcategory.replace("-", " ")}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground mt-1 tracking-tight leading-snug">
                {product.name}
              </h1>

              {/* Star Rating & Review Count */}
              <div className="mt-2 flex items-center space-x-3 text-xs">
                <div className="flex items-center space-x-1 font-mono font-bold text-foreground">
                  <Star className="w-3.5 h-3.5 fill-foreground text-foreground" />
                  <span>{product.rating}</span>
                </div>
                <span className="text-muted-foreground font-mono text-[11px]">
                  ({product.reviewCount.toLocaleString()} verified ratings)
                </span>
                <span className="text-muted-foreground">·</span>
                <span className="text-emerald-500 font-mono text-[11px] flex items-center">
                  <ShieldCheck className="w-3 h-3 mr-1" /> Lab Tested
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Price Box */}
            <div className="p-4 rounded-xl bg-card border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
              <div>
                <div className="text-[11px] font-mono uppercase text-muted-foreground">
                  Lowest Tracked Retailer Price
                </div>
                <div className="text-2xl sm:text-3xl font-mono font-black text-foreground mt-0.5">
                  {formatPrice(price, currency)}
                </div>
                <div className="text-[11px] text-muted-foreground font-mono mt-0.5">
                  Tax inclusive · Regional shipping available
                </div>
              </div>

              <a
                href={product.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-1.5 px-4 py-2.5 rounded-lg bg-foreground hover:bg-foreground/90 text-background font-semibold text-xs transition-colors shrink-0"
              >
                <span>View Retailer Deals</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {product.pcPartType && (
                <button
                  onClick={() => setPart(product.pcPartType!, product)}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground font-medium text-xs border border-border transition-colors"
                >
                  <Cpu className="w-3.5 h-3.5 text-muted-foreground" />
                  <span>Add to PC Builder</span>
                </button>
              )}

              <button
                onClick={() => addToCompare(product)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg font-medium text-xs border transition-colors ${
                  isInCompare(product.id)
                    ? "bg-foreground text-background border-foreground"
                    : "bg-secondary hover:bg-secondary/80 text-foreground border-border"
                }`}
              >
                <Scale className="w-3.5 h-3.5" />
                <span>{isInCompare(product.id) ? "In Comparison" : "Compare Specs"}</span>
              </button>

              <button
                onClick={() => toggleBookmark(product.id)}
                className="p-1.5 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground border border-border transition-colors"
                title="Bookmark item"
              >
                <Bookmark
                  className={`w-3.5 h-3.5 ${
                    isBookmarked(product.id) ? "fill-foreground text-foreground" : "text-muted-foreground"
                  }`}
                />
              </button>

              <button
                onClick={handleShare}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground text-xs font-medium border border-border transition-colors"
              >
                <Share2 className="w-3.5 h-3.5 text-muted-foreground" />
                <span>{shareFeedback ? "Copied" : "Share"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Live Multi-Retailer Pricing Matrix */}
        <div className="space-y-4">
          <PriceComparisonTable retailers={product.retailers} productName={product.name} />
        </div>

        {/* Price History Chart */}
        <div className="space-y-4">
          <PriceHistoryChart priceHistory={product.priceHistory} />
        </div>

        {/* Lab Evaluation & Scores */}
        {product.reviewScores && (
          <div className="p-4 sm:p-5 rounded-xl bg-card border border-border shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                Lab Benchmark Evaluation
              </span>
              <span className="text-[11px] font-mono text-muted-foreground">
                Standardized 10-Point Scorecard
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              <div className="p-3 rounded-lg bg-secondary/30 border border-border text-center">
                <div className="text-[10px] font-mono uppercase text-muted-foreground">
                  Build Quality
                </div>
                <div className="text-xl font-mono font-bold text-foreground mt-0.5">
                  {product.reviewScores.buildQuality}
                  <span className="text-xs font-normal text-muted-foreground">/10</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-secondary/30 border border-border text-center">
                <div className="text-[10px] font-mono uppercase text-muted-foreground">
                  Performance
                </div>
                <div className="text-xl font-mono font-bold text-foreground mt-0.5">
                  {product.reviewScores.performance}
                  <span className="text-xs font-normal text-muted-foreground">/10</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-secondary/30 border border-border text-center">
                <div className="text-[10px] font-mono uppercase text-muted-foreground">
                  Value
                </div>
                <div className="text-xl font-mono font-bold text-foreground mt-0.5">
                  {product.reviewScores.value}
                  <span className="text-xs font-normal text-muted-foreground">/10</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-secondary/30 border border-border text-center">
                <div className="text-[10px] font-mono uppercase text-muted-foreground">
                  Features
                </div>
                <div className="text-xl font-mono font-bold text-foreground mt-0.5">
                  {product.reviewScores.features}
                  <span className="text-xs font-normal text-muted-foreground">/10</span>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 p-3 rounded-lg bg-foreground text-background text-center shadow-xs">
                <div className="text-[10px] font-mono uppercase opacity-80">
                  Overall
                </div>
                <div className="text-2xl font-mono font-black mt-0.5">
                  {product.reviewScores.overall}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Strengths & Trade-offs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-card border border-border shadow-xs space-y-2.5">
            <span className="font-mono text-[11px] uppercase tracking-wider text-emerald-500">
              Reasons to Buy (Pros)
            </span>
            <div className="space-y-1.5">
              {product.pros.map((pro, i) => (
                <div key={i} className="flex items-start space-x-2 text-xs text-foreground">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{pro}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-card border border-border shadow-xs space-y-2.5">
            <span className="font-mono text-[11px] uppercase tracking-wider text-rose-500">
              Reasons to Avoid (Cons)
            </span>
            <div className="space-y-1.5">
              {product.cons.map((con, i) => (
                <div key={i} className="flex items-start space-x-2 text-xs text-foreground">
                  <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                  <span>{con}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Technical Specifications Grid */}
        <div className="p-4 sm:p-5 rounded-xl bg-card border border-border shadow-xs space-y-3">
          <div className="pb-2 border-b border-border">
            <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
              Technical Specifications
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
            {Object.entries(product.specifications).map(([key, val]) => (
              <div
                key={key}
                className="flex items-center justify-between py-1.5 border-b border-border/50 text-xs"
              >
                <span className="font-mono text-muted-foreground">{key}</span>
                <span className="font-mono font-semibold text-foreground text-right">{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Frequently Asked Questions */}
        {product.faqs.length > 0 && (
          <div className="p-4 sm:p-5 rounded-xl bg-card border border-border shadow-xs space-y-3">
            <div className="pb-2 border-b border-border">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                Frequently Asked Questions
              </span>
            </div>

            <div className="divide-y divide-border/60">
              {product.faqs.map((faq, fIdx) => (
                <div key={fIdx} className="py-2.5">
                  <button
                    onClick={() => setActiveFaqIndex(activeFaqIndex === fIdx ? null : fIdx)}
                    className="w-full flex items-center justify-between text-left font-semibold text-xs sm:text-sm text-foreground py-0.5 hover:text-foreground/80 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-muted-foreground transition-transform ${
                        activeFaqIndex === fIdx ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {activeFaqIndex === fIdx && (
                    <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed animate-in fade-in duration-100">
                      {faq.answer}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
