"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Zap,
  Cpu,
  Monitor,
  Flame,
  Gauge,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sliders,
  ExternalLink
} from "lucide-react";
import {
  SUPPORTED_GAMES,
  estimateFps,
  GameOption
} from "@/data/fpsBenchmarks";
import { PRODUCTS } from "@/data/products";
import { formatPrice } from "@/lib/currency";
import { useCurrencyStore } from "@/store/useCurrencyStore";

export function FPSEstimatorView() {
  const { currency } = useCurrencyStore();

  const cpus = PRODUCTS.filter((p) => p.pcPartType === "cpu");
  const gpus = PRODUCTS.filter((p) => p.pcPartType === "gpu");

  const [selectedCpuId, setSelectedCpuId] = useState(cpus[0]?.id || "amd-ryzen-7-7800x3d");
  const [selectedGpuId, setSelectedGpuId] = useState(gpus[0]?.id || "nvidia-geforce-rtx-4070-super");
  const [selectedGameId, setSelectedGameId] = useState(SUPPORTED_GAMES[0].id);
  const [resolution, setResolution] = useState<"1080p" | "1440p" | "4K">("1080p");
  const [preset, setPreset] = useState<"Low" | "Medium" | "High" | "Ultra" | "Ray Tracing">("Ultra");

  const selectedCpu = cpus.find((c) => c.id === selectedCpuId);
  const selectedGpu = gpus.find((g) => g.id === selectedGpuId);
  const selectedGame = SUPPORTED_GAMES.find((g) => g.id === selectedGameId) || SUPPORTED_GAMES[0];

  const result = estimateFps(selectedCpuId, selectedGpuId, selectedGameId, resolution, preset);

  // Pre-calculate comparison resolutions for bar charts
  const fps1080 = estimateFps(selectedCpuId, selectedGpuId, selectedGameId, "1080p", preset).avgFps;
  const fps1440 = estimateFps(selectedCpuId, selectedGpuId, selectedGameId, "1440p", preset).avgFps;
  const fps4K = estimateFps(selectedCpuId, selectedGpuId, selectedGameId, "4K", preset).avgFps;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Title */}
      <div className="pb-6 border-b border-border/80">
        <div className="inline-flex items-center space-x-2 text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full mb-2">
          <Zap className="w-3.5 h-3.5" />
          <span>Real Hardware Game FPS Estimator & Bottleneck Analyzer</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
          Gaming FPS Estimator
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Select any processor, graphics card, title, and resolution to preview real-world average frame rates, 1% low stutters, and hardware headroom.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Left 2 Cols: Selection Controls */}
        <div className="lg:col-span-2 space-y-6">
          {/* 1. Game Selection Cards */}
          <div className="p-5 rounded-2xl bg-card border border-border shadow-md">
            <h3 className="font-bold text-sm text-foreground uppercase tracking-wider mb-3 flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-black">
                  1
                </span>
                <span>Select Game</span>
              </span>
              <span className="text-xs text-muted-foreground font-normal">
                {SUPPORTED_GAMES.length} Benchmarked Titles
              </span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {SUPPORTED_GAMES.map((game) => (
                <button
                  key={game.id}
                  onClick={() => setSelectedGameId(game.id)}
                  className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden flex flex-col justify-between ${
                    selectedGameId === game.id
                      ? "border-primary bg-primary/5 ring-2 ring-primary/20 shadow-md"
                      : "border-border/80 bg-secondary/30 hover:bg-secondary/60"
                  }`}
                >
                  <div>
                    <div className="text-[10px] font-bold text-primary uppercase">
                      {game.engine}
                    </div>
                    <div className="text-xs font-bold text-foreground mt-0.5 line-clamp-1">
                      {game.name}
                    </div>
                  </div>
                  <div className="text-[10px] text-muted-foreground mt-2">
                    {game.genre}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Hardware Selection (CPU & GPU) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* CPU Selector */}
            <div className="p-5 rounded-2xl bg-card border border-border shadow-md">
              <div className="flex items-center space-x-2 font-bold text-sm text-foreground uppercase tracking-wider mb-3">
                <span className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center text-xs font-black">
                  2
                </span>
                <span>Processor (CPU)</span>
              </div>
              <div className="space-y-2">
                {cpus.map((cpu) => (
                  <button
                    key={cpu.id}
                    onClick={() => setSelectedCpuId(cpu.id)}
                    className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-center justify-between text-xs ${
                      selectedCpuId === cpu.id
                        ? "border-blue-500 bg-blue-500/5 ring-1 ring-blue-500/30 font-bold"
                        : "border-border/80 bg-secondary/20 hover:bg-secondary/50 font-medium"
                    }`}
                  >
                    <span className="line-clamp-1">{cpu.name}</span>
                    <span className="text-[11px] text-muted-foreground shrink-0 ml-2">
                      {cpu.componentSpecs?.socket}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* GPU Selector */}
            <div className="p-5 rounded-2xl bg-card border border-border shadow-md">
              <div className="flex items-center space-x-2 font-bold text-sm text-foreground uppercase tracking-wider mb-3">
                <span className="w-6 h-6 rounded-full bg-purple-500/10 text-purple-500 flex items-center justify-center text-xs font-black">
                  3
                </span>
                <span>Graphics Card (GPU)</span>
              </div>
              <div className="space-y-2">
                {gpus.map((gpu) => (
                  <button
                    key={gpu.id}
                    onClick={() => setSelectedGpuId(gpu.id)}
                    className={`w-full p-2.5 rounded-xl border text-left transition-all flex items-center justify-between text-xs ${
                      selectedGpuId === gpu.id
                        ? "border-purple-500 bg-purple-500/5 ring-1 ring-purple-500/30 font-bold"
                        : "border-border/80 bg-secondary/20 hover:bg-secondary/50 font-medium"
                    }`}
                  >
                    <span className="line-clamp-1">{gpu.name}</span>
                    <span className="text-[11px] text-muted-foreground shrink-0 ml-2">
                      {gpu.componentSpecs?.vramGB}GB VRAM
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 3. Resolution and Quality Preset Toggles */}
          <div className="p-5 rounded-2xl bg-card border border-border shadow-md space-y-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center space-x-1.5">
                <Monitor className="w-4 h-4 text-blue-500" />
                <span>Target Resolution</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(["1080p", "1440p", "4K"] as const).map((res) => (
                  <button
                    key={res}
                    onClick={() => setResolution(res)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                      resolution === res
                        ? "bg-primary text-white border-primary shadow-sm"
                        : "bg-secondary/40 hover:bg-secondary text-foreground border-border"
                    }`}
                  >
                    {res === "1080p" ? "1080p Full HD" : res === "1440p" ? "1440p QHD 2K" : "4K UHD (2160p)"}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center space-x-1.5">
                <Sliders className="w-4 h-4 text-purple-500" />
                <span>Graphics Quality Preset</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {(["Low", "Medium", "High", "Ultra", "Ray Tracing"] as const).map((q) => (
                  <button
                    key={q}
                    onClick={() => setPreset(q)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                      preset === q
                        ? "bg-secondary text-primary border-primary font-bold shadow-sm"
                        : "bg-secondary/30 hover:bg-secondary text-muted-foreground border-border"
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Benchmark Output & FPS Gauge */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-card border-2 border-border/90 shadow-2xl space-y-6">
            <div className="text-center pb-4 border-b border-border/80">
              <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                Estimated Performance in
              </div>
              <div className="text-lg font-black text-foreground mt-0.5">
                {selectedGame.name}
              </div>
              <div className="text-xs text-primary font-semibold mt-0.5">
                {resolution} • {preset} Quality
              </div>
            </div>

            {/* Big FPS Gauge Display */}
            <div className="py-4 text-center bg-gradient-to-b from-blue-500/10 via-background to-secondary/30 rounded-2xl border border-blue-500/20">
              <div className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Average Frame Rate
              </div>
              <div className="text-6xl font-black tracking-tight text-foreground my-1">
                {result.avgFps}
                <span className="text-lg font-bold text-muted-foreground ml-1.5">FPS</span>
              </div>
              <div className="inline-flex items-center space-x-1 text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>1% Low: {result.onePercentLow} FPS</span>
              </div>
            </div>

            {/* Playable Rating Pill */}
            <div className="p-3.5 rounded-xl bg-secondary/50 border border-border flex items-center justify-between text-xs">
              <span className="text-muted-foreground font-medium">Performance Tier:</span>
              <span className="font-extrabold text-foreground bg-primary/10 text-primary px-2.5 py-1 rounded-lg">
                {result.playableRating}
              </span>
            </div>

            {/* Bottleneck Status */}
            <div className="p-3.5 rounded-xl bg-secondary/50 border border-border flex items-center justify-between text-xs">
              <span className="text-muted-foreground font-medium">Hardware Pairing:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                {result.bottleneck}
              </span>
            </div>

            {/* Resolution Scaling Bars */}
            <div className="space-y-2 pt-2 border-t border-border/80">
              <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Resolution Scaling (Avg FPS)
              </div>
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span>1080p Ultra</span>
                  <span className="font-bold">{fps1080} FPS</span>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-500 h-full rounded-full"
                    style={{ width: `${Math.min(100, (fps1080 / 300) * 100)}%` }}
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span>1440p Ultra</span>
                  <span className="font-bold">{fps1440} FPS</span>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-500 h-full rounded-full"
                    style={{ width: `${Math.min(100, (fps1440 / 300) * 100)}%` }}
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span>4K UHD Ultra</span>
                  <span className="font-bold">{fps4K} FPS</span>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-purple-500 h-full rounded-full"
                    style={{ width: `${Math.min(100, (fps4K / 300) * 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Direct Hardware Links */}
            <div className="pt-2 space-y-2">
              {selectedGpu && (
                <a
                  href={selectedGpu.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs shadow-md shadow-primary/20 transition-transform hover:scale-[1.01]"
                >
                  <span>Check {selectedGpu.name.split(" ")[2]} Price</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              <Link
                href="/pc-builder"
                className="w-full flex items-center justify-center space-x-1.5 py-2.5 rounded-xl bg-secondary hover:bg-secondary/80 font-bold text-xs text-foreground border border-border"
              >
                <span>Add this combo to PC Builder</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
