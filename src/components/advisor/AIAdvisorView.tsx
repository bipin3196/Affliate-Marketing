"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Send,
  Cpu,
  Laptop,
  HardDrive,
  Award,
  TrendingUp,
  CheckCircle2,
  ExternalLink,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";
import { generateAIAdvice, AIRecommendationResult } from "@/lib/aiAdvisor";
import { useCurrencyStore } from "@/store/useCurrencyStore";
import { useComparisonStore } from "@/store/useComparisonStore";
import { formatPrice } from "@/lib/currency";

export function AIAdvisorView() {
  const { currency, region } = useCurrencyStore();
  const { addToCompare } = useComparisonStore();

  const [inputQuery, setInputQuery] = useState(
    currency === "INR"
      ? "I have ₹80,000 and want a gaming PC."
      : "I have A$1,500 and want a gaming PC."
  );
  const [activeResult, setActiveResult] = useState<AIRecommendationResult>(() =>
    generateAIAdvice(
      currency === "INR"
        ? "I have ₹80,000 and want a gaming PC."
        : "I have A$1,500 and want a gaming PC.",
      currency
    )
  );
  const [isGenerating, setIsGenerating] = useState(false);

  const samplePrompts = [
    currency === "INR"
      ? "I have ₹80,000 and want a gaming PC."
      : "I have A$1,500 and want a gaming PC.",
    "I need a laptop for Adobe Photoshop and Microsoft 365.",
    "Best NAS device for private family photo backup.",
    "Best 4K 240Hz OLED gaming monitor.",
  ];

  const handleGenerate = (queryText: string) => {
    setIsGenerating(true);
    setTimeout(() => {
      const res = generateAIAdvice(queryText, currency);
      setActiveResult(res);
      setIsGenerating(false);
    }, 350);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputQuery.trim()) {
      handleGenerate(inputQuery.trim());
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Page Header */}
      <div className="pb-6 border-b border-border/80">
        <div className="inline-flex items-center space-x-2 text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          <span>Decision Intelligence</span>
          <span>/</span>
          <span className="text-foreground">Automated Hardware Advisor</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
          AI Buying Advisor
        </h1>
        <p className="text-xs text-muted-foreground mt-1 max-w-2xl">
          State your budget, workload profile, or software requirements. The engine pairs component compatibility, verified benchmark scores, and regional prices to provide exact recommendations.
        </p>
      </div>

      {/* Query Input */}
      <div className="max-w-3xl mx-auto space-y-3">
        <form
          onSubmit={handleSubmit}
          className="relative flex items-center bg-card border border-border focus-within:border-foreground rounded-xl p-1.5 transition-colors shadow-xs"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="e.g. I have ₹80,000 and want a gaming PC..."
            className="w-full bg-transparent border-none py-2 px-3 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <button
            type="submit"
            disabled={isGenerating}
            className="bg-foreground hover:bg-foreground/90 text-background font-semibold text-xs px-4 py-2 rounded-lg transition-colors flex items-center space-x-1.5 shrink-0"
          >
            {isGenerating ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <>
                <span>Analyze</span>
                <Send className="w-3 h-3" />
              </>
            )}
          </button>
        </form>

        {/* Suggestion Chips */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 text-xs">
          <span className="text-[11px] font-mono uppercase text-muted-foreground mr-1">Prompts:</span>
          {samplePrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInputQuery(prompt);
                handleGenerate(prompt);
              }}
              className="text-xs px-2.5 py-1 rounded-md bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground border border-border transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* AI Output Section */}
      {activeResult && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Executive Summary Card */}
          <div className="p-4 sm:p-5 rounded-xl bg-card border border-border shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                Synthesis & Strategic Verdict
              </span>
              <span className="text-[11px] font-mono text-muted-foreground">
                Confidence: High (Lab Verified)
              </span>
            </div>
            <p className="text-xs sm:text-sm text-foreground leading-relaxed">
              {activeResult.summaryAdvice}
            </p>

            <div className="pt-3 border-t border-border grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-muted-foreground">
              <div>
                <span className="font-semibold text-foreground block mb-0.5">
                  Purchasing Strategy:
                </span>
                {activeResult.purchaseStrategy}
              </div>
              <div>
                <span className="font-semibold text-foreground block mb-0.5">
                  Key Criteria Prioritized:
                </span>
                <div className="space-y-1">
                  {activeResult.keySpecsHighlighted.slice(0, 2).map((k, i) => (
                    <div key={i} className="flex items-center space-x-1.5 text-foreground font-mono text-[11px]">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                      <span>{k}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Primary Recommendation: Top Pick */}
          <div>
            <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-2">
              Primary Recommendation
            </div>

            <div className="p-5 rounded-xl bg-card border border-border shadow-xs flex flex-col lg:flex-row gap-6 items-start justify-between">
              <div className="flex-1 space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-mono uppercase text-muted-foreground">
                    {activeResult.topPick.brand}
                  </span>
                  <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                    Optimal Pick
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-foreground">
                  {activeResult.topPick.name}
                </h3>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {activeResult.topPick.description}
                </p>

                {/* Key Pros */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-2">
                  {activeResult.topPick.pros.slice(0, 4).map((pro, pIdx) => (
                    <div
                      key={pIdx}
                      className="flex items-start space-x-1.5 text-xs text-foreground font-mono"
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{pro}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing & Retailer Box */}
              <div className="w-full lg:w-64 shrink-0 p-4 rounded-lg bg-secondary/30 border border-border space-y-3">
                <div className="text-[10px] font-mono uppercase text-muted-foreground">
                  Lowest Tracked Price:
                </div>
                <div className="text-2xl font-mono font-extrabold text-foreground">
                  {formatPrice(
                    currency === "INR"
                      ? activeResult.topPick.basePriceINR
                      : currency === "AUD"
                      ? activeResult.topPick.basePriceAUD
                      : activeResult.topPick.basePriceUSD,
                    currency
                  )}
                </div>
                <div className="text-[11px] font-mono text-muted-foreground">
                  ★ {activeResult.topPick.rating} ({activeResult.topPick.reviewCount} ratings)
                </div>

                <div className="pt-2 space-y-2">
                  <a
                    href={activeResult.topPick.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center space-x-1 py-2 rounded-md bg-foreground hover:bg-foreground/90 text-background font-semibold text-xs transition-colors"
                  >
                    <span>Check Retailer Price</span>
                    <ExternalLink className="w-3 h-3 ml-0.5" />
                  </a>

                  <button
                    onClick={() => addToCompare(activeResult.topPick)}
                    className="w-full py-1.5 rounded-md bg-secondary hover:bg-secondary/80 text-foreground font-medium text-xs border border-border transition-colors"
                  >
                    Compare Specs
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Alternatives: Budget Pick & Premium Pick */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeResult.budgetAlternative && (
              <div className="p-4 rounded-xl bg-card border border-border shadow-xs flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-secondary text-muted-foreground border border-border inline-block mb-2">
                    Value Alternative
                  </div>
                  <div className="text-[10px] font-mono uppercase text-muted-foreground">
                    {activeResult.budgetAlternative.brand}
                  </div>
                  <h4 className="font-semibold text-xs sm:text-sm text-foreground mt-0.5">
                    {activeResult.budgetAlternative.name}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {activeResult.budgetAlternative.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                  <div className="text-base font-mono font-bold text-foreground">
                    {formatPrice(
                      currency === "INR"
                        ? activeResult.budgetAlternative.basePriceINR
                        : currency === "AUD"
                        ? activeResult.budgetAlternative.basePriceAUD
                        : activeResult.budgetAlternative.basePriceUSD,
                      currency
                    )}
                  </div>
                  <a
                    href={activeResult.budgetAlternative.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded-md bg-secondary hover:bg-secondary/80 text-foreground font-medium text-xs border border-border flex items-center space-x-1 transition-colors"
                  >
                    <span>View Deal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            )}

            {activeResult.premiumAlternative && (
              <div className="p-4 rounded-xl bg-card border border-border shadow-xs flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-secondary text-muted-foreground border border-border inline-block mb-2">
                    Enthusiast Alternative
                  </div>
                  <div className="text-[10px] font-mono uppercase text-muted-foreground">
                    {activeResult.premiumAlternative.brand}
                  </div>
                  <h4 className="font-semibold text-xs sm:text-sm text-foreground mt-0.5">
                    {activeResult.premiumAlternative.name}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {activeResult.premiumAlternative.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                  <div className="text-base font-mono font-bold text-foreground">
                    {formatPrice(
                      currency === "INR"
                        ? activeResult.premiumAlternative.basePriceINR
                        : currency === "AUD"
                        ? activeResult.premiumAlternative.basePriceAUD
                        : activeResult.premiumAlternative.basePriceUSD,
                      currency
                    )}
                  </div>
                  <a
                    href={activeResult.premiumAlternative.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded-md bg-secondary hover:bg-secondary/80 text-foreground font-medium text-xs border border-border flex items-center space-x-1 transition-colors"
                  >
                    <span>View Deal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Upgrade Path Road-Map */}
          <div className="p-4 sm:p-5 rounded-xl bg-card border border-border shadow-xs space-y-3">
            <div className="pb-2 border-b border-border">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                Recommended 3-Year Lifecycle & Upgrade Path
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {activeResult.upgradePath.map((step, sIdx) => (
                <div
                  key={sIdx}
                  className="p-3 rounded-lg bg-secondary/30 border border-border flex items-start space-x-2.5"
                >
                  <div className="font-mono text-xs font-bold text-muted-foreground shrink-0 mt-0.5">
                    0{sIdx + 1}
                  </div>
                  <div className="text-xs text-foreground leading-relaxed">
                    {step}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
