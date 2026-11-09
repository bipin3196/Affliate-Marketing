"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Award,
  Clock,
  User,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
  HelpCircle,
  Share2,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { BuyingGuide, Product } from "@/types";
import { PRODUCTS } from "@/data/products";
import { useCurrencyStore } from "@/store/useCurrencyStore";
import { formatPrice } from "@/lib/currency";
import { generateFAQSchema, generateBreadcrumbSchema } from "@/lib/schema";

interface BuyingGuideDetailViewProps {
  guide: BuyingGuide;
}

export function BuyingGuideDetailView({ guide }: BuyingGuideDetailViewProps) {
  const { currency } = useCurrencyStore();
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [shareFeedback, setShareFeedback] = useState(false);

  const topPick = PRODUCTS.find((p) => p.id === guide.topPickId);
  const bestValue = PRODUCTS.find((p) => p.id === guide.bestValueId);
  const premiumPick = PRODUCTS.find((p) => p.id === guide.premiumPickId);

  const featuredProducts = PRODUCTS.filter((p) => guide.productIds.includes(p.id));

  const faqSchema = generateFAQSchema(guide.faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://techadvisor.ai" },
    { name: "Buying Guides", url: "https://techadvisor.ai/buying-guides" },
    { name: guide.title, url: `https://techadvisor.ai/buying-guides/${guide.slug}` }
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link href="/buying-guides" className="hover:text-foreground">Buying Guides</Link>
          <span>/</span>
          <span className="text-foreground font-semibold line-clamp-1">{guide.title}</span>
        </nav>

        {/* Title Header */}
        <header className="space-y-4">
          <div className="flex items-center space-x-2 text-xs font-bold text-primary uppercase tracking-wider">
            <span>{guide.category}</span>
            <span>•</span>
            <span>Tested & Verified 2026</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-tight">
            {guide.title}
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {guide.subtitle}
          </p>

          <div className="flex flex-wrap items-center justify-between pt-4 border-t border-border/80 text-xs text-muted-foreground gap-4">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <User className="w-3.5 h-3.5 mr-1 text-primary" /> {guide.author}
              </span>
              <span>•</span>
              <span className="flex items-center">
                <Clock className="w-3.5 h-3.5 mr-1" /> {guide.readTime}
              </span>
              <span>•</span>
              <span>Updated {guide.publishedDate}</span>
            </div>

            <button
              onClick={handleShare}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-semibold"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{shareFeedback ? "Link Copied!" : "Share Guide"}</span>
            </button>
          </div>
        </header>

        {/* Hero Image */}
        <div className="relative aspect-[16/9] rounded-3xl overflow-hidden border border-border shadow-xl">
          <img src={guide.heroImage} alt={guide.title} className="w-full h-full object-cover" />
        </div>

        {/* Editorial Executive Summary & Top Picks Box */}
        <div className="p-6 rounded-3xl bg-secondary/40 border border-border space-y-6">
          <div>
            <h3 className="font-extrabold text-lg text-foreground flex items-center space-x-2">
              <Award className="w-5 h-5 text-amber-500" />
              <span>The Quick Verdict & Editor's Top Recommendations</span>
            </h3>
            <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
              {guide.summary}
            </p>
          </div>

          {/* Top Pick Cards Mini-Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
            {topPick && (
              <div className="p-4 rounded-2xl bg-card border-2 border-primary/40 shadow-sm flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                    ★ #1 Top Pick
                  </span>
                  <h4 className="font-bold text-sm text-foreground mt-1 line-clamp-1">{topPick.name}</h4>
                  <div className="text-sm font-black text-foreground mt-1">
                    {formatPrice(currency === "INR" ? topPick.basePriceINR : topPick.basePriceAUD, currency)}
                  </div>
                </div>
                <a
                  href={topPick.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center space-x-1 py-2 rounded-xl bg-primary text-white text-xs font-bold"
                >
                  <span>Check Price</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}

            {bestValue && bestValue.id !== topPick?.id && (
              <div className="p-4 rounded-2xl bg-card border border-border shadow-sm flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    Best Value Pick
                  </span>
                  <h4 className="font-bold text-sm text-foreground mt-1 line-clamp-1">{bestValue.name}</h4>
                  <div className="text-sm font-black text-foreground mt-1">
                    {formatPrice(currency === "INR" ? bestValue.basePriceINR : bestValue.basePriceAUD, currency)}
                  </div>
                </div>
                <a
                  href={bestValue.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center space-x-1 py-2 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground text-xs font-bold border border-border"
                >
                  <span>Check Price</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}

            {premiumPick && premiumPick.id !== topPick?.id && (
              <div className="p-4 rounded-2xl bg-card border border-border shadow-sm flex flex-col justify-between space-y-3">
                <div>
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400">
                    High-End Pick
                  </span>
                  <h4 className="font-bold text-sm text-foreground mt-1 line-clamp-1">{premiumPick.name}</h4>
                  <div className="text-sm font-black text-foreground mt-1">
                    {formatPrice(currency === "INR" ? premiumPick.basePriceINR : premiumPick.basePriceAUD, currency)}
                  </div>
                </div>
                <a
                  href={premiumPick.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center space-x-1 py-2 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground text-xs font-bold border border-border"
                >
                  <span>Check Price</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-8 pt-4">
          {guide.contentSections.map((sec, idx) => (
            <section key={idx} className="space-y-3">
              <h2 className="text-xl sm:text-2xl font-black text-foreground">
                {sec.title}
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {sec.body}
              </p>

              {sec.tips && sec.tips.length > 0 && (
                <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Hardware Lab Pro Tip</span>
                  </div>
                  {sec.tips.map((tip, tIdx) => (
                    <div key={tIdx} className="text-xs text-foreground font-medium flex items-start space-x-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Featured Tested Hardware SKU List */}
        <div className="space-y-4 pt-6 border-t border-border">
          <h3 className="font-black text-xl text-foreground">
            Featured Products Reviewed in This Guide
          </h3>
          <div className="space-y-3">
            {featuredProducts.map((p) => (
              <div
                key={p.id}
                className="p-4 rounded-2xl bg-card border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="text-xs font-bold text-primary uppercase">{p.brand}</div>
                  <Link href={`/product/${p.slug}`} className="font-bold text-base text-foreground hover:underline">
                    {p.name}
                  </Link>
                  <div className="text-xs text-muted-foreground line-clamp-1 mt-0.5">
                    {p.description}
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end space-x-4 shrink-0">
                  <span className="font-black text-base text-foreground">
                    {formatPrice(currency === "INR" ? p.basePriceINR : p.basePriceAUD, currency)}
                  </span>
                  <a
                    href={p.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-xs flex items-center space-x-1"
                  >
                    <span>Store Deal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        {guide.faqs.length > 0 && (
          <div className="p-6 rounded-3xl bg-card border border-border shadow-md space-y-4 pt-6">
            <h3 className="font-black text-lg text-foreground flex items-center space-x-2">
              <HelpCircle className="w-5 h-5 text-blue-500" />
              <span>Frequently Asked Questions</span>
            </h3>

            <div className="divide-y divide-border/60">
              {guide.faqs.map((faq, fIdx) => (
                <div key={fIdx} className="py-3">
                  <button
                    onClick={() => setActiveFaq(activeFaq === fIdx ? null : fIdx)}
                    className="w-full flex items-center justify-between text-left font-bold text-sm text-foreground py-1 hover:text-primary transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-muted-foreground transition-transform ${
                        activeFaq === fIdx ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {activeFaq === fIdx && (
                    <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed animate-in fade-in duration-150">
                      {faq.answer}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </article>
    </>
  );
}
