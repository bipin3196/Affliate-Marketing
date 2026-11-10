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
  ExternalLink,
} from "lucide-react";
import {
  SUPPORTED_GAMES,
  estimateFps,
  GameOption,
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="pb-6 border-b border-border/80">
        <div className="inline-flex items-center space-x-2 text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>Performance Telemetry</span>
          <span>/</span>
          <span className="text-foreground">Silicon Benchmark Suite</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
          Gaming FPS Estimator
        </h1>
        <p className="text-xs text-muted-foreground mt-1 max-w-2xl">
          Pair any desktop processor with modern graphics cards to evaluate real-world frame rates, 1% low pacing, and GPU/CPU headroom.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Controls */}
        <div className="lg:col-span-2 space-y-4">
          {/* 1. Game Selection */}
          <div className="p-4 rounded-xl bg-card border border-border shadow-xs">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-border">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                01 / Select Benchmark Title
              </span>
              <span className="font-mono text-[11px] text-muted-foreground">
                {SUPPORTED_GAMES.length} Titles
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {SUPPORTED_GAMES.map((game) => {
                const isSelected = selectedGameId === game.id;
                return (
                  <button
                    key={game.id}
                    onClick={() => setSelectedGameId(game.id)}
                    className={`p-2.5 rounded-lg border text-left transition-colors flex flex-col justify-between ${
                      isSelected
                        ? "border-foreground bg-secondary/80 font-semibold text-foreground shadow-xs"
                        : "border-border bg-card hover:bg-secondary/40 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <div>
                      <div className="text-[10px] font-mono uppercase text-muted-foreground">
                        {game.engine}
                      </div>
                      <div className="text-xs font-semibold text-foreground mt-0.5 truncate">
                        {game.name}
                      </div>
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-2">
                      {game.genre}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Hardware Pairing (CPU & GPU) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* CPU */}
            <div className="p-4 rounded-xl bg-card border border-border shadow-xs">
              <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-3 pb-2 border-b border-border">
                02 / Processor (CPU)
              </div>
              <div className="space-y-1.5">
                {cpus.map((cpu) => {
                  const isSelected = selectedCpuId === cpu.id;
                  return (
                    <button
                      key={cpu.id}
                      onClick={() => setSelectedCpuId(cpu.id)}
                      className={`w-full p-2 rounded-md border text-left transition-colors flex items-center justify-between text-xs ${
                        isSelected
                          ? "border-foreground bg-secondary/80 font-semibold text-foreground"
                          : "border-border/60 bg-card hover:bg-secondary/30 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <span className="truncate">{cpu.name}</span>
                      <span className="font-mono text-[11px] text-muted-foreground shrink-0 ml-2">
                        {cpu.componentSpecs?.socket}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* GPU */}
            <div className="p-4 rounded-xl bg-card border border-border shadow-xs">
              <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-3 pb-2 border-b border-border">
                03 / Graphics Card (GPU)
              </div>
              <div className="space-y-1.5">
                {gpus.map((gpu) => {
                  const isSelected = selectedGpuId === gpu.id;
                  return (
                    <button
                      key={gpu.id}
                      onClick={() => setSelectedGpuId(gpu.id)}
                      className={`w-full p-2 rounded-md border text-left transition-colors flex items-center justify-between text-xs ${
                        isSelected
                          ? "border-foreground bg-secondary/80 font-semibold text-foreground"
                          : "border-border/60 bg-card hover:bg-secondary/30 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <span className="truncate">{gpu.name}</span>
                      <span className="font-mono text-[11px] text-muted-foreground shrink-0 ml-2">
                        {gpu.componentSpecs?.vramGB}GB
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 3. Resolution & Preset Controls */}
          <div className="p-4 rounded-xl bg-card border border-border shadow-xs space-y-3">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-2">
                Resolution Target
              </div>
              <div className="grid grid-cols-3 gap-2">
                {(["1080p", "1440p", "4K"] as const).map((res) => (
                  <button
                    key={res}
                    onClick={() => setResolution(res)}
                    className={`py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      resolution === res
                        ? "bg-foreground text-background border-foreground font-semibold"
                        : "bg-secondary/40 hover:bg-secondary text-muted-foreground hover:text-foreground border-border"
                    }`}
                  >
                    {res === "1080p" ? "1080p FHD" : res === "1440p" ? "1440p QHD" : "4K UHD"}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-2">
                Quality Preset
              </div>
              <div className="flex flex-wrap gap-1.5">
                {(["Low", "Medium", "High", "Ultra", "Ray Tracing"] as const).map((q) => (
                  <button
                    key={q}
                    onClick={() => setPreset(q)}
                    className={`px-3 py-1 rounded-md text-xs font-medium border transition-colors ${
                      preset === q
                        ? "bg-foreground text-background border-foreground font-semibold"
                        : "bg-secondary/30 hover:bg-secondary text-muted-foreground hover:text-foreground border-border"
                    }`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Monospace Metric Readout */}
        <div className="space-y-4">
          <div className="p-5 rounded-xl bg-card border border-border shadow-sm space-y-5">
            <div className="pb-3 border-b border-border">
              <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                Telemetry Readout
              </div>
              <div className="font-bold text-sm text-foreground mt-0.5">
                {selectedGame.name}
              </div>
              <div className="font-mono text-[11px] text-muted-foreground mt-0.5">
                {resolution} · {preset} Preset
              </div>
            </div>

            {/* Monospace FPS Display */}
            <div className="p-5 text-center bg-secondary/30 rounded-lg border border-border">
              <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                Average Frame Rate
              </div>
              <div className="text-5xl font-mono font-black tracking-tight text-foreground my-2">
                {result.avgFps}
                <span className="text-sm font-sans font-medium text-muted-foreground ml-1">FPS</span>
              </div>
              <div className="inline-flex items-center space-x-1 font-mono text-[11px] px-2 py-0.5 rounded bg-secondary text-muted-foreground border border-border">
                <span>1% Low:</span>
                <span className="font-bold text-foreground">{result.onePercentLow} FPS</span>
              </div>
            </div>

            {/* Pacing Verdict */}
            <div className="p-3 rounded-lg bg-secondary/20 border border-border flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Experience Tier:</span>
              <span className="font-mono font-semibold text-foreground">
                {result.playableRating}
              </span>
            </div>

            <div className="p-3 rounded-lg bg-secondary/20 border border-border flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Pairing Balance:</span>
              <span className="font-mono text-[11px] text-emerald-500 font-medium">
                {result.bottleneck}
              </span>
            </div>

            {/* Resolution Scaling Bars */}
            <div className="space-y-2 pt-2 border-t border-border">
              <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                Resolution Scaling
              </div>
              <div className="space-y-2 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span className="text-muted-foreground">1080p Ultra</span>
                    <span className="font-bold text-foreground">{fps1080} FPS</span>
                  </div>
                  <div className="w-full bg-secondary h-1 rounded-full overflow-hidden">
                    <div
                      className="bg-foreground h-full"
                      style={{ width: `${Math.min(100, (fps1080 / 300) * 100)}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span className="text-muted-foreground">1440p Ultra</span>
                    <span className="font-bold text-foreground">{fps1440} FPS</span>
                  </div>
                  <div className="w-full bg-secondary h-1 rounded-full overflow-hidden">
                    <div
                      className="bg-foreground h-full"
                      style={{ width: `${Math.min(100, (fps1440 / 300) * 100)}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span className="text-muted-foreground">4K Ultra</span>
                    <span className="font-bold text-foreground">{fps4K} FPS</span>
                  </div>
                  <div className="w-full bg-secondary h-1 rounded-full overflow-hidden">
                    <div
                      className="bg-foreground h-full"
                      style={{ width: `${Math.min(100, (fps4K / 300) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
