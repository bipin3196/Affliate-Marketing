"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Scale,
  Plus,
  Trash2,
  ExternalLink,
  Award,
  Zap,
  Check,
  X,
  Sparkles,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { useComparisonStore } from "@/store/useComparisonStore";
import { useCurrencyStore } from "@/store/useCurrencyStore";
import { PRODUCTS } from "@/data/products";
import { formatPrice } from "@/lib/currency";
import { Product } from "@/types";

export function ProductComparisonView() {
  const { compareList, addToCompare, removeFromCompare, clearCompare } = useComparisonStore();
  const { currency, region } = useCurrencyStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchFilter, setSearchFilter] = useState("");

  const bestPerformanceProduct =
    compareList.length > 0
      ? [...compareList].sort(
          (a, b) => (b.reviewScores?.performance || 0) - (a.reviewScores?.performance || 0)
        )[0]
      : null;

  const lowestPriceProduct =
    compareList.length > 0
      ? [...compareList].sort((a, b) => a.basePriceINR - b.basePriceINR)[0]
      : null;

  const highestRatedProduct =
    compareList.length > 0
      ? [...compareList].sort((a, b) => b.rating - a.rating)[0]
      : null;

  const availableToAdd = PRODUCTS.filter(
    (p) =>
      !compareList.some((c) => c.id === p.id) &&
      (p.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchFilter.toLowerCase()) ||
        p.category.toLowerCase().includes(searchFilter.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-border/80 gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span>Benchmark Matrix</span>
            <span>/</span>
            <span className="text-foreground">Side-by-Side Evaluation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Compare Tech Products
          </h1>
          <p className="text-xs text-muted-foreground mt-1 max-w-2xl">
            Compare verified technical specifications, lab rating scores, and cross-retailer prices for up to 4 items simultaneously.
          </p>
        </div>

        {compareList.length > 0 && (
          <button
            onClick={clearCompare}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-secondary hover:bg-rose-500/10 hover:text-rose-500 text-muted-foreground text-xs font-medium border border-border transition-colors self-start"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear All</span>
          </button>
        )}
      </div>

      {/* Comparison Grid */}
      {compareList.length === 0 ? (
        <div className="my-16 text-center max-w-md mx-auto p-8 rounded-xl bg-card border border-border">
          <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mx-auto mb-3 text-muted-foreground border border-border">
            <Scale className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-foreground">No Products in Matrix</h3>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            Select up to 4 products from the hardware catalog to compare architecture, benchmark ratings, and regional pricing side-by-side.
          </p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="mt-5 px-4 py-2 rounded-lg bg-foreground hover:bg-foreground/90 text-background font-semibold text-xs transition-colors"
          >
            + Add Products to Compare
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Products Header Row (Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {compareList.map((product) => {
              const isWinner = highestRatedProduct?.id === product.id;
              const isBestValue = lowestPriceProduct?.id === product.id;
              const isTopPerformance = bestPerformanceProduct?.id === product.id;

              return (
                <div
                  key={product.id}
                  className="p-4 rounded-xl bg-card border border-border flex flex-col justify-between relative group hover:border-foreground/30 transition-colors"
                >
                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCompare(product.id)}
                    className="absolute top-3 right-3 p-1 rounded-md bg-secondary/60 hover:bg-rose-500/10 hover:text-rose-500 text-muted-foreground transition-colors"
                    title="Remove from matrix"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>

                  <div>
                    {/* Badge Pill */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {isWinner && (
                        <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-500 border border-amber-500/20">
                          Overall Winner
                        </span>
                      )}
                      {isBestValue && (
                        <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                          Best Value
                        </span>
                      )}
                      {isTopPerformance && !isWinner && (
                        <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-500 border border-blue-500/20">
                          Top Performance
                        </span>
                      )}
                    </div>

                    <div className="text-[10px] font-mono uppercase text-muted-foreground">
                      {product.brand}
                    </div>
                    <h3 className="font-semibold text-xs sm:text-sm text-foreground mt-0.5 line-clamp-2">
                      {product.name}
                    </h3>

                    {/* Price and Rating */}
                    <div className="mt-3 flex items-baseline justify-between">
                      <div className="text-base font-mono font-bold text-foreground">
                        {formatPrice(
                          currency === "INR"
                            ? product.basePriceINR
                            : currency === "AUD"
                            ? product.basePriceAUD
                            : product.basePriceUSD,
                          currency
                        )}
                      </div>
                      <div className="text-[11px] font-mono text-muted-foreground">
                        ★ {product.rating}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                    <Link
                      href={`/product/${product.slug}`}
                      className="text-xs text-muted-foreground hover:text-foreground font-medium underline-offset-4 hover:underline"
                    >
                      Review
                    </Link>
                    <a
                      href={product.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-secondary hover:bg-secondary/80 text-foreground text-xs font-medium border border-border transition-colors"
                    >
                      <span>Check Price</span>
                      <ExternalLink className="w-3 h-3 ml-0.5 text-muted-foreground" />
                    </a>
                  </div>
                </div>
              );
            })}

            {/* Empty Slots */}
            {Array.from({ length: 4 - compareList.length }).map((_, idx) => (
              <button
                key={`empty-${idx}`}
                onClick={() => setIsAddModalOpen(true)}
                className="h-full min-h-[180px] rounded-xl border border-dashed border-border bg-secondary/20 hover:bg-secondary/40 flex flex-col items-center justify-center p-5 text-muted-foreground hover:text-foreground transition-colors group"
              >
                <div className="w-8 h-8 rounded-md bg-secondary flex items-center justify-center mb-2 border border-border">
                  <Plus className="w-4 h-4 text-foreground" />
                </div>
                <div className="text-xs font-semibold">Add Component</div>
                <div className="text-[10px] font-mono text-muted-foreground mt-0.5">
                  Slot 0{compareList.length + idx + 1} of 04
                </div>
              </button>
            ))}
          </div>

          {/* Deep Side-by-Side Specifications Table */}
          <div className="bg-card border border-border rounded-xl overflow-hidden shadow-xs">
            <div className="p-3.5 bg-secondary/30 border-b border-border flex items-center justify-between text-xs font-semibold text-foreground">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                Specification Matrix
              </span>
              <span className="text-[11px] text-muted-foreground">
                {compareList.length} Products Active
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <tbody>
                  {/* Category */}
                  <tr className="border-b border-border/60">
                    <td className="p-3 font-mono text-[11px] uppercase text-muted-foreground bg-secondary/15 w-48">
                      Category
                    </td>
                    {compareList.map((p) => (
                      <td key={p.id} className="p-3 capitalize font-medium text-foreground">
                        {p.subcategory.replace("-", " ")}
                      </td>
                    ))}
                    {Array.from({ length: 4 - compareList.length }).map((_, i) => (
                      <td key={i} className="p-3 text-muted-foreground italic">-</td>
                    ))}
                  </tr>

                  {/* Brand */}
                  <tr className="border-b border-border/60">
                    <td className="p-3 font-mono text-[11px] uppercase text-muted-foreground bg-secondary/15">
                      Brand
                    </td>
                    {compareList.map((p) => (
                      <td key={p.id} className="p-3 font-semibold text-foreground">
                        {p.brand}
                      </td>
                    ))}
                    {Array.from({ length: 4 - compareList.length }).map((_, i) => (
                      <td key={i} className="p-3 text-muted-foreground italic">-</td>
                    ))}
                  </tr>

                  {/* Release Date */}
                  <tr className="border-b border-border/60">
                    <td className="p-3 font-mono text-[11px] uppercase text-muted-foreground bg-secondary/15">
                      Release Date
                    </td>
                    {compareList.map((p) => (
                      <td key={p.id} className="p-3 font-mono text-muted-foreground">
                        {p.releaseDate}
                      </td>
                    ))}
                    {Array.from({ length: 4 - compareList.length }).map((_, i) => (
                      <td key={i} className="p-3 text-muted-foreground italic">-</td>
                    ))}
                  </tr>

                  {/* Dynamic Technical Specs */}
                  {Object.keys(compareList[0]?.specifications || {}).map((specKey) => (
                    <tr key={specKey} className="border-b border-border/60">
                      <td className="p-3 font-mono text-[11px] uppercase text-muted-foreground bg-secondary/15">
                        {specKey}
                      </td>
                      {compareList.map((p) => (
                        <td key={p.id} className="p-3 font-mono text-foreground">
                          {p.specifications[specKey] || "—"}
                        </td>
                      ))}
                      {Array.from({ length: 4 - compareList.length }).map((_, i) => (
                        <td key={i} className="p-3 text-muted-foreground italic">-</td>
                      ))}
                    </tr>
                  ))}

                  {/* Pros Row */}
                  <tr className="border-b border-border/60">
                    <td className="p-3 font-mono text-[11px] uppercase text-muted-foreground bg-secondary/15">
                      Strengths
                    </td>
                    {compareList.map((p) => (
                      <td key={p.id} className="p-3 space-y-1 align-top">
                        {p.pros.map((pro, pIdx) => (
                          <div key={pIdx} className="flex items-start space-x-1.5 text-[11px] text-emerald-500">
                            <Check className="w-3 h-3 shrink-0 mt-0.5" />
                            <span className="text-foreground">{pro}</span>
                          </div>
                        ))}
                      </td>
                    ))}
                    {Array.from({ length: 4 - compareList.length }).map((_, i) => (
                      <td key={i} className="p-3 text-muted-foreground italic">-</td>
                    ))}
                  </tr>

                  {/* Cons Row */}
                  <tr>
                    <td className="p-3 font-mono text-[11px] uppercase text-muted-foreground bg-secondary/15">
                      Trade-offs
                    </td>
                    {compareList.map((p) => (
                      <td key={p.id} className="p-3 space-y-1 align-top">
                        {p.cons.map((con, cIdx) => (
                          <div key={cIdx} className="flex items-start space-x-1.5 text-[11px] text-rose-500">
                            <X className="w-3 h-3 shrink-0 mt-0.5" />
                            <span className="text-foreground">{con}</span>
                          </div>
                        ))}
                      </td>
                    ))}
                    {Array.from({ length: 4 - compareList.length }).map((_, i) => (
                      <td key={i} className="p-3 text-muted-foreground italic">-</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-card border border-border rounded-xl max-w-lg w-full max-h-[80vh] flex flex-col shadow-xl overflow-hidden">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-foreground">Add to Comparison</h3>
                <p className="text-[11px] text-muted-foreground mt-0.5">Select a component from verified catalog</p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-md hover:bg-secondary text-muted-foreground hover:text-foreground text-xs"
              >
                ✕
              </button>
            </div>

            <div className="p-3 border-b border-border bg-secondary/30">
              <input
                type="text"
                placeholder="Search products to compare..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full bg-card border border-border rounded-md py-1.5 px-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-foreground"
              />
            </div>

            <div className="p-3 overflow-y-auto space-y-2 flex-1">
              {availableToAdd.length === 0 ? (
                <div className="py-8 text-center text-xs text-muted-foreground">
                  No matching products available to add.
                </div>
              ) : (
                availableToAdd.map((product) => (
                  <div
                    key={product.id}
                    className="p-3 rounded-lg border border-border bg-card hover:bg-secondary/30 flex items-center justify-between gap-3 transition-colors"
                  >
                    <div className="min-w-0">
                      <div className="text-[10px] font-mono uppercase text-muted-foreground">
                        {product.brand} · {product.subcategory}
                      </div>
                      <div className="font-semibold text-xs text-foreground truncate">
                        {product.name}
                      </div>
                      <div className="font-mono text-xs text-foreground mt-0.5">
                        {formatPrice(
                          currency === "INR"
                            ? product.basePriceINR
                            : currency === "AUD"
                            ? product.basePriceAUD
                            : product.basePriceUSD,
                          currency
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        addToCompare(product);
                        setIsAddModalOpen(false);
                      }}
                      className="px-3 py-1.5 rounded-md bg-foreground hover:bg-foreground/90 text-background text-xs font-semibold transition-colors shrink-0"
                    >
                      Add
                    </button>
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
