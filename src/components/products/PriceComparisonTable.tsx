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

  const filteredRetailers = [...retailers].sort((a, b) => {
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
    <div className="bg-card border border-border rounded-xl overflow-hidden shadow-xs">
      <div className="p-3.5 bg-secondary/30 border-b border-border flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            Multi-Store Live Pricing & Stock
          </span>
        </div>
        <span className="font-mono text-[11px] text-muted-foreground">
          Region: {region === "AU" ? "Australia (AUD)" : "India (INR)"}
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
              className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-secondary/20 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-md bg-secondary flex items-center justify-center font-mono font-bold text-xs text-foreground uppercase border border-border shrink-0">
                  {retailer.store.substring(0, 2)}
                </div>

                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-xs sm:text-sm text-foreground">
                      {retailer.store}
                    </span>
                    <span className="font-mono text-[10px] px-1 py-0.5 rounded bg-secondary text-muted-foreground">
                      {retailer.region}
                    </span>
                    {isLowest && (
                      <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                        Lowest Price
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-muted-foreground flex items-center space-x-2 mt-0.5 font-mono">
                    {retailer.inStock ? (
                      <span className="text-emerald-500">In Stock</span>
                    ) : (
                      <span className="text-rose-500">Out of Stock</span>
                    )}
                    {retailer.shippingInfo && (
                      <span>· {retailer.shippingInfo}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Price and Affiliate CTA */}
              <div className="flex items-center justify-between sm:justify-end space-x-3">
                <div className="text-right">
                  <div className="font-mono text-sm sm:text-base font-bold text-foreground">
                    {formatPrice(price, currency)}
                  </div>
                </div>

                <a
                  href={retailer.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-md bg-secondary hover:bg-secondary/80 text-foreground font-medium text-xs border border-border transition-colors shrink-0"
                >
                  <span>Visit Store</span>
                  <ExternalLink className="w-3 h-3 text-muted-foreground" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
