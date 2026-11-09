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
  RefreshCw
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
    "Best 4K 240Hz OLED gaming monitor."
  ];

  const handleGenerate = (queryText: string) => {
    setIsGenerating(true);
    setTimeout(() => {
      const res = generateAIAdvice(queryText, currency);
      setActiveResult(res);
      setIsGenerating(false);
    }, 400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputQuery.trim()) {
      handleGenerate(inputQuery.trim());
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="pb-6 border-b border-border/80">
        <div className="inline-flex items-center space-x-2 text-xs font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-3 py-1 rounded-full mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI-Powered Tech Buying Advisor & Part Configurator</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
          AI Buying Advisor
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Tell us your budget, intended workloads, or specific software requirements. Our AI models synthesize lab reviews, compatibility rules, and live prices to deliver tailored advice.
        </p>
      </div>

      {/* Natural Language Prompt Bar */}
      <div className="my-8 max-w-3xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="relative flex items-center bg-card shadow-xl border-2 border-border/80 focus-within:border-cyan-500 rounded-2xl p-2 transition-all"
        >
          <div className="pl-3.5 text-cyan-500">
            <Sparkles className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="e.g. I have ₹80,000 and want a gaming PC..."
            className="w-full bg-transparent border-none py-3 px-3 text-sm sm:text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <button
            type="submit"
            disabled={isGenerating}
            className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl transition-all shadow-md shadow-cyan-600/20 flex items-center space-x-1.5 shrink-0"
          >
            {isGenerating ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <span>Ask Advisor</span>
                <Send className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Suggestion Chips */}
        <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
          <span className="text-[11px] text-muted-foreground font-semibold">Try:</span>
          {samplePrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInputQuery(prompt);
                handleGenerate(prompt);
              }}
              className="text-xs px-3 py-1 rounded-full bg-secondary hover:bg-secondary/80 text-foreground border border-border/70 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* AI Output Section */}
      {activeResult && (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Executive Summary Advice Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-blue-500/10 via-cyan-500/5 to-indigo-500/10 border border-blue-500/20 shadow-lg">
            <div className="flex items-center space-x-2 text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4" />
              <span>AI Buying Verdict & Strategic Analysis</span>
            </div>
            <p className="text-sm sm:text-base text-foreground font-medium leading-relaxed">
              {activeResult.summaryAdvice}
            </p>

            <div className="mt-4 pt-4 border-t border-border/60 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-muted-foreground">
              <div>
                <span className="font-bold text-foreground block mb-1">
                  Recommended Purchasing Strategy:
                </span>
                {activeResult.purchaseStrategy}
              </div>
              <div>
                <span className="font-bold text-foreground block mb-1">
                  Key Criteria Prioritized:
                </span>
                <div className="space-y-1">
                  {activeResult.keySpecsHighlighted.slice(0, 2).map((k, i) => (
                    <div key={i} className="flex items-center space-x-1.5 text-foreground">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{k}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Primary Recommendation: Top Pick */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3 flex items-center space-x-2">
              <Award className="w-4 h-4 text-amber-500" />
              <span>#1 Top Recommendation for Your Requirements</span>
            </div>

            <div className="p-6 rounded-3xl bg-card border-2 border-primary/40 shadow-xl flex flex-col lg:flex-row gap-6 items-start justify-between">
              <div className="flex-1 space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-primary uppercase">
                    {activeResult.topPick.brand}
                  </span>
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                    ★ Top Pick
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-foreground">
                  {activeResult.topPick.name}
                </h3>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {activeResult.topPick.description}
                </p>

                {/* Key Pros */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                  {activeResult.topPick.pros.slice(0, 4).map((pro, pIdx) => (
                    <div
                      key={pIdx}
                      className="flex items-start space-x-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-medium"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      <span>{pro}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing & Retailer Box */}
              <div className="w-full lg:w-72 shrink-0 p-5 rounded-2xl bg-secondary/40 border border-border space-y-3">
                <div className="text-xs text-muted-foreground">Best Current Price:</div>
                <div className="text-3xl font-black text-foreground">
                  {formatPrice(
                    currency === "INR"
                      ? activeResult.topPick.basePriceINR
                      : currency === "AUD"
                      ? activeResult.topPick.basePriceAUD
                      : activeResult.topPick.basePriceUSD,
                    currency
                  )}
                </div>
                <div className="text-[11px] text-emerald-600 font-semibold">
                  ★ {activeResult.topPick.rating} ({activeResult.topPick.reviewCount} reviews)
                </div>

                <div className="pt-2 space-y-2">
                  <a
                    href={activeResult.topPick.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center space-x-1.5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs shadow-md shadow-primary/20 transition-transform hover:scale-[1.01]"
                  >
                    <span>Check Retailer Price</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => addToCompare(activeResult.topPick)}
                    className="w-full py-2 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-semibold text-xs border border-border"
                  >
                    Add to Comparison
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Alternatives: Budget Pick & Premium Pick */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeResult.budgetAlternative && (
              <div className="p-5 rounded-2xl bg-card border border-border shadow-md flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center space-x-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-2">
                    <TrendingUp className="w-3 h-3" />
                    <span>Budget-Friendly Alternative</span>
                  </div>
                  <div className="text-xs font-bold text-primary uppercase">
                    {activeResult.budgetAlternative.brand}
                  </div>
                  <h4 className="font-bold text-base text-foreground mt-0.5">
                    {activeResult.budgetAlternative.name}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {activeResult.budgetAlternative.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                  <div className="text-lg font-black text-foreground">
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
                    className="px-3 py-1.5 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-bold text-xs border border-border flex items-center space-x-1"
                  >
                    <span>View Deal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            )}

            {activeResult.premiumAlternative && (
              <div className="p-5 rounded-2xl bg-card border border-border shadow-md flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center space-x-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 mb-2">
                    <Sparkles className="w-3 h-3" />
                    <span>High-End Enthusiast Alternative</span>
                  </div>
                  <div className="text-xs font-bold text-primary uppercase">
                    {activeResult.premiumAlternative.brand}
                  </div>
                  <h4 className="font-bold text-base text-foreground mt-0.5">
                    {activeResult.premiumAlternative.name}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {activeResult.premiumAlternative.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                  <div className="text-lg font-black text-foreground">
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
                    className="px-3 py-1.5 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-bold text-xs border border-border flex items-center space-x-1"
                  >
                    <span>View Deal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Upgrade Path Road-Map */}
          <div className="p-6 rounded-3xl bg-card border border-border shadow-md">
            <h4 className="font-bold text-sm text-foreground uppercase tracking-wider mb-3">
              Recommended 3-Year Upgrade Path
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {activeResult.upgradePath.map((step, sIdx) => (
                <div
                  key={sIdx}
                  className="p-4 rounded-2xl bg-secondary/30 border border-border/80 flex items-start space-x-3"
                >
                  <div className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xs shrink-0">
                    {sIdx + 1}
                  </div>
                  <div className="text-xs text-foreground font-medium leading-relaxed">
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
