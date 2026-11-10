"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingBag,
  Bell,
  Sparkles,
  ExternalLink,
  Tag,
  CheckCircle2,
  Clock,
  Filter,
  Check,
} from "lucide-react";
import { ACTIVE_DEALS } from "@/data/deals";
import { useCurrencyStore } from "@/store/useCurrencyStore";
import { useUserStore } from "@/store/useUserStore";
import { formatPrice } from "@/lib/currency";
import { Deal } from "@/types";

export function DealsHubView() {
  const { currency, region } = useCurrencyStore();
  const { addPriceAlert } = useUserStore();

  const [selectedEvent, setSelectedEvent] = useState<string>("All");
  const [activeAlertDeal, setActiveAlertDeal] = useState<Deal | null>(null);
  const [alertTargetPrice, setAlertTargetPrice] = useState<string>("");
  const [alertEmail, setAlertEmail] = useState<string>("");
  const [alertSuccess, setAlertSuccess] = useState(false);

  const saleEvents = ["All", "Diwali Sale", "EOFY Sale", "Prime Day", "Black Friday", "Daily Deal"];

  const filteredDeals = ACTIVE_DEALS.filter((deal) => {
    if (selectedEvent !== "All" && deal.saleEvent !== selectedEvent) return false;
    return true;
  });

  const handleCreateAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeAlertDeal || !alertEmail || !alertTargetPrice) return;

    addPriceAlert({
      productId: activeAlertDeal.productId,
      productName: activeAlertDeal.productName,
      currentPrice: currency === "INR" ? activeAlertDeal.dealPriceINR : activeAlertDeal.dealPriceAUD,
      targetPrice: parseFloat(alertTargetPrice),
      currency,
      email: alertEmail,
    });

    setAlertSuccess(true);
    setTimeout(() => {
      setAlertSuccess(false);
      setActiveAlertDeal(null);
      setAlertEmail("");
      setAlertTargetPrice("");
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-border/80 gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Market Telemetry</span>
            <span>/</span>
            <span className="text-foreground">Price Drop Index</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
            Hardware Deals & Price Drops
          </h1>
          <p className="text-xs text-muted-foreground mt-1 max-w-2xl">
            Live price tracking across Amazon India, MDComputers, PrimeABGB, Scorptec, and JB Hi-Fi with automated price alert notifications.
          </p>
        </div>
      </div>

      {/* Sale Event Filter Pills */}
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-xs font-mono uppercase text-muted-foreground mr-1">
          Filter:
        </span>
        {saleEvents.map((evt) => (
          <button
            key={evt}
            onClick={() => setSelectedEvent(evt)}
            className={`px-3 py-1 rounded-md text-xs font-medium border transition-colors ${
              selectedEvent === evt
                ? "bg-foreground text-background border-foreground font-semibold"
                : "bg-secondary/40 hover:bg-secondary text-muted-foreground hover:text-foreground border-border"
            }`}
          >
            {evt}
          </button>
        ))}
      </div>

      {/* Deals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDeals.map((deal) => {
          const currentPrice =
            currency === "INR"
              ? deal.dealPriceINR
              : currency === "AUD"
              ? deal.dealPriceAUD
              : deal.dealPriceUSD;

          const originalPrice =
            currency === "INR"
              ? deal.originalPriceINR
              : currency === "AUD"
              ? deal.originalPriceAUD
              : deal.originalPriceUSD;

          return (
            <div
              key={deal.id}
              className="p-4 rounded-xl bg-card border border-border flex flex-col justify-between group hover:border-foreground/30 transition-colors shadow-xs"
            >
              <div>
                {/* Event Pill and Discount Badge */}
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-secondary text-muted-foreground border border-border">
                    {deal.saleEvent}
                  </span>
                  <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                    -{deal.discountPercentage}%
                  </span>
                </div>

                <div className="text-[10px] font-mono uppercase text-muted-foreground">
                  {deal.retailer}
                </div>

                <h3 className="font-semibold text-xs sm:text-sm text-foreground mt-0.5 line-clamp-2">
                  {deal.title}
                </h3>

                {/* Price Display */}
                <div className="mt-3 flex items-baseline space-x-2">
                  <span className="text-lg sm:text-xl font-mono font-extrabold text-foreground">
                    {formatPrice(currentPrice, currency)}
                  </span>
                  <span className="text-xs font-mono text-muted-foreground line-through">
                    {formatPrice(originalPrice, currency)}
                  </span>
                </div>

                {deal.badge && (
                  <div className="mt-1.5 inline-flex items-center space-x-1 text-[11px] font-mono text-emerald-500">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>{deal.badge}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-border flex items-center space-x-2">
                <a
                  href={deal.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center space-x-1 py-1.5 rounded-md bg-foreground hover:bg-foreground/90 text-background font-semibold text-xs transition-colors"
                >
                  <span>Buy on {deal.retailer.split(" ")[0]}</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>

                <button
                  onClick={() => {
                    setActiveAlertDeal(deal);
                    setAlertTargetPrice(
                      String(Math.round(currentPrice * 0.95))
                    );
                  }}
                  className="p-1.5 rounded-md bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground border border-border transition-colors"
                  title="Notify when price drops"
                >
                  <Bell className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Set Price Alert Modal */}
      {activeAlertDeal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="bg-card border border-border rounded-xl max-w-sm w-full p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <span className="font-bold text-xs uppercase tracking-wider text-foreground">
                Set Price Watch
              </span>
              <button
                onClick={() => setActiveAlertDeal(null)}
                className="p-1 rounded hover:bg-secondary text-muted-foreground hover:text-foreground text-xs"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              When <span className="font-semibold text-foreground">{activeAlertDeal.productName}</span> drops below your target price, you will receive an alert.
            </p>

            {alertSuccess ? (
              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-mono flex items-center space-x-2">
                <Check className="w-4 h-4" />
                <span>Price alert registered successfully.</span>
              </div>
            ) : (
              <form onSubmit={handleCreateAlert} className="space-y-3">
                <div>
                  <label className="text-[10px] font-mono uppercase text-muted-foreground block mb-1">
                    Target Price ({currency})
                  </label>
                  <input
                    type="number"
                    value={alertTargetPrice}
                    onChange={(e) => setAlertTargetPrice(e.target.value)}
                    required
                    placeholder="e.g. 55000"
                    className="w-full bg-card border border-border rounded-md py-1.5 px-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-foreground font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase text-muted-foreground block mb-1">
                    Alert Email
                  </label>
                  <input
                    type="email"
                    value={alertEmail}
                    onChange={(e) => setAlertEmail(e.target.value)}
                    required
                    placeholder="you@domain.com"
                    className="w-full bg-card border border-border rounded-md py-1.5 px-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-foreground"
                  />
                </div>

                <div className="pt-1">
                  <button
                    type="submit"
                    className="w-full py-2 rounded-md bg-foreground hover:bg-foreground/90 text-background font-semibold text-xs transition-colors"
                  >
                    Activate Alert
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
