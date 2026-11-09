"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Cpu,
  Layers,
  HardDrive,
  Zap,
  Box,
  Fan,
  AlertTriangle,
  CheckCircle2,
  Trash2,
  Plus,
  Share2,
  Copy,
  RotateCcw,
  ExternalLink,
  ChevronRight,
  Sparkles,
  BookmarkCheck,
  ShieldAlert,
  ArrowRight
} from "lucide-react";
import { usePCBuilderStore } from "@/store/usePCBuilderStore";
import { useCurrencyStore } from "@/store/useCurrencyStore";
import { useUserStore } from "@/store/useUserStore";
import { PRODUCTS } from "@/data/products";
import { PC_BUILDS } from "@/data/pcPrebuilts";
import { formatPrice } from "@/lib/currency";
import { PCPartType, Product } from "@/types";

interface PartSlotConfig {
  type: PCPartType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const PART_SLOTS: PartSlotConfig[] = [
  { type: "cpu", label: "Processor (CPU)", icon: Cpu, description: "AMD AM5 / Intel Core processors" },
  { type: "motherboard", label: "Motherboard", icon: Layers, description: "Compatible chipset & socket" },
  { type: "gpu", label: "Graphics Card (GPU)", icon: Zap, description: "NVIDIA GeForce / AMD Radeon" },
  { type: "ram", label: "System Memory (RAM)", icon: Layers, description: "DDR5 / DDR4 high-frequency kits" },
  { type: "storage", label: "Solid State Drive (SSD)", icon: HardDrive, description: "High-speed PCIe Gen4/Gen5 NVMe" },
  { type: "psu", label: "Power Supply (PSU)", icon: Zap, description: "80+ Gold rated modular power" },
  { type: "case", label: "Chassis / PC Case", icon: Box, description: "High-airflow or dual-chamber tempered glass" },
  { type: "cooler", label: "CPU Cooler", icon: Fan, description: "Dual-tower air cooler or 360mm AIO liquid cooler" },
];

export function PCBuilderView() {
  const { parts, setPart, removePart, clearBuild, loadBuild, buildTitle, setTitle, getTotalPrice, getCompatibility } = usePCBuilderStore();
  const { currency, region } = useCurrencyStore();
  const { saveBuild } = useUserStore();

  const [activeModalType, setActiveModalType] = useState<PCPartType | null>(null);
  const [modalSearch, setModalSearch] = useState("");
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [saveFeedback, setSaveFeedback] = useState(false);

  const compatibility = getCompatibility();
  const totalPrice = getTotalPrice(currency);

  // Filter products for the active selection drawer
  const selectableProducts = activeModalType
    ? PRODUCTS.filter((p) => {
        // Matches part type
        const matchType = p.pcPartType === activeModalType;
        if (!matchType) return false;
        // Search filter
        if (!modalSearch) return true;
        const q = modalSearch.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
        );
      })
    : [];

