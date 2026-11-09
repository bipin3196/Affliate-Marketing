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
  Wand2
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
          // If onlyCompatible is ON, hide completely incompatible items
          if (onlyCompatibleFilter && !evalResult.isCompatible) return false;
          // Search filter
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

  // Auto-Suggest Best Matching Component for a Slot
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-6 border-b border-border/80 gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full mb-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>Interactive Guided PC Builder (Centre Com & PCPartPicker Architecture)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
            Smart Gaming PC Builder
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Step-by-step guided hardware selection with automated socket checks, DDR4/DDR5 auto-filtering, and GPU wattage calculations.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Builder Mode Toggle */}
          <div className="flex items-center p-1 rounded-xl bg-secondary/60 border border-border">
            <button
              onClick={() => setBuilderMode("guided")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                builderMode === "guided"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Guided Steps
            </button>
            <button
              onClick={() => setBuilderMode("overview")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
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
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground text-xs font-semibold border border-border transition-colors"
          >
            <Copy className="w-4 h-4 text-muted-foreground" />
            <span>{copyFeedback ? "Copied Part List!" : "Copy Markdown"}</span>
          </button>

          <button
            onClick={handleSaveToDashboard}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-500/20 transition-colors"
          >
            <BookmarkCheck className="w-4 h-4" />
            <span>{saveFeedback ? "Saved!" : "Save Build"}</span>
          </button>

          <button
            onClick={clearBuild}
            className="p-2 rounded-xl bg-secondary hover:bg-destructive/10 hover:text-destructive text-muted-foreground text-xs border border-border"
            title="Reset build"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Progress & Wattage Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-card border border-border shadow-md space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs font-bold gap-2">
          <div className="flex items-center space-x-2">
            <span className="text-foreground">Configuration Progress:</span>
            <span className="text-primary font-black">{selectedPartsCount} / {PART_SLOTS.length} Components Selected ({progressPercent}%)</span>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1.5">
              <Zap className="w-4 h-4 text-amber-500" />
              <span className="text-muted-foreground">Power Draw:</span>
              <span className="text-foreground font-black">~{compatibility.totalEstimatedWattage}W</span>
            </div>
            <div className="text-muted-foreground">
              Recommended PSU: <span className="text-foreground font-bold">{compatibility.recommendedPsuWattage}W+</span>
            </div>
          </div>
        </div>

        <div className="w-full bg-secondary h-2.5 rounded-full overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-600 to-cyan-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Quick Budget / Purpose Presets */}
      <div className="p-4 rounded-2xl bg-secondary/30 border border-border/70 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center">
          <Sparkles className="w-3.5 h-3.5 mr-1.5 text-blue-500" />
          Pre-Configured System Templates:
        </div>

        <div className="flex flex-wrap gap-2">
          {PC_BUILDS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => loadBuild(preset)}
              className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-card hover:bg-primary hover:text-white border border-border shadow-sm transition-all flex items-center space-x-2 group"
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

      {/* MODE 1: GUIDED STEP-BY-STEP BUILDER (Centre Com Style) */}
      {builderMode === "guided" && (
        <div className="space-y-6">
          {/* Step Navigation Tabs */}
          <div className="overflow-x-auto pb-2">
            <div className="flex items-center space-x-2 min-w-max">
              {PART_SLOTS.map((slot, sIdx) => {
                const Icon = slot.icon;
                const isConfigured = !!parts[slot.type];
                const isActive = currentStepIndex === sIdx;

                return (
                  <button
                    key={slot.type}
                    onClick={() => setCurrentStepIndex(sIdx)}
                    className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-2xl border text-xs font-bold transition-all ${
                      isActive
                        ? "bg-primary text-white border-primary shadow-md scale-105"
                        : isConfigured
                        ? "bg-card text-foreground border-emerald-500/50 hover:border-emerald-500"
                        : "bg-secondary/40 text-muted-foreground border-border hover:bg-secondary"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                        isActive
                          ? "bg-white/20 text-white"
                          : isConfigured
                          ? "bg-emerald-500 text-white"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {isConfigured ? <Check className="w-3 h-3" /> : slot.stepNumber}
                    </div>
                    <span>{slot.label.split(" ")[0]}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Step Panel */}
          <div className="p-6 sm:p-8 rounded-3xl bg-card border-2 border-border shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border/80 gap-3">
              <div>
                <span className="text-xs font-bold text-primary uppercase tracking-wider">
                  Step {activeSlot.stepNumber} of 8 • Hardware Selection
                </span>
                <h2 className="text-2xl font-black text-foreground mt-0.5">
                  Select {activeSlot.label}
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  {activeSlot.tip}
                </p>
              </div>

              {/* 1-Click Auto-Suggest Button */}
              <button
                onClick={() => handleAutoSuggestPart(activeSlot.type)}
                className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 text-xs font-bold self-start sm:self-auto transition-transform hover:scale-105"
              >
                <Wand2 className="w-4 h-4" />
                <span>Auto-Pick Best Match</span>
              </button>
            </div>

            {/* Current Selected Component Card (If chosen) */}
            {parts[activeSlot.type] ? (
              <div className="p-5 rounded-2xl bg-emerald-500/5 border-2 border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-primary uppercase">
                      Selected: {parts[activeSlot.type]?.brand}
                    </span>
                    <h3 className="font-bold text-base text-foreground mt-0.5">
                      {parts[activeSlot.type]?.name}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                      {parts[activeSlot.type]?.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 shrink-0 sm:text-right">
                  <div>
                    <div className="text-xs text-muted-foreground">Price:</div>
                    <div className="text-xl font-black text-foreground">
                      {formatPrice(
                        currency === "INR"
                          ? parts[activeSlot.type]!.basePriceINR
                          : parts[activeSlot.type]!.basePriceAUD,
                        currency
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setActiveModalType(activeSlot.type);
                      setModalSearch("");
                    }}
                    className="px-3.5 py-2 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-semibold text-xs border border-border"
                  >
                    Change
                  </button>

                  <button
                    onClick={() => removePart(activeSlot.type)}
                    className="p-2 rounded-xl text-destructive hover:bg-destructive/10"
                    title="Remove part"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              /* No part selected yet: Call to Action */
              <div className="p-8 rounded-2xl bg-secondary/20 border-2 border-dashed border-border text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-secondary flex items-center justify-center mx-auto text-muted-foreground">
                  {React.createElement(activeSlot.icon, { className: "w-6 h-6" })}
                </div>
                <h4 className="font-bold text-base text-foreground">
                  No {activeSlot.label} Selected Yet
                </h4>
                <p className="text-xs text-muted-foreground max-w-md mx-auto">
                  {activeSlot.description}. Click below to browse all 100% compatible models filtered for your build.
                </p>
                <button
                  onClick={() => {
                    setActiveModalType(activeSlot.type);
                    setModalSearch("");
                  }}
                  className="px-6 py-3 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-xs shadow-md shadow-primary/20 transition-transform hover:scale-105 inline-flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Browse Compatible {activeSlot.label}</span>
                </button>
              </div>
            )}

            {/* Stepper Footer Controls */}
            <div className="pt-4 border-t border-border/80 flex items-center justify-between">
              <button
                disabled={currentStepIndex === 0}
                onClick={() => setCurrentStepIndex((prev) => Math.max(0, prev - 1))}
                className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Step</span>
              </button>

              <div className="text-xs font-bold text-muted-foreground">
                Step {currentStepIndex + 1} of {PART_SLOTS.length}
              </div>

              <button
                disabled={currentStepIndex === PART_SLOTS.length - 1}
                onClick={() => setCurrentStepIndex((prev) => Math.min(PART_SLOTS.length - 1, prev + 1))}
                className="flex items-center space-x-1.5 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-black shadow-sm disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <span>Next Step</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: FULL OVERVIEW GRID */}
      {builderMode === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Cols: Slot List */}
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

                    <div className="flex items-center space-x-3">
                      {currentPart ? (
                        <div className="text-right">
                          <div className="font-extrabold text-sm sm:text-base text-foreground">
                            {formatPrice(
                              currency === "INR"
                                ? currentPart.basePriceINR
                                : currentPart.basePriceAUD,
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
                          className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs shadow-sm transition-transform hover:scale-[1.02]"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Choose {slot.label.split(" ")[0]}</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Col: Cost & Compatibility Summary */}
          <div className="space-y-6">
            <div className="p-5 rounded-3xl bg-card border border-border shadow-lg space-y-4">
              <h3 className="font-black text-base text-foreground pb-2 border-b border-border/80">
                System Price & Compatibility
              </h3>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Selected Parts</span>
                  <span className="font-bold text-foreground">
                    {selectedPartsCount} / {PART_SLOTS.length} Parts
                  </span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Estimated Draw</span>
                  <span className="font-bold text-foreground">
                    ~{compatibility.totalEstimatedWattage} W
                  </span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Compatibility Verdict</span>
                  <span
                    className={`font-bold ${
                      compatibility.isCompatible ? "text-emerald-600" : "text-destructive"
                    }`}
                  >
                    {compatibility.isCompatible ? "100% Compatible" : "Issues Detected"}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-border/80 flex items-baseline justify-between">
                <span className="text-sm font-bold text-muted-foreground">Total Price:</span>
                <span className="text-2xl font-black text-foreground">
                  {formatPrice(totalPrice, currency)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* COMPONENT SELECTION MODAL WITH SMART AUTO-FILTERING */}
      {activeModalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-card border-2 border-border rounded-3xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 border-b border-border flex items-center justify-between">
              <div>
                <h3 className="font-black text-lg text-foreground">
                  Choose {PART_SLOTS.find((s) => s.type === activeModalType)?.label}
                </h3>
                <p className="text-xs text-muted-foreground">
                  Evaluating compatibility against your active processor, socket, and wattage requirements.
                </p>
              </div>
              <button
                onClick={() => setActiveModalType(null)}
                className="p-2 rounded-xl hover:bg-secondary text-muted-foreground"
              >
                ✕
              </button>
            </div>

            {/* Filter & Search Bar */}
            <div className="p-4 border-b border-border/60 bg-secondary/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <input
                type="text"
                placeholder="Search models, brands, chipsets..."
                value={modalSearch}
                onChange={(e) => setModalSearch(e.target.value)}
                className="w-full sm:max-w-md bg-card border border-border rounded-xl py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />

              {/* Auto-Filter Toggle */}
              <label className="flex items-center space-x-2 text-xs font-bold text-foreground cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={onlyCompatibleFilter}
                  onChange={(e) => setOnlyCompatibleFilter(e.target.checked)}
                  className="rounded border-border text-primary focus:ring-primary w-4 h-4"
                />
                <span className="flex items-center">
                  <Filter className="w-3.5 h-3.5 mr-1 text-primary" />
                  Only Show Compatible Parts
                </span>
              </label>
            </div>

            {/* Candidate List with Live Compatibility Badges */}
            <div className="p-4 overflow-y-auto space-y-3 flex-1">
              {modalCandidates.length === 0 ? (
                <div className="py-12 text-center text-xs text-muted-foreground space-y-2">
                  <p>No components match your search and compatibility filter.</p>
                  <button
                    onClick={() => setOnlyCompatibleFilter(false)}
                    className="text-primary font-bold underline"
                  >
                    Turn off compatibility filter to view all products
                  </button>
                </div>
              ) : (
                modalCandidates.map(({ product, evalResult }) => (
                  <div
                    key={product.id}
                    className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      evalResult.isCompatible
                        ? "bg-card border-border hover:border-primary/60 hover:bg-secondary/20"
                        : "bg-destructive/5 border-destructive/30 opacity-75"
                    }`}
                  >
                    <div className="flex-1 space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold text-primary uppercase">
                          {product.brand}
                        </span>

                        {/* Live Compatibility Badge */}
                        <span
                          className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full flex items-center ${
                            evalResult.status === "optimal"
                              ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                              : evalResult.status === "warning"
                              ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30"
                              : evalResult.status === "incompatible"
                              ? "bg-destructive/15 text-destructive border border-destructive/30"
                              : "bg-blue-500/15 text-blue-600 border border-blue-500/30"
                          }`}
                        >
                          {evalResult.isCompatible ? (
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                          ) : (
                            <ShieldAlert className="w-3 h-3 mr-1" />
                          )}
                          <span>{evalResult.badgeText}</span>
                        </span>
                      </div>

                      <h4 className="font-bold text-sm text-foreground">
                        {product.name}
                      </h4>

                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {evalResult.reason}
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end space-x-4 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-border">
                      <div className="text-right">
                        <div className="font-black text-base text-foreground">
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
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-transform hover:scale-105 shadow-sm ${
                          evalResult.isCompatible
                            ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                            : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                        }`}
                      >
                        {evalResult.isCompatible ? "Select Part" : "Add Anyway"}
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
