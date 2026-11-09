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
  Check
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-border/80 gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-500/10 border border-rose-500/20 px-3 py-1 rounded-full mb-2">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Verified Price Drops & Festive Sales Engine</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
            Tech Deals & Price Drops
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Tracking lowest prices across Amazon India, MDComputers, PrimeABGB, Scorptec, and JB Hi-Fi with instant price alert notifications.
          </p>
        </div>
      </div>

      {/* Sale Event Filter Pills */}
      <div className="my-6 flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-muted-foreground mr-1 flex items-center">
          <Filter className="w-3.5 h-3.5 mr-1" /> Sales Events:
        </span>
        {saleEvents.map((evt) => (
          <button
            key={evt}
            onClick={() => setSelectedEvent(evt)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              selectedEvent === evt
                ? "bg-rose-600 text-white border-rose-600 shadow-sm"
                : "bg-secondary/40 hover:bg-secondary text-foreground border-border"
            }`}
          >
            {evt}
          </button>
        ))}
      </div>

      {/* Deals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              className="p-5 rounded-3xl bg-card border border-border shadow-md hover:border-primary/50 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Event Pill and Discount Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                    {deal.saleEvent}
                  </span>
                  <span className="text-xs font-black px-2 py-0.5 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                    -{deal.discountPercentage}% OFF
                  </span>
                </div>

                <div className="text-xs font-bold text-muted-foreground uppercase tracking-wide">
                  {deal.retailer}
                </div>

                <h3 className="font-bold text-base text-foreground mt-1 line-clamp-2 group-hover:text-primary transition-colors">
                  {deal.title}
                </h3>

                {/* Price Display */}
                <div className="mt-4 flex items-baseline space-x-2">
                  <span className="text-2xl font-black text-foreground">
                    {formatPrice(currentPrice, currency)}
                  </span>
                  <span className="text-xs text-muted-foreground line-through">
                    {formatPrice(originalPrice, currency)}
                  </span>
                </div>

                {deal.badge && (
                  <div className="mt-2 inline-flex items-center space-x-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{deal.badge}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons: Check Price & Set Alert */}
              <div className="mt-6 pt-4 border-t border-border/80 flex items-center space-x-2">
                <a
                  href={deal.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center space-x-1 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs shadow-sm transition-transform hover:scale-[1.01]"
                >
                  <span>Buy on {deal.retailer.split(" ")[0]}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => {
                    setActiveAlertDeal(deal);
                    setAlertTargetPrice(
                      String(Math.round(currentPrice * 0.95))
                    );
                  }}
                  className="p-2.5 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground border border-border"
                  title="Notify when price drops"
                >
                  <Bell className="w-4 h-4 text-amber-500" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Set Price Alert Modal */}
      {activeAlertDeal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-card border border-border rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center space-x-2 text-foreground font-black text-base">
                <Bell className="w-5 h-5 text-amber-500" />
                <span>Create Live Price Alert</span>
              </div>
              <button
                onClick={() => setActiveAlertDeal(null)}
                className="p-1 rounded-lg hover:bg-secondary text-muted-foreground"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-muted-foreground leading-relaxed">
              We monitor retailer pricing 24/7. When <span className="font-bold text-foreground">{activeAlertDeal.productName}</span> drops to or below your target price, we'll send an instant email notification.
            </p>

            {alertSuccess ? (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-bold flex items-center space-x-2">
                <Check className="w-4 h-4" />
                <span>Price Alert Activated! We will notify you instantly when it drops.</span>
              </div>
            ) : (
              <form onSubmit={handleCreateAlert} className="space-y-3">
                <div>
                  <label className="text-[11px] font-bold text-muted-foreground uppercase block mb-1">
                    Target Price ({currency})
                  </label>
                  <input
                    type="number"
                    value={alertTargetPrice}
                    onChange={(e) => setAlertTargetPrice(e.target.value)}
                    required
                    placeholder="e.g. 55000"
                    className="w-full bg-secondary/50 border border-border rounded-xl py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary font-bold"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-muted-foreground uppercase block mb-1">
                    Notification Email Address
                  </label>
                  <input
                    type="email"
                    value={alertEmail}
                    onChange={(e) => setAlertEmail(e.target.value)}
                    required
                    placeholder="you@example.com"
                    className="w-full bg-secondary/50 border border-border rounded-xl py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs shadow-md transition-transform hover:scale-[1.01]"
                  >
                    Activate Price Watch
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
