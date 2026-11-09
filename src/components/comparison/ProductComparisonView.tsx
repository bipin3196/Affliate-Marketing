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
  TrendingUp
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

  // Determine winners and badges dynamically
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-border/80 gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-purple-600 dark:text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full mb-2">
            <Scale className="w-3.5 h-3.5" />
            <span>Side-by-Side Product Comparison Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
            Compare Tech Products
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Compare specifications, lab ratings, benchmarks, and multi-retailer pricing for up to 4 products simultaneously.
          </p>
        </div>

        {compareList.length > 0 && (
          <button
            onClick={clearCompare}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-secondary hover:bg-destructive/10 hover:text-destructive text-muted-foreground text-xs font-bold border border-border transition-colors self-start"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear Comparison</span>
          </button>
        )}
      </div>

      {/* Comparison Grid */}
      {compareList.length === 0 ? (
        <div className="my-16 text-center max-w-md mx-auto p-8 rounded-3xl bg-secondary/30 border border-border/80">
          <div className="w-16 h-16 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mx-auto mb-4">
            <Scale className="w-8 h-8" />
          </div>
          <h3 className="font-extrabold text-xl text-foreground">No Products Selected</h3>
          <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
            Select up to 4 products from our catalog to compare specifications, prices, and winner badges side-by-side.
          </p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="mt-6 px-6 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm shadow-md shadow-primary/20 transition-transform hover:scale-105"
          >
            + Add First Product
          </button>
        </div>
      ) : (
        <div className="mt-8 space-y-6">
          {/* Products Header Row (Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {compareList.map((product) => {
              const isWinner = highestRatedProduct?.id === product.id;
              const isBestValue = lowestPriceProduct?.id === product.id;
              const isTopPerformance = bestPerformanceProduct?.id === product.id;

              return (
                <div
                  key={product.id}
                  className="p-5 rounded-2xl bg-card border-2 border-border/80 shadow-md flex flex-col justify-between relative group hover:border-primary/50 transition-all"
                >
                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCompare(product.id)}
                    className="absolute top-3 right-3 p-1.5 rounded-lg bg-secondary/80 hover:bg-destructive hover:text-white text-muted-foreground transition-colors"
                    title="Remove from comparison"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div>
                    {/* Badge Pill */}
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {isWinner && (
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 flex items-center">
                          <Award className="w-3 h-3 mr-1" /> Overall Winner
                        </span>
                      )}
                      {isBestValue && (
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center">
                          <TrendingUp className="w-3 h-3 mr-1" /> Best Value
                        </span>
                      )}
                      {isTopPerformance && !isWinner && (
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30 flex items-center">
                          <Zap className="w-3 h-3 mr-1" /> Top Performance
                        </span>
                      )}
                    </div>

                    <div className="text-xs font-bold text-primary uppercase">
                      {product.brand}
                    </div>
                    <h3 className="font-bold text-sm text-foreground mt-1 line-clamp-2">
                      {product.name}
                    </h3>

                    {/* Price and Rating */}
                    <div className="mt-3 flex items-baseline justify-between">
                      <div className="text-xl font-black text-foreground">
                        {formatPrice(
                          currency === "INR"
                            ? product.basePriceINR
                            : currency === "AUD"
                            ? product.basePriceAUD
                            : product.basePriceUSD,
                          currency
                        )}
                      </div>
                      <div className="text-xs font-bold text-amber-500 flex items-center">
                        ★ {product.rating} ({product.reviewCount})
                      </div>
                    </div>
                  </div>

                  {/* Affiliate Direct Link */}
                  <div className="mt-4 pt-3 border-t border-border/80 flex items-center justify-between">
                    <Link
                      href={`/product/${product.slug}`}
                      className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                    >
                      Full Review
                    </Link>
                    <a
                      href={product.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-bold shadow-sm transition-transform hover:scale-105"
                    >
                      <span>Check Price</span>
                      <ExternalLink className="w-3 h-3 ml-0.5" />
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
                className="h-full min-h-[220px] rounded-2xl border-2 border-dashed border-border/80 hover:border-primary/60 bg-secondary/20 hover:bg-secondary/40 flex flex-col items-center justify-center p-6 text-muted-foreground hover:text-foreground transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center group-hover:scale-110 transition-transform mb-2">
                  <Plus className="w-6 h-6 text-primary" />
                </div>
                <div className="text-xs font-bold">Add Product to Compare</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">
                  Slot {compareList.length + idx + 1} of 4
                </div>
              </button>
            ))}
          </div>

          {/* Deep Side-by-Side Specifications Table */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg mt-8">
            <div className="p-4 bg-secondary/50 border-b border-border font-bold text-sm text-foreground flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span>Specification Breakdown & Hardware Comparison</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <tbody>
                  {/* Category */}
                  <tr className="border-b border-border/50">
                    <td className="p-3.5 font-bold text-muted-foreground bg-secondary/20 w-44">
                      Category
                    </td>
                    {compareList.map((p) => (
                      <td key={p.id} className="p-3.5 capitalize font-semibold">
                        {p.subcategory.replace("-", " ")}
                      </td>
                    ))}
                    {Array.from({ length: 4 - compareList.length }).map((_, i) => (
                      <td key={i} className="p-3.5 text-muted-foreground italic">-</td>
                    ))}
                  </tr>

                  {/* Brand */}
                  <tr className="border-b border-border/50">
                    <td className="p-3.5 font-bold text-muted-foreground bg-secondary/20">
                      Brand
                    </td>
                    {compareList.map((p) => (
                      <td key={p.id} className="p-3.5 font-semibold text-foreground">
                        {p.brand}
                      </td>
                    ))}
                    {Array.from({ length: 4 - compareList.length }).map((_, i) => (
                      <td key={i} className="p-3.5 text-muted-foreground italic">-</td>
                    ))}
                  </tr>

                  {/* Release Date */}
                  <tr className="border-b border-border/50">
                    <td className="p-3.5 font-bold text-muted-foreground bg-secondary/20">
                      Release Date
                    </td>
                    {compareList.map((p) => (
                      <td key={p.id} className="p-3.5 text-muted-foreground">
                        {p.releaseDate}
                      </td>
                    ))}
                    {Array.from({ length: 4 - compareList.length }).map((_, i) => (
                      <td key={i} className="p-3.5 text-muted-foreground italic">-</td>
                    ))}
                  </tr>

                  {/* Dynamic Technical Specs */}
                  {Object.keys(compareList[0]?.specifications || {}).map((specKey) => (
                    <tr key={specKey} className="border-b border-border/50">
                      <td className="p-3.5 font-bold text-muted-foreground bg-secondary/20">
                        {specKey}
                      </td>
                      {compareList.map((p) => (
                        <td key={p.id} className="p-3.5 font-medium text-foreground">
                          {p.specifications[specKey] || "—"}
                        </td>
                      ))}
                      {Array.from({ length: 4 - compareList.length }).map((_, i) => (
                        <td key={i} className="p-3.5 text-muted-foreground italic">-</td>
                      ))}
                    </tr>
                  ))}

                  {/* Pros Row */}
                  <tr className="border-b border-border/50">
                    <td className="p-3.5 font-bold text-muted-foreground bg-secondary/20">
                      Key Strengths (Pros)
                    </td>
                    {compareList.map((p) => (
                      <td key={p.id} className="p-3.5 space-y-1 align-top">
                        {p.pros.map((pro, pIdx) => (
                          <div key={pIdx} className="flex items-start space-x-1.5 text-[11px] text-emerald-600 dark:text-emerald-400">
                            <Check className="w-3 h-3 shrink-0 mt-0.5" />
                            <span>{pro}</span>
                          </div>
                        ))}
                      </td>
                    ))}
                    {Array.from({ length: 4 - compareList.length }).map((_, i) => (
                      <td key={i} className="p-3.5 text-muted-foreground italic">-</td>
                    ))}
                  </tr>

                  {/* Cons Row */}
                  <tr>
                    <td className="p-3.5 font-bold text-muted-foreground bg-secondary/20">
                      Weaknesses (Cons)
                    </td>
                    {compareList.map((p) => (
                      <td key={p.id} className="p-3.5 space-y-1 align-top">
                        {p.cons.map((con, cIdx) => (
                          <div key={cIdx} className="flex items-start space-x-1.5 text-[11px] text-rose-600 dark:text-rose-400">
                            <X className="w-3 h-3 shrink-0 mt-0.5" />
                            <span>{con}</span>
                          </div>
                        ))}
                      </td>
                    ))}
                    {Array.from({ length: 4 - compareList.length }).map((_, i) => (
                      <td key={i} className="p-3.5 text-muted-foreground italic">-</td>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-card border border-border rounded-3xl max-w-xl w-full max-h-[80vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-border flex items-center justify-between">
              <div>
                <h3 className="font-black text-lg text-foreground">Add Product to Compare</h3>
                <p className="text-xs text-muted-foreground">Select from our benchmarked hardware catalog</p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 rounded-xl hover:bg-secondary text-muted-foreground"
              >
                ✕
              </button>
            </div>

            <div className="p-4 border-b border-border bg-secondary/20">
              <input
                type="text"
                placeholder="Search products to compare..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full bg-card border border-border rounded-xl py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="p-4 overflow-y-auto space-y-2 flex-1">
              {availableToAdd.length === 0 ? (
                <div className="py-8 text-center text-xs text-muted-foreground">
                  No matching products available to add.
                </div>
              ) : (
                availableToAdd.map((product) => (
                  <div
                    key={product.id}
                    className="p-3 rounded-xl border border-border hover:border-primary/60 bg-card hover:bg-secondary/40 transition-colors flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-bold text-primary">{product.brand}</div>
                      <div className="text-sm font-bold text-foreground">{product.name}</div>
                      <div className="text-[11px] text-muted-foreground">
                        {formatPrice(
                          currency === "INR"
                            ? product.basePriceINR
                            : currency === "AUD"
                            ? product.basePriceAUD
                            : product.basePriceUSD,
                          currency
                        )} • ★ {product.rating}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        addToCompare(product);
                        setIsAddModalOpen(false);
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs"
                    >
                      Compare
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