  // Copy parts list in markdown / reddit format
  const handleCopyMarkdown = () => {
    let md = `### ${buildTitle}\n\n`;
    PART_SLOTS.forEach((slot) => {
      const part = parts[slot.type];
      if (part) {
        const price = formatPrice(
          currency === "INR" ? part.basePriceINR : currency === "AUD" ? part.basePriceAUD : part.basePriceUSD,
          currency
        );
        md += `* **${slot.label}**: [${part.name}](${part.affiliateUrl}) - ${price}\n`;
      }
    });
    md += `\n**Total Estimated Price:** ${formatPrice(totalPrice, currency)}\n`;
    md += `**Estimated System Power:** ~${compatibility.totalEstimatedWattage}W (Recommended PSU: ${compatibility.recommendedPsuWattage}W+)\n`;
    md += `*Generated via TechAdvisor AI PC Builder*\n`;

    navigator.clipboard.writeText(md);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2500);
  };

  const handleSaveToDashboard = () => {
    saveBuild({
      id: "build-" + Date.now(),
      title: buildTitle,
      slug: buildTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      purpose: "Gaming",
      targetBudgetINR: totalPrice,
      targetBudgetAUD: totalPrice,
      targetBudgetUSD: totalPrice,
      description: "Custom build saved from TechAdvisor AI Builder",
      parts: { ...parts }
    });
    setSaveFeedback(true);
    setTimeout(() => setSaveFeedback(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title & Quick Presets Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-border/80 gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full mb-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>Interactive PC Part Picker & Compatibility Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
            Gaming PC Builder
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Build custom PCs with real-time socket checks, RAM pin validation, wattage headroom, and live store pricing.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleCopyMarkdown}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground text-xs font-semibold border border-border transition-colors"
          >
            <Copy className="w-4 h-4 text-muted-foreground" />
            <span>{copyFeedback ? "Copied Part List!" : "Copy Markdown"}</span>
          </button>

          <button
            onClick={handleSaveToDashboard}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-500/20 transition-colors"
          >
            <BookmarkCheck className="w-4 h-4" />
            <span>{saveFeedback ? "Saved to Dashboard!" : "Save Build"}</span>
          </button>

          <button
            onClick={clearBuild}
            className="p-2 rounded-xl bg-secondary hover:bg-destructive/10 hover:text-destructive text-muted-foreground text-xs border border-border transition-colors"
            title="Clear all components"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quick Load Build By Budget / Purpose Presets */}
      <div className="my-6 p-4 rounded-2xl bg-secondary/30 border border-border/70">
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center">
            <Sparkles className="w-3.5 h-3.5 mr-1.5 text-blue-500" />
            Load Curated Tested Builds (By Budget & Purpose)
          </div>
          <span className="text-[11px] text-muted-foreground">Click any preset to auto-populate</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {PC_BUILDS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => loadBuild(preset)}
              className="text-xs font-semibold px-3.5 py-2 rounded-xl bg-card hover:bg-primary hover:text-white border border-border shadow-sm transition-all flex items-center space-x-2 group"
            >
              <span>{preset.title.split("(")[0].split("Rig")[0]}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-secondary group-hover:bg-white/20 font-bold">
                {formatPrice(
                  currency === "INR" ? preset.targetBudgetINR : currency === "AUD" ? preset.targetBudgetAUD : preset.targetBudgetUSD,
                  currency
                )}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Component Slots List */}
        <div className="lg:col-span-2 space-y-3">
          {PART_SLOTS.map((slot) => {
            const Icon = slot.icon;
            const currentPart = parts[slot.type];

            return (
              <div
                key={slot.type}
                className={`p-4 rounded-2xl border transition-all ${
                  currentPart
                    ? "bg-card border-border shadow-sm"
                    : "bg-secondary/20 border-dashed border-border/80 hover:border-primary/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                        currentPart
                          ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div>
                      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        {slot.label}
                      </div>
                      {currentPart ? (
                        <div className="font-bold text-sm sm:text-base text-foreground mt-0.5 line-clamp-1">
                          {currentPart.name}
                        </div>
                      ) : (
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {slot.description}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Actions: Select, Change, Remove */}
                  <div className="flex items-center space-x-3">
                    {currentPart ? (
                      <div className="text-right">
                        <div className="font-extrabold text-sm sm:text-base text-foreground">
                          {formatPrice(
                            currency === "INR"
                              ? currentPart.basePriceINR
                              : currency === "AUD"
                              ? currentPart.basePriceAUD
                              : currentPart.basePriceUSD,
                            currency
                          )}
                        </div>
                        <div className="flex items-center justify-end space-x-1.5 mt-1">
                          <button
                            onClick={() => {
                              setActiveModalType(slot.type);
                              setModalSearch("");
                            }}
                            className="text-[11px] text-blue-600 hover:underline font-semibold"
                          >
                            Change
                          </button>
                          <span className="text-muted-foreground">•</span>
                          <button
                            onClick={() => removePart(slot.type)}
                            className="text-[11px] text-destructive hover:underline font-semibold flex items-center"
                          >
                            <Trash2 className="w-3 h-3 mr-0.5" /> Remove
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setActiveModalType(slot.type);
                          setModalSearch("");
                        }}
                        className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs shadow-sm shadow-primary/25 transition-transform hover:scale-[1.02]"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Choose {slot.label.split(" ")[0]}</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Sub-spec pill if selected */}
                {currentPart && (
                  <div className="mt-3 pt-3 border-t border-border/50 flex flex-wrap gap-2 text-[11px] text-muted-foreground">
                    {currentPart.componentSpecs?.socket && (
                      <span className="px-2 py-0.5 rounded bg-secondary font-medium">
                        Socket: {currentPart.componentSpecs.socket}
                      </span>
                    )}
                    {currentPart.componentSpecs?.memoryType && (
                      <span className="px-2 py-0.5 rounded bg-secondary font-medium">
                        Memory: {currentPart.componentSpecs.memoryType}
                      </span>
                    )}
                    {currentPart.componentSpecs?.tdp && (
                      <span className="px-2 py-0.5 rounded bg-secondary font-medium">
                        TDP: {currentPart.componentSpecs.tdp}W
                      </span>
                    )}
                    {currentPart.componentSpecs?.vramGB && (
                      <span className="px-2 py-0.5 rounded bg-secondary font-medium">
                        VRAM: {currentPart.componentSpecs.vramGB}GB
                      </span>
                    )}
                    {currentPart.componentSpecs?.wattage && (
                      <span className="px-2 py-0.5 rounded bg-secondary font-medium">
                        Output: {currentPart.componentSpecs.wattage}W
                      </span>
                    )}
                    <Link
                      href={`/product/${currentPart.slug}`}
                      className="text-blue-500 hover:underline font-semibold ml-auto flex items-center"
                    >
                      View Specs & Store Pricing <ChevronRight className="w-3 h-3 ml-0.5" />
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Column: Compatibility Engine & Cost Summary Card */}
        <div className="space-y-6">
          {/* Compatibility Checker Box */}
          <div className="p-5 rounded-2xl bg-card border border-border shadow-lg">
            <div className="flex items-center justify-between pb-4 border-b border-border/80">
              <div className="flex items-center space-x-2">
                {compatibility.isCompatible ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                ) : (
                  <ShieldAlert className="w-5 h-5 text-destructive" />
                )}
                <h3 className="font-black text-base text-foreground">
                  Compatibility Status
                </h3>
              </div>
              <span
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                  compatibility.isCompatible
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                    : "bg-destructive/10 text-destructive border border-destructive/20"
                }`}
              >
                {compatibility.isCompatible ? "Parts Compatible" : "Issues Detected"}
              </span>
            </div>

            {/* Power Draw Breakdown */}
            <div className="mt-4 p-3.5 rounded-xl bg-secondary/50 border border-border/60">
              <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
                <span>Estimated System Wattage</span>
                <span className="text-foreground font-black text-sm">
                  ~{compatibility.totalEstimatedWattage} W
                </span>
              </div>
              <div className="w-full bg-border/70 h-2 rounded-full overflow-hidden mt-2">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all"
                  style={{
                    width: `${Math.min(
                      100,
                      (compatibility.totalEstimatedWattage /
                        (parts.psu?.componentSpecs?.wattage || compatibility.recommendedPsuWattage)) *
                        100
                    )}%`,
                  }}
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-muted-foreground mt-2">
                <span>Recommended PSU:</span>
                <span className="font-bold text-foreground">
                  {compatibility.recommendedPsuWattage}W+ 80+ Gold
                </span>
              </div>
            </div>

            {/* Issues and Warnings List */}
            <div className="mt-4 space-y-2">
              {compatibility.issues.length === 0 ? (
                <div className="text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 border border-emerald-500/20 p-3 rounded-xl flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>
                    No socket conflicts, memory mismatches, or power deficits detected. All selected parts are physically compatible.
                  </span>
                </div>
              ) : (
                compatibility.issues.map((issue, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl border text-xs leading-relaxed ${
                      issue.severity === "error"
                        ? "bg-destructive/10 border-destructive/30 text-destructive dark:text-rose-400"
                        : "bg-amber-500/10 border-amber-500/30 text-amber-700 dark:text-amber-400"
                    }`}
                  >
                    <div className="font-bold flex items-center space-x-1.5 mb-1">
                      <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                      <span>{issue.title}</span>
                    </div>
                    <p className="opacity-90">{issue.message}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Pricing & Checkout Summary */}
          <div className="p-5 rounded-2xl bg-card border border-border shadow-lg space-y-4">
            <h3 className="font-black text-base text-foreground pb-2 border-b border-border/80">
              Build Cost Estimate
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Selected Components</span>
                <span className="font-bold text-foreground">
                  {Object.values(parts).filter(Boolean).length} / {PART_SLOTS.length} Parts
                </span>
              </div>
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Target Region</span>
                <span className="font-bold text-foreground">
                  {region === "AU" ? "🇦🇺 Australia (AUD)" : region === "IN" ? "🇮🇳 India (INR)" : "🌐 Global (USD)"}
                </span>
              </div>
              <div className="flex items-center justify-between text-muted-foreground">
                <span>Price Comparison Savings</span>
                <span className="font-bold text-emerald-600">
                  Save up to 8-12% across stores
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-border/80 flex items-baseline justify-between">
              <span className="text-sm font-bold text-muted-foreground">Total Price:</span>
              <span className="text-2xl sm:text-3xl font-black text-foreground">
                {formatPrice(totalPrice, currency)}
              </span>
            </div>

            <div className="pt-2 space-y-2">
              <Link
                href="/fps-estimator"
                className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-secondary hover:bg-secondary/80 font-bold text-xs text-foreground border border-border transition-colors"
              >
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Test Gaming FPS for this Build</span>
              </Link>

              <button
                onClick={handleCopyMarkdown}
                className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-primary hover:bg-primary/90 font-bold text-xs text-white shadow-md shadow-primary/20 transition-transform hover:scale-[1.01]"
              >
                <Share2 className="w-4 h-4" />
                <span>Share & Export Part List</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Component Selection Drawer / Modal */}
      {activeModalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-card border border-border rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 border-b border-border flex items-center justify-between">
              <div>
                <h3 className="font-black text-lg text-foreground">
                  Select {PART_SLOTS.find((s) => s.type === activeModalType)?.label}
                </h3>
                <p className="text-xs text-muted-foreground">
                  Choose verified hardware with real-time stock and prices
                </p>
              </div>
              <button
                onClick={() => setActiveModalType(null)}
                className="p-2 rounded-xl hover:bg-secondary text-muted-foreground"
              >
                ✕
              </button>
            </div>

            {/* Modal Search */}
            <div className="p-4 border-b border-border/60 bg-secondary/20">
              <input
                type="text"
                placeholder="Search by brand, series, model..."
                value={modalSearch}
                onChange={(e) => setModalSearch(e.target.value)}
                className="w-full bg-card border border-border rounded-xl py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Modal Part List */}
            <div className="p-4 overflow-y-auto space-y-3 flex-1">
              {selectableProducts.length === 0 ? (
                <div className="py-12 text-center text-sm text-muted-foreground">
                  No parts found matching your filter criteria.
                </div>
              ) : (
                selectableProducts.map((product) => (
                  <div
                    key={product.id}
                    className="p-3.5 rounded-2xl border border-border hover:border-primary/60 bg-card hover:bg-secondary/30 transition-all flex items-center justify-between group"
                  >
                    <div className="flex-1 pr-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold text-primary uppercase">
                          {product.brand}
                        </span>
                        {product.badges?.map((badge, bIdx) => (
                          <span
                            key={bIdx}
                            className="text-[10px] bg-blue-500/10 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded font-bold"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                      <h4 className="font-bold text-sm text-foreground mt-0.5 group-hover:text-primary transition-colors">
                        {product.name}
                      </h4>
                      <div className="text-xs text-muted-foreground mt-1 line-clamp-1">
                        {product.description}
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="font-black text-base text-foreground">
                        {formatPrice(
                          currency === "INR"
                            ? product.basePriceINR
                            : currency === "AUD"
                            ? product.basePriceAUD
                            : product.basePriceUSD,
                          currency
                        )}
                      </div>
                      <button
                        onClick={() => {
                          setPart(activeModalType, product);
                          setActiveModalType(null);
                        }}
                        className="mt-1.5 px-3.5 py-1.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold transition-transform hover:scale-105 shadow-sm"
                      >
                        Select Part
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
