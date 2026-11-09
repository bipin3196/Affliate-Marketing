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
      <div className="p-8 text-center text-xs text-muted-foreground border border-border rounded-2xl">
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
    <div className="p-5 rounded-2xl bg-card border border-border shadow-md space-y-4">
      {/* Header and Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="font-bold text-sm text-foreground flex items-center space-x-1.5">
            <TrendingDown className="w-4 h-4 text-emerald-500" />
            <span>Price Trend & Historical Lows</span>
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Historical price tracking across verified retailers
          </p>
        </div>

        {/* Range Buttons */}
        <div className="flex items-center space-x-1 p-1 rounded-xl bg-secondary/50 border border-border/60 self-start sm:self-auto">
          {(["30d", "90d", "180d", "1y"] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                timeRange === range
                  ? "bg-card text-foreground shadow-sm font-bold"
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
        <div className="p-3 rounded-xl bg-secondary/30 border border-border/60">
          <div className="text-[10px] font-bold text-muted-foreground uppercase">
            All-Time Low
          </div>
          <div className="text-sm sm:text-base font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
            {formatPrice(lowestPrice, currency)}
          </div>
        </div>

        <div className="p-3 rounded-xl bg-secondary/30 border border-border/60">
          <div className="text-[10px] font-bold text-muted-foreground uppercase">
            Current Price
          </div>
          <div className="text-sm sm:text-base font-black text-foreground mt-0.5">
            {formatPrice(currentPrice, currency)}
          </div>
        </div>

        <div className="p-3 rounded-xl bg-secondary/30 border border-border/60">
          <div className="text-[10px] font-bold text-muted-foreground uppercase">
            Price Drop
          </div>
          <div className="text-sm sm:text-base font-black text-blue-600 dark:text-blue-400 mt-0.5">
            {priceDrop > 0 ? `-${priceDrop}%` : "Stable"}
          </div>
        </div>
      </div>

      {/* Recharts Area Chart */}
      <div className="h-56 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 10, fill: "#888888" }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 10, fill: "#888888" }}
              domain={["dataMin - 1000", "dataMax + 1000"]}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-popover border border-border shadow-xl rounded-xl p-2.5 text-xs">
                      <div className="text-muted-foreground">{payload[0].payload.date}</div>
                      <div className="font-extrabold text-foreground text-sm mt-0.5">
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
              stroke="#3b82f6"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#priceGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
