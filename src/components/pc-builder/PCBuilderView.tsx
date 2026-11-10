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
  ChevronLeft,
  Sparkles,
  BookmarkCheck,
  ShieldAlert,
  ArrowRight,
  Filter,
  Check,
  Sliders,
  HelpCircle,
  Wand2,
} from "lucide-react";
import { usePCBuilderStore } from "@/store/usePCBuilderStore";
import { useCurrencyStore } from "@/store/useCurrencyStore";
import { useUserStore } from "@/store/useUserStore";
import { PRODUCTS } from "@/data/products";
import { PC_BUILDS } from "@/data/pcPrebuilts";
import { formatPrice } from "@/lib/currency";
import { evaluatePartCompatibility } from "@/lib/compatibility";
import { PCPartType, Product } from "@/types";

interface PartSlotConfig {
  type: PCPartType;
  stepNumber: number;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  tip?: string;
}

const PART_SLOTS: PartSlotConfig[] = [
  {
    type: "cpu",
    stepNumber: 1,
    label: "Processor (CPU)",
    icon: Cpu,
    description: "AMD AM5 / Intel Core processors",
    tip: "Start here: Your CPU defines your motherboard socket (AM5, LGA1700) and memory generation.",
  },
  {
    type: "motherboard",
    stepNumber: 2,
    label: "Motherboard",
    icon: Layers,
    description: "Compatible chipset & socket",
    tip: "Auto-filtered: Only motherboards matching your chosen CPU socket are recommended.",
  },
  {
    type: "ram",
    stepNumber: 3,
    label: "System Memory (RAM)",
    icon: Layers,
    description: "DDR5 / DDR4 high-frequency kits",
    tip: "Auto-filtered: Matches your motherboard's DDR4 or DDR5 pin specification.",
  },
  {
    type: "gpu",
    stepNumber: 4,
    label: "Graphics Card (GPU)",
    icon: Zap,
    description: "NVIDIA GeForce / AMD Radeon",
    tip: "Defines gaming frame rates and determines the wattage requirements for your power supply.",
  },
  {
    type: "psu",
    stepNumber: 5,
    label: "Power Supply (PSU)",
    icon: Zap,
    description: "80+ Gold rated modular power",
    tip: "Auto-calculated: Minimum draw + 25% safety overhead for modern GPU transient spikes.",
  },
  {
    type: "storage",
    stepNumber: 6,
    label: "Solid State Drive (SSD)",
    icon: HardDrive,
    description: "High-speed PCIe Gen4/Gen5 NVMe",
    tip: "Blazing 7000+ MB/s Gen4 NVMe speeds for instant boot & DirectStorage game loading.",
  },
  {
    type: "case",
    stepNumber: 7,
    label: "Chassis / PC Case",
    icon: Box,
    description: "High-airflow or dual-chamber tempered glass",
    tip: "Auto-checked for GPU length clearance and side panel CPU cooler clearance.",
  },
  {
    type: "cooler",
    stepNumber: 8,
    label: "CPU Cooler",
    icon: Fan,
    description: "Dual-tower air cooler or 360mm AIO liquid cooler",
    tip: "Verified to support your CPU socket brackets and chassis height limits.",
  },
];

