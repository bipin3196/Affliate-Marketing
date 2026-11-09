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
  Zap
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
  generateBreadcrumbSchema
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
      {/* Rich JSON-LD Schemas for Search Engines */}
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link href={`/category/${product.category}`} className="capitalize hover:text-foreground">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-foreground font-semibold line-clamp-1">{product.name}</span>
        </nav>

        {/* Product Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left: Image Showcase */}
          <div className="space-y-4">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-secondary/30 border border-border flex items-center justify-center p-6 shadow-md">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover rounded-2xl"
              />
              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                {product.badges?.map((badge, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-black uppercase px-3 py-1 rounded-full bg-blue-600 text-white shadow-md"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Thumbnail switcher if multiple */}
            {product.images.length > 1 && (
              <div className="flex items-center space-x-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === img
                        ? "border-primary ring-2 ring-primary/20 scale-105"
                        : "border-border/60 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Details & Buying Actions */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 text-xs font-bold text-primary uppercase tracking-wider">
                <span>{product.brand}</span>
                <span>•</span>
                <span className="capitalize">{product.subcategory.replace("-", " ")}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-foreground mt-1 tracking-tight leading-snug">
                {product.name}
              </h1>

              {/* Star Rating & Review Count */}
              <div className="mt-2 flex items-center space-x-3 text-xs">
                <div className="flex items-center space-x-1 text-amber-500 font-bold">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span>{product.rating}</span>
                </div>
                <span className="text-muted-foreground">
                  ({product.reviewCount.toLocaleString()} verified ratings)
                </span>
                <span className="text-muted-foreground">•</span>
                <span className="text-emerald-600 font-semibold flex items-center">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1" /> TechAdvisor Tested
                </span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Price Card */}
            <div className="p-5 rounded-2xl bg-secondary/40 border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs text-muted-foreground">Lowest Tracked Retailer Price:</div>
                <div className="text-3xl font-black text-foreground mt-0.5">
                  {formatPrice(price, currency)}
                </div>
                <div className="text-[11px] text-muted-foreground mt-0.5">
                  Tax inclusive • Free transit shipping
                </div>
              </div>

              <a
                href={product.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-sm shadow-md shadow-primary/25 transition-transform hover:scale-105"
              >
                <span>View Store Deals</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              {product.pcPartType && (
                <button
                  onClick={() => setPart(product.pcPartType!, product)}
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-bold text-xs border border-border transition-colors"
                >
                  <Cpu className="w-4 h-4 text-blue-500" />
                  <span>Add to PC Builder</span>
                </button>
              )}

              <button
                onClick={() => addToCompare(product)}
                className={`flex items-center space-x-1.5 px-4 py-2 rounded-xl font-bold text-xs border transition-colors ${
                  isInCompare(product.id)
                    ? "bg-purple-600 text-white border-purple-600"
                    : "bg-secondary hover:bg-secondary/80 text-foreground border-border"
                }`}
              >
                <Scale className="w-4 h-4" />
                <span>{isInCompare(product.id) ? "Added to Compare" : "Compare Specs"}</span>
              </button>

              <button
                onClick={() => toggleBookmark(product.id)}
                className="p-2 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground border border-border"
                title="Bookmark item"
              >
                <Bookmark
                  className={`w-4 h-4 ${
                    isBookmarked(product.id) ? "fill-blue-500 text-blue-500" : "text-muted-foreground"
                  }`}
                />
              </button>

              <button
                onClick={handleShare}
                className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-semibold text-xs border border-border"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{shareFeedback ? "Link Copied!" : "Share"}</span>
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
          <div className="p-6 rounded-3xl bg-card border border-border shadow-md space-y-6">
            <h3 className="font-black text-lg text-foreground flex items-center space-x-2">
              <Award className="w-5 h-5 text-amber-500" />
              <span>TechAdvisor Lab Evaluation & Benchmark Scores</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              <div className="p-4 rounded-2xl bg-secondary/30 border border-border text-center">
                <div className="text-[11px] font-bold text-muted-foreground uppercase">
                  Build Quality
                </div>
                <div className="text-2xl font-black text-foreground mt-1">
                  {product.reviewScores.buildQuality}
                  <span className="text-xs text-muted-foreground">/10</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-secondary/30 border border-border text-center">
                <div className="text-[11px] font-bold text-muted-foreground uppercase">
                  Performance
                </div>
                <div className="text-2xl font-black text-foreground mt-1">
                  {product.reviewScores.performance}
                  <span className="text-xs text-muted-foreground">/10</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-secondary/30 border border-border text-center">
                <div className="text-[11px] font-bold text-muted-foreground uppercase">
                  Value for Money
                </div>
                <div className="text-2xl font-black text-foreground mt-1">
                  {product.reviewScores.value}
                  <span className="text-xs text-muted-foreground">/10</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-secondary/30 border border-border text-center">
                <div className="text-[11px] font-bold text-muted-foreground uppercase">
                  Features
                </div>
                <div className="text-2xl font-black text-foreground mt-1">
                  {product.reviewScores.features}
                  <span className="text-xs text-muted-foreground">/10</span>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 p-4 rounded-2xl bg-primary text-white text-center shadow-lg">
                <div className="text-[11px] font-bold uppercase opacity-90">
                  Overall Score
                </div>
                <div className="text-3xl font-black mt-1">
                  {product.reviewScores.overall}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pros & Cons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-3xl bg-card border border-border shadow-md space-y-3">
            <h4 className="font-bold text-sm text-emerald-600 dark:text-emerald-400 flex items-center space-x-2 uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>Reasons to Buy (Pros)</span>
            </h4>
            <div className="space-y-2">
              {product.pros.map((pro, i) => (
                <div key={i} className="flex items-start space-x-2 text-xs sm:text-sm text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{pro}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-card border border-border shadow-md space-y-3">
            <h4 className="font-bold text-sm text-rose-600 dark:text-rose-400 flex items-center space-x-2 uppercase tracking-wider">
              <XCircle className="w-4 h-4" />
              <span>Reasons to Avoid (Cons)</span>
            </h4>
            <div className="space-y-2">
              {product.cons.map((con, i) => (
                <div key={i} className="flex items-start space-x-2 text-xs sm:text-sm text-foreground">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>{con}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Complete Specifications Grid */}
        <div className="p-6 rounded-3xl bg-card border border-border shadow-md space-y-4">
          <h3 className="font-black text-lg text-foreground">
            Technical Specifications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
            {Object.entries(product.specifications).map(([key, val]) => (
              <div
                key={key}
                className="flex items-center justify-between py-2 border-b border-border/50 text-xs sm:text-sm"
              >
                <span className="font-semibold text-muted-foreground">{key}</span>
                <span className="font-bold text-foreground text-right">{val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Frequently Asked Questions (FAQ) with Accordion */}
        {product.faqs.length > 0 && (
          <div className="p-6 rounded-3xl bg-card border border-border shadow-md space-y-4">
            <div className="flex items-center space-x-2">
              <HelpCircle className="w-5 h-5 text-blue-500" />
              <h3 className="font-black text-lg text-foreground">
                Frequently Asked Questions
              </h3>
            </div>

            <div className="divide-y divide-border/60">
              {product.faqs.map((faq, fIdx) => (
                <div key={fIdx} className="py-3">
                  <button
                    onClick={() => setActiveFaqIndex(activeFaqIndex === fIdx ? null : fIdx)}
                    className="w-full flex items-center justify-between text-left font-bold text-sm text-foreground py-1 hover:text-primary transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-muted-foreground transition-transform ${
                        activeFaqIndex === fIdx ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {activeFaqIndex === fIdx && (
                    <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed animate-in fade-in duration-150">
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
