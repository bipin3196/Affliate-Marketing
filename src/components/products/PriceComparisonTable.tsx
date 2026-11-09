"use client";

import React from "react";
import { ExternalLink, CheckCircle2, XCircle, ShieldCheck } from "lucide-react";
import { RetailerPrice } from "@/types";
import { useCurrencyStore } from "@/store/useCurrencyStore";
import { formatPrice } from "@/lib/currency";

interface PriceComparisonTableProps {
  retailers: RetailerPrice[];
  productName: string;
}

export function PriceComparisonTable({ retailers, productName }: PriceComparisonTableProps) {
  const { currency, region } = useCurrencyStore();

  // Filter retailers prioritizing active region, but allow viewing all
  const filteredRetailers = [...retailers].sort((a, b) => {
    // If matching active region, prioritize
    if (a.region === region && b.region !== region) return -1;
    if (b.region === region && a.region !== region) return 1;
    const priceA = currency === "INR" ? a.priceINR : currency === "AUD" ? a.priceAUD : a.priceUSD;
    const priceB = currency === "INR" ? b.priceINR : currency === "AUD" ? b.priceAUD : b.priceUSD;
    return priceA - priceB;
  });

  const lowestPrice = filteredRetailers.length > 0
    ? Math.min(
        ...filteredRetailers.map((r) =>
          currency === "INR" ? r.priceINR : currency === "AUD" ? r.priceAUD : r.priceUSD
        )
      )
    : 0;

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-md">
      <div className="p-4 bg-secondary/40 border-b border-border flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <h3 className="font-bold text-sm text-foreground">
            Multi-Store Price Comparison & Live Availability
          </h3>
        </div>
        <span className="text-[11px] text-muted-foreground">
          Showing {region === "AU" ? "Australia" : "India"} & Partner Stores
        </span>
      </div>

      <div className="divide-y divide-border/60">
        {filteredRetailers.map((retailer, idx) => {
          const price =
            currency === "INR"
              ? retailer.priceINR
              : currency === "AUD"
              ? retailer.priceAUD
              : retailer.priceUSD;

          const isLowest = price === lowestPrice;

          return (
            <div
              key={idx}
              className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-secondary/20 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center font-black text-xs text-muted-foreground uppercase">
                  {retailer.store.substring(0, 2)}
                </div>

                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-sm text-foreground">
                      {retailer.store}
                    </span>
                    {retailer.region === "AU" ? (
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-secondary text-muted-foreground">
                        🇦🇺 AU
                      </span>
                    ) : (
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-secondary text-muted-foreground">
                        🇮🇳 IN
                      </span>
                    )}
                    {isLowest && (
                      <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        Best Price
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground flex items-center space-x-2 mt-0.5">
                    {retailer.inStock ? (
                      <span className="text-emerald-600 flex items-center">
                        <CheckCircle2 className="w-3 h-3 mr-1" /> In Stock
                      </span>
                    ) : (
                      <span className="text-rose-600 flex items-center">
                        <XCircle className="w-3 h-3 mr-1" /> Out of Stock
                      </span>
                    )}
                    {retailer.shippingInfo && (
                      <span>• {retailer.shippingInfo}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Price and Affiliate CTA */}
              <div className="flex items-center justify-between sm:justify-end space-x-4">
                <div className="text-right">
                  <div className="text-base sm:text-lg font-black text-foreground">
                    {formatPrice(price, currency)}
                  </div>
                </div>

                <a
                  href={retailer.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs shadow-sm transition-transform hover:scale-105 shrink-0"
                >
                  <span>Buy on {retailer.store.split(" ")[0]}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
