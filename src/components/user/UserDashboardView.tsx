"use client";

import React from "react";
import Link from "next/link";
import {
  Bookmark,
  Cpu,
  Bell,
  Trash2,
  ExternalLink,
  ArrowRight,
  ShieldCheck,
  Zap,
  Sparkles
} from "lucide-react";
import { useUserStore } from "@/store/useUserStore";
import { usePCBuilderStore } from "@/store/usePCBuilderStore";
import { useCurrencyStore } from "@/store/useCurrencyStore";
import { PRODUCTS } from "@/data/products";
import { formatPrice } from "@/lib/currency";

export function UserDashboardView() {
  const { bookmarks, savedBuilds, priceAlerts, toggleBookmark, removeSavedBuild, removePriceAlert } = useUserStore();
  const { loadBuild } = usePCBuilderStore();
  const { currency } = useCurrencyStore();

  const bookmarkedProducts = PRODUCTS.filter((p) => bookmarks.includes(p.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Title */}
      <div className="pb-6 border-b border-border/80">
        <div className="inline-flex items-center space-x-2 text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full mb-2">
          <Bookmark className="w-3.5 h-3.5" />
          <span>Personal Tech Intelligence Center</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
          My Saved Builds & Alerts
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your custom PC configurations, price drop tracking alerts, and bookmarked hardware.
        </p>
      </div>

      {/* 1. Saved PC Builds */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Cpu className="w-5 h-5 text-blue-500" />
            <h2 className="text-xl font-black text-foreground">Saved PC Builds ({savedBuilds.length})</h2>
          </div>
          <Link
            href="/pc-builder"
            className="text-xs font-bold text-primary hover:underline flex items-center"
          >
            Open PC Builder <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>

        {savedBuilds.length === 0 ? (
          <div className="p-8 rounded-2xl bg-secondary/20 border border-dashed border-border text-center text-xs text-muted-foreground">
            No custom builds saved yet. Head to the{" "}
            <Link href="/pc-builder" className="text-primary font-bold underline">
              PC Builder
            </Link>{" "}
            and click "Save Build".
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savedBuilds.map((build) => {
              const partCount = Object.values(build.parts).filter(Boolean).length;
              return (
                <div
                  key={build.id}
                  className="p-5 rounded-2xl bg-card border border-border shadow-md space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-base text-foreground">{build.title}</h3>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {partCount} Components Configured
                      </div>
                    </div>
                    <button
                      onClick={() => removeSavedBuild(build.id)}
                      className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive"
                      title="Delete build"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-border/60">
                    <div className="text-sm font-black text-foreground">
                      {formatPrice(build.targetBudgetINR, currency)}
                    </div>
                    <Link
                      href="/pc-builder"
                      onClick={() => loadBuild(build)}
                      className="px-3.5 py-1.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs"
                    >
                      Load into Builder
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 2. Active Price Watch Alerts */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Bell className="w-5 h-5 text-amber-500" />
          <h2 className="text-xl font-black text-foreground">Active Price Drop Watches ({priceAlerts.length})</h2>
        </div>

        {priceAlerts.length === 0 ? (
          <div className="p-8 rounded-2xl bg-secondary/20 border border-dashed border-border text-center text-xs text-muted-foreground">
            No active price alerts. Click the bell icon on any product or deal to track target price drops.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {priceAlerts.map((alert) => (
              <div
                key={alert.id}
                className="p-4 rounded-2xl bg-card border border-border shadow-md space-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400">
                      Price Watch
                    </span>
                    <button
                      onClick={() => removePriceAlert(alert.id)}
                      className="text-muted-foreground hover:text-destructive p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <h4 className="font-bold text-sm text-foreground mt-1.5">{alert.productName}</h4>
                  <div className="text-xs text-muted-foreground mt-1">
                    Alert Email: <span className="text-foreground font-medium">{alert.email}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-border/60 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Target Price:</span>
                  <span className="font-black text-emerald-600 dark:text-emerald-400 text-sm">
                    {formatPrice(alert.targetPrice, currency)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. Bookmarked Hardware Products */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Bookmark className="w-5 h-5 text-purple-500" />
          <h2 className="text-xl font-black text-foreground">Watchlist & Bookmarks ({bookmarkedProducts.length})</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {bookmarkedProducts.map((product) => {
            const price =
              currency === "INR"
                ? product.basePriceINR
                : currency === "AUD"
                ? product.basePriceAUD
                : product.basePriceUSD;

            return (
              <div
                key={product.id}
                className="p-4 rounded-2xl bg-card border border-border shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-primary uppercase">
                    <span>{product.brand}</span>
                    <button
                      onClick={() => toggleBookmark(product.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <h4 className="font-bold text-sm text-foreground mt-1 line-clamp-1">{product.name}</h4>
                  <div className="text-xs text-muted-foreground mt-0.5 capitalize">
                    {product.subcategory.replace("-", " ")}
                  </div>
                </div>

                <div className="mt-4 pt-2 border-t border-border/60 flex items-center justify-between">
                  <span className="font-black text-base text-foreground">
                    {formatPrice(price, currency)}
                  </span>
                  <Link
                    href={`/product/${product.slug}`}
                    className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