export function PCBuilderView() {
  const {
    parts,
    setPart,
    removePart,
    clearBuild,
    loadBuild,
    buildTitle,
    setTitle,
    getTotalPrice,
    getCompatibility,
  } = usePCBuilderStore();

  const { currency, region } = useCurrencyStore();
  const { saveBuild } = useUserStore();

  const [builderMode, setBuilderMode] = useState<"guided" | "overview">("guided");
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [activeModalType, setActiveModalType] = useState<PCPartType | null>(null);
  const [modalSearch, setModalSearch] = useState("");
  const [onlyCompatibleFilter, setOnlyCompatibleFilter] = useState(true);
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [saveFeedback, setSaveFeedback] = useState(false);

  const compatibility = getCompatibility();
  const totalPrice = getTotalPrice(currency);
  const selectedPartsCount = Object.values(parts).filter(Boolean).length;
  const progressPercent = Math.round((selectedPartsCount / PART_SLOTS.length) * 100);

  const activeSlot = PART_SLOTS[currentStepIndex];

  // Candidates for modal with dynamic compatibility evaluation
  const modalCandidates = activeModalType
    ? PRODUCTS.filter((p) => p.pcPartType === activeModalType)
        .map((product) => {
          const evalResult = evaluatePartCompatibility(product, activeModalType, parts);
          return { product, evalResult };
        })
        .filter(({ product, evalResult }) => {
          if (onlyCompatibleFilter && !evalResult.isCompatible) return false;
          if (!modalSearch) return true;
          const q = modalSearch.toLowerCase();
          return (
            product.name.toLowerCase().includes(q) ||
            product.brand.toLowerCase().includes(q) ||
            product.description.toLowerCase().includes(q)
          );
        })
        .sort((a, b) => b.evalResult.recommendationScore - a.evalResult.recommendationScore)
    : [];

  const handleAutoSuggestPart = (slotType: PCPartType) => {
    const candidates = PRODUCTS.filter((p) => p.pcPartType === slotType)
      .map((product) => ({
        product,
        evalResult: evaluatePartCompatibility(product, slotType, parts),
      }))
      .filter((c) => c.evalResult.isCompatible)
      .sort((a, b) => b.evalResult.recommendationScore - a.evalResult.recommendationScore);

    if (candidates.length > 0) {
      setPart(slotType, candidates[0].product);
    }
  };

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
    md += `*Generated via TechAdvisor AI Guided PC Builder (Centre Com / PCPartPicker Engine)*\n`;

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
      parts: { ...parts },
    });
    setSaveFeedback(true);
    setTimeout(() => setSaveFeedback(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Impeccable Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-border/80 gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Interactive Configurator</span>
            <span>/</span>
            <span className="text-foreground">Centre Com Architecture</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Custom PC Builder
          </h1>
          <p className="text-xs text-muted-foreground mt-1 max-w-2xl">
            Step-by-step component selection with deterministic socket checks, RAM pin matching, and live GPU wattage calculations.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Segmented Mode Switch */}
          <div className="inline-flex items-center rounded-lg bg-secondary/80 p-0.5 border border-border">
            <button
              onClick={() => setBuilderMode("guided")}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                builderMode === "guided"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Guided Steps
            </button>
            <button
              onClick={() => setBuilderMode("overview")}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                builderMode === "overview"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Full Overview
            </button>
          </div>

          <button
            onClick={handleCopyMarkdown}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground text-xs font-medium border border-border transition-colors"
          >
            <Copy className="w-3.5 h-3.5 text-muted-foreground" />
            <span>{copyFeedback ? "Copied" : "Copy List"}</span>
          </button>

          <button
            onClick={handleSaveToDashboard}
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-foreground hover:bg-foreground/90 text-background text-xs font-semibold transition-colors"
          >
            <BookmarkCheck className="w-3.5 h-3.5" />
            <span>{saveFeedback ? "Saved" : "Save Build"}</span>
          </button>

          <button
            onClick={clearBuild}
            className="p-1.5 rounded-lg bg-secondary hover:bg-rose-500/10 hover:text-rose-500 text-muted-foreground text-xs border border-border transition-colors"
            title="Reset build"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Progress & Metrics Strip */}
      <div className="p-4 rounded-xl bg-card border border-border shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
          <div className="flex items-center space-x-2">
            <span className="text-muted-foreground">Configuration Progress:</span>
            <span className="font-mono font-bold text-foreground">
              {selectedPartsCount} / {PART_SLOTS.length}
            </span>
            <span className="text-muted-foreground">({progressPercent}%)</span>
          </div>

          <div className="flex items-center space-x-4 font-mono text-xs">
            <div className="flex items-center space-x-1.5">
              <span className="text-muted-foreground">Draw:</span>
              <span className="font-bold text-foreground">~{compatibility.totalEstimatedWattage}W</span>
            </div>
            <div className="text-muted-foreground">
              PSU Min: <span className="font-bold text-foreground">{compatibility.recommendedPsuWattage}W+</span>
            </div>
            <div className="pl-3 border-l border-border">
              <span className="text-muted-foreground">Total: </span>
              <span className="font-bold text-foreground text-sm">
                {formatPrice(totalPrice, currency)}
              </span>
            </div>
          </div>
        </div>

        <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-foreground h-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* System Templates Bar */}
      <div className="p-3 rounded-xl bg-secondary/40 border border-border flex flex-col md:flex-row md:items-center justify-between gap-2.5">
        <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground flex items-center">
          <Sparkles className="w-3.5 h-3.5 mr-1.5 text-muted-foreground" />
          Presets:
        </div>

        <div className="flex flex-wrap gap-1.5">
          {PC_BUILDS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => loadBuild(preset)}
              className="text-xs font-medium px-2.5 py-1 rounded-md bg-card hover:bg-secondary border border-border shadow-xs transition-colors flex items-center space-x-2"
            >
              <span>{preset.title.split("(")[0].split("Rig")[0].trim()}</span>
              <span className="font-mono text-[11px] text-muted-foreground">
                {formatPrice(
                  currency === "INR" ? preset.targetBudgetINR : currency === "AUD" ? preset.targetBudgetAUD : preset.targetBudgetUSD,
                  currency
                )}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* MODE 1: GUIDED STEP-BY-STEP BUILDER */}
      {builderMode === "guided" && (
        <div className="space-y-4">
          {/* Step Navigation Tabs */}
          <div className="overflow-x-auto pb-1">
            <div className="flex items-center space-x-1.5 min-w-max">
              {PART_SLOTS.map((slot, sIdx) => {
                const isConfigured = !!parts[slot.type];
                const isActive = currentStepIndex === sIdx;

                return (
                  <button
                    key={slot.type}
                    onClick={() => setCurrentStepIndex(sIdx)}
                    className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors ${
                      isActive
                        ? "bg-foreground text-background border-foreground font-semibold"
                        : isConfigured
                        ? "bg-card text-foreground border-emerald-500/40 hover:border-emerald-500"
                        : "bg-secondary/40 text-muted-foreground border-border hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    <span className="font-mono text-[11px]">0{slot.stepNumber}</span>
                    <span>{slot.label.split(" ")[0]}</span>
                    {isConfigured && <Check className="w-3 h-3 text-emerald-500" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Step Panel */}
          <div className="p-6 rounded-xl bg-card border border-border shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between pb-4 border-b border-border gap-3">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                  Step 0{activeSlot.stepNumber} of 08 / Component Configuration
                </span>
                <h2 className="text-xl font-bold text-foreground mt-0.5">
                  {activeSlot.label}
                </h2>
                <p className="text-xs text-muted-foreground mt-1 max-w-xl">
                  {activeSlot.tip}
                </p>
              </div>

              {/* 1-Click Auto-Suggest Button */}
              <button
                onClick={() => handleAutoSuggestPart(activeSlot.type)}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground border border-border text-xs font-medium transition-colors self-start"
              >
                <Wand2 className="w-3.5 h-3.5 text-muted-foreground" />
                <span>Auto-Match Best Part</span>
              </button>
            </div>

            {/* Current Selected Component Row */}
            {parts[activeSlot.type] ? (
              <div className="p-4 rounded-lg bg-secondary/30 border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start space-x-3">
                  <div className="w-9 h-9 rounded-md bg-secondary flex items-center justify-center font-bold text-emerald-500 shrink-0 border border-border">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[11px] font-mono uppercase text-muted-foreground">
                      {parts[activeSlot.type]?.brand}
                    </div>
                    <h3 className="font-bold text-sm text-foreground mt-0.5">
                      {parts[activeSlot.type]?.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1 font-mono">
                      {parts[activeSlot.type]?.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 shrink-0 sm:text-right">
                  <div className="font-mono text-base font-bold text-foreground">
                    {formatPrice(
                      currency === "INR"
                        ? parts[activeSlot.type]!.basePriceINR
                        : parts[activeSlot.type]!.basePriceAUD,
                      currency
                    )}
                  </div>

                  <button
                    onClick={() => {
                      setActiveModalType(activeSlot.type);
                      setModalSearch("");
                    }}
                    className="px-3 py-1.5 rounded-md bg-card hover:bg-secondary text-foreground font-medium text-xs border border-border transition-colors"
                  >
                    Change
                  </button>

                  <button
                    onClick={() => removePart(activeSlot.type)}
                    className="p-1.5 rounded-md text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10 transition-colors"
                    title="Remove part"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              /* No part selected placeholder */
              <div className="p-8 rounded-lg bg-secondary/20 border border-dashed border-border text-center space-y-3">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center mx-auto text-muted-foreground border border-border">
                  {React.createElement(activeSlot.icon, { className: "w-5 h-5" })}
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-foreground">
                    No {activeSlot.label} Selected
                  </h4>
                  <p className="text-xs text-muted-foreground max-w-sm mx-auto mt-1">
                    {activeSlot.description}. Browse 100% compatible models validated for this build.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setActiveModalType(activeSlot.type);
                    setModalSearch("");
                  }}
                  className="px-4 py-2 rounded-lg bg-foreground hover:bg-foreground/90 text-background font-semibold text-xs transition-colors inline-flex items-center space-x-2"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Browse Compatible Components</span>
                </button>
              </div>
            )}

            {/* Stepper Footer Controls */}
            <div className="pt-4 border-t border-border flex items-center justify-between">
              <button
                disabled={currentStepIndex === 0}
                onClick={() => setCurrentStepIndex((prev) => Math.max(0, prev - 1))}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground text-xs font-medium disabled:opacity-40 disabled:cursor-not-allowed border border-border transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>

              <div className="text-[11px] font-mono text-muted-foreground">
                Step 0{currentStepIndex + 1} of 0{PART_SLOTS.length}
              </div>

              <button
                disabled={currentStepIndex === PART_SLOTS.length - 1}
                onClick={() => setCurrentStepIndex((prev) => Math.min(PART_SLOTS.length - 1, prev + 1))}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-foreground hover:bg-foreground/90 text-background text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: FULL OVERVIEW LIST */}
      {builderMode === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Cols: Slot List */}
          <div className="lg:col-span-2 space-y-2">
            {PART_SLOTS.map((slot) => {
              const Icon = slot.icon;
              const currentPart = parts[slot.type];

              return (
                <div
                  key={slot.type}
                  className={`p-3.5 rounded-lg border transition-colors ${
                    currentPart
                      ? "bg-card border-border"
                      : "bg-secondary/20 border-dashed border-border"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center space-x-3 min-w-0">
                      <div className="w-8 h-8 rounded-md bg-secondary flex items-center justify-center text-muted-foreground shrink-0 border border-border">
                        <Icon className="w-4 h-4" />
                      </div>

                      <div className="min-w-0">
                        <div className="text-[10px] font-mono text-muted-foreground uppercase">
                          {slot.label}
                        </div>
                        {currentPart ? (
                          <div className="font-semibold text-xs sm:text-sm text-foreground truncate">
                            {currentPart.name}
                          </div>
                        ) : (
                          <div className="text-xs text-muted-foreground truncate">
                            {slot.description}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 shrink-0">
                      {currentPart ? (
                        <div className="text-right">
                          <div className="font-mono font-bold text-xs sm:text-sm text-foreground">
                            {formatPrice(
                              currency === "INR"
                                ? currentPart.basePriceINR
                                : currentPart.basePriceAUD,
                              currency
                            )}
                          </div>
                          <div className="flex items-center justify-end space-x-2 text-[11px] mt-0.5">
                            <button
                              onClick={() => {
                                setActiveModalType(slot.type);
                                setModalSearch("");
                              }}
                              className="text-muted-foreground hover:text-foreground font-medium"
                            >
                              Change
                            </button>
                            <span className="text-muted-foreground">·</span>
                            <button
                              onClick={() => removePart(slot.type)}
                              className="text-rose-500 hover:underline"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setActiveModalType(slot.type);
                            setModalSearch("");
                          }}
                          className="flex items-center space-x-1 px-2.5 py-1.5 rounded-md bg-card hover:bg-secondary text-foreground font-medium text-xs border border-border transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Choose</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Col: Cost & Compatibility Summary */}
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-card border border-border shadow-sm space-y-3">
              <h3 className="font-bold text-xs uppercase tracking-wider text-muted-foreground pb-2 border-b border-border">
                Build Specs & Compatibility
              </h3>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Components</span>
                  <span className="font-mono font-semibold text-foreground">
                    {selectedPartsCount} / {PART_SLOTS.length}
                  </span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Estimated Draw</span>
                  <span className="font-mono font-semibold text-foreground">
                    ~{compatibility.totalEstimatedWattage}W
                  </span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Compatibility</span>
                  <span
                    className={`font-semibold ${
                      compatibility.isCompatible ? "text-emerald-500" : "text-rose-500"
                    }`}
                  >
                    {compatibility.isCompatible ? "100% Compatible" : "Issues Detected"}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-border flex items-baseline justify-between">
                <span className="text-xs text-muted-foreground font-medium">Estimated Total:</span>
                <span className="text-xl font-mono font-extrabold text-foreground">
                  {formatPrice(totalPrice, currency)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* COMPONENT SELECTION MODAL */}
      {activeModalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-card border border-border rounded-xl max-w-2xl w-full max-h-[80vh] flex flex-col shadow-xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-foreground">
                  Choose {PART_SLOTS.find((s) => s.type === activeModalType)?.label}
                </h3>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  Filtered against active CPU socket, DDR standard, and chassis clearance.
                </p>
              </div>
              <button
                onClick={() => setActiveModalType(null)}
                className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground text-xs"
              >
                ✕
              </button>
            </div>

            {/* Filter & Search Bar */}
            <div className="p-3 border-b border-border bg-secondary/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <input
                type="text"
                placeholder="Search models, brands, chipsets..."
                value={modalSearch}
                onChange={(e) => setModalSearch(e.target.value)}
                className="w-full sm:max-w-xs bg-card border border-border rounded-md py-1.5 px-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-foreground"
              />

              <label className="flex items-center space-x-1.5 text-xs text-muted-foreground cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={onlyCompatibleFilter}
                  onChange={(e) => setOnlyCompatibleFilter(e.target.checked)}
                  className="rounded border-border text-foreground focus:ring-0 w-3.5 h-3.5"
                />
                <span>Only 100% Compatible</span>
              </label>
            </div>

            {/* Candidate List */}
            <div className="p-3 overflow-y-auto space-y-2 flex-1">
              {modalCandidates.length === 0 ? (
                <div className="py-10 text-center text-xs text-muted-foreground space-y-2">
                  <p>No components match your search and filter criteria.</p>
                  <button
                    onClick={() => setOnlyCompatibleFilter(false)}
                    className="text-foreground font-semibold underline"
                  >
                    View all items without compatibility filter
                  </button>
                </div>
              ) : (
                modalCandidates.map(({ product, evalResult }) => (
                  <div
                    key={product.id}
                    className={`p-3 rounded-lg border transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      evalResult.isCompatible
                        ? "bg-card border-border hover:bg-secondary/40"
                        : "bg-secondary/20 border-border/60 opacity-60"
                    }`}
                  >
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[10px] font-mono uppercase text-muted-foreground">
                          {product.brand}
                        </span>

                        <span
                          className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                            evalResult.status === "optimal"
                              ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                              : evalResult.status === "warning"
                              ? "bg-amber-500/10 text-amber-500 border border-amber-500/20"
                              : evalResult.status === "incompatible"
                              ? "bg-rose-500/10 text-rose-500 border border-rose-500/20"
                              : "bg-secondary text-muted-foreground"
                          }`}
                        >
                          {evalResult.badgeText}
                        </span>
                      </div>

                      <h4 className="font-semibold text-xs text-foreground truncate">
                        {product.name}
                      </h4>

                      <p className="text-[11px] text-muted-foreground truncate">
                        {evalResult.reason}
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end space-x-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-border">
                      <div className="text-right">
                        <div className="font-mono font-bold text-xs sm:text-sm text-foreground">
                          {formatPrice(
                            currency === "INR"
                              ? product.basePriceINR
                              : product.basePriceAUD,
                            currency
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setPart(activeModalType, product);
                          setActiveModalType(null);
                        }}
                        className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                          evalResult.isCompatible
                            ? "bg-foreground hover:bg-foreground/90 text-background"
                            : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                        }`}
                      >
                        {evalResult.isCompatible ? "Select" : "Add Anyway"}
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
