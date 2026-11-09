"use client";

import React, { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Search, Star, ArrowRight, ExternalLink, Scale } from "lucide-react";
import { PRODUCTS } from "@/data/products";
import { BUYING_GUIDES } from "@/data/buyingGuides";
import { useCurrencyStore } from "@/store/useCurrencyStore";
import { useComparisonStore } from "@/store/useComparisonStore";
import { formatPrice } from "@/lib/currency";

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const { currency } = useCurrencyStore();
  const { addToCompare } = useComparisonStore();

  const lowerQuery = query.toLowerCase().trim();

  const matchedProducts = lowerQuery
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(lowerQuery) ||
          p.brand.toLowerCase().includes(lowerQuery) ||
          p.category.toLowerCase().includes(lowerQuery) ||
          p.subcategory.toLowerCase().includes(lowerQuery) ||
          p.description.toLowerCase().includes(lowerQuery)
      )
    : [];

  const matchedGuides = lowerQuery
    ? BUYING_GUIDES.filter(
        (g) =>
          g.title.toLowerCase().includes(lowerQuery) ||
          g.summary.toLowerCase().includes(lowerQuery) ||
          g.category.toLowerCase().includes(lowerQuery)
      )
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="pb-6 border-b border-border/80">
        <h1 className="text-3xl font-black text-foreground tracking-tight flex items-center space-x-3">
          <Search className="w-7 h-7 text-primary" />
          <span>Search Results for "{query}"</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Found {matchedProducts.length} hardware products and {matchedGuides.length} buying guides.
        </p>
      </div>

      {matchedProducts.length === 0 && matchedGuides.length === 0 ? (
        <div className="p-12 text-center text-sm text-muted-foreground bg-secondary/20 rounded-3xl border border-dashed border-border max-w-lg mx-auto">
          No matching products or guides found for "{query}". Try searching for broader terms like "Ryzen", "RTX", "Laptop", or "Monitor".
        </div>
      ) : (
        <div className="space-y-10">
          {/* Products */}
          {matchedProducts.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-black text-foreground">
                Products ({matchedProducts.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {matchedProducts.map((product) => {
                  const price =
                    currency === "INR"
                      ? product.basePriceINR
                      : currency === "AUD"
                      ? product.basePriceAUD
                      : product.basePriceUSD;

                  return (
                    <div
                      key={product.id}
                      className="p-5 rounded-3xl bg-card border border-border shadow-md hover:border-primary/50 transition-all flex flex-col justify-between group"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-primary uppercase">
                            {product.brand}
                          </span>
                          <span className="text-[11px] text-muted-foreground capitalize">
                            {product.subcategory.replace("-", " ")}
                          </span>
                        </div>

                        <Link href={`/product/${product.slug}`}>
                          <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors line-clamp-2">
                            {product.name}
                          </h3>
                        </Link>

                        <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                          {product.description}
                        </p>

                        <div className="mt-3 flex items-center space-x-1 text-xs text-amber-500 font-bold">
                          <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                          <span>{product.rating}</span>
                          <span className="text-muted-foreground font-normal">
                            ({product.reviewCount})
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                        <div className="text-lg font-black text-foreground">
                          {formatPrice(price, currency)}
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => addToCompare(product)}
                            className="p-2 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground"
                            title="Compare"
                          >
                            <Scale className="w-4 h-4" />
                          </button>
                          <Link
                            href={`/product/${product.slug}`}
                            className="px-3.5 py-1.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs"
                          >
                            View
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Guides */}
          {matchedGuides.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-black text-foreground">
                Relevant Buying Guides ({matchedGuides.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {matchedGuides.map((guide) => (
                  <Link
                    key={guide.id}
                    href={`/buying-guides/${guide.slug}`}
                    className="p-5 rounded-2xl bg-card border border-border shadow-sm hover:border-primary/50 transition-all flex items-start justify-between group"
                  >
                    <div>
                      <div className="text-xs font-bold text-primary capitalize">
                        {guide.category} • {guide.readTime}
                      </div>
                      <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors mt-1">
                        {guide.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                        {guide.summary}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 ml-4 mt-2" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-sm">Loading search results...</div>}>
      <SearchContent />
    </Suspense>
  );
}
