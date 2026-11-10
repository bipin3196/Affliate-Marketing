"use client";

import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingDown, Calendar, AlertCircle } from "lucide-react";
import { PricePoint } from "@/types";
import { useCurrencyStore } from "@/store/useCurrencyStore";
import { formatPrice } from "@/lib/currency";

interface PriceHistoryChartProps {
  priceHistory: PricePoint[];
}

export function PriceHistoryChart({ priceHistory }: PriceHistoryChartProps) {
  const { currency } = useCurrencyStore();
  const [timeRange, setTimeRange] = useState<"30d" | "90d" | "180d" | "1y">("90d");

  if (!priceHistory || priceHistory.length === 0) {
    return (
      <div className="p-6 text-center text-xs text-muted-foreground border border-border rounded-xl">
        Price history is being gathered for this SKU.
      </div>
    );
  }

  const chartData = priceHistory.map((item) => ({
    date: item.date,
    price:
      currency === "INR"
        ? item.priceINR
        : currency === "AUD"
        ? item.priceAUD
        : item.priceUSD,
  }));

  const prices = chartData.map((d) => d.price);
  const lowestPrice = Math.min(...prices);
  const highestPrice = Math.max(...prices);
  const currentPrice = prices[prices.length - 1];

  const priceDrop = highestPrice > currentPrice
    ? Math.round(((highestPrice - currentPrice) / highestPrice) * 100)
    : 0;

  return (
    <div className="p-4 rounded-xl bg-card border border-border shadow-xs space-y-4">
      {/* Header and Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-border">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
            Price History & Trajectory
          </span>
          <p className="text-xs text-muted-foreground mt-0.5">
            Verified historical price changes across authorized retail partners.
          </p>
        </div>

        {/* Range Buttons */}
        <div className="flex items-center space-x-1 p-0.5 rounded-md bg-secondary/60 border border-border self-start sm:self-auto">
          {(["30d", "90d", "180d", "1y"] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-2 py-1 rounded text-[11px] font-mono transition-colors ${
                timeRange === range
                  ? "bg-card text-foreground shadow-xs font-bold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {range.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-3 gap-3">
        <div className="p-3 rounded-lg bg-secondary/30 border border-border">
          <div className="text-[10px] font-mono uppercase text-muted-foreground">
            All-Time Low
          </div>
          <div className="text-xs sm:text-sm font-mono font-bold text-emerald-500 mt-0.5">
            {formatPrice(lowestPrice, currency)}
          </div>
        </div>

        <div className="p-3 rounded-lg bg-secondary/30 border border-border">
          <div className="text-[10px] font-mono uppercase text-muted-foreground">
            Current Price
          </div>
          <div className="text-xs sm:text-sm font-mono font-bold text-foreground mt-0.5">
            {formatPrice(currentPrice, currency)}
          </div>
        </div>

        <div className="p-3 rounded-lg bg-secondary/30 border border-border">
          <div className="text-[10px] font-mono uppercase text-muted-foreground">
            Price Variance
          </div>
          <div className="text-xs sm:text-sm font-mono font-bold text-foreground mt-0.5">
            {priceDrop > 0 ? `-${priceDrop}%` : "Stable"}
          </div>
        </div>
      </div>

      {/* Recharts Area Chart */}
      <div className="h-48 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="currentColor" stopOpacity={0.15} className="text-foreground" />
                <stop offset="95%" stopColor="currentColor" stopOpacity={0.0} className="text-foreground" />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 10, fill: "var(--muted-foreground, #888)" }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 10, fill: "var(--muted-foreground, #888)" }}
              domain={["dataMin - 1000", "dataMax + 1000"]}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-popover border border-border shadow-md rounded-md p-2 text-xs">
                      <div className="text-muted-foreground font-mono text-[10px]">{payload[0].payload.date}</div>
                      <div className="font-mono font-bold text-foreground text-xs mt-0.5">
                        {formatPrice(Number(payload[0].value), currency)}
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="price"
              stroke="currentColor"
              className="text-foreground"
              strokeWidth={1.5}
              fillOpacity={1}
              fill="url(#priceGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
