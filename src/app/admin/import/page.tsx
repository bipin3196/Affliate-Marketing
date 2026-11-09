"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  DownloadCloud,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ShoppingBag,
  RefreshCw,
  Copy,
  Tag,
  Layers,
  Check
} from "lucide-react";
import { formatPrice } from "@/lib/currency";
import { AmazonImportResult } from "@/lib/amazon-api";

export default function AmazonImporterPage() {
  const [affiliateTag, setAffiliateTag] = useState("bipin-21");
  const [inputUrl, setInputUrl] = useState("https://www.amazon.in/dp/B0BTZB7F88");
  const [region, setRegion] = useState<"IN" | "AU" | "US">("IN");
  const [mode, setMode] = useState<"single" | "bulk">("single");
  const [isLoading, setIsLoading] = useState(false);
  const [importResult, setImportResult] = useState<AmazonImportResult | null>(null);
  const [bulkResults, setBulkResults] = useState<AmazonImportResult[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const sampleAsins = [
    { label: "Ryzen 7 7800X3D (CPU)", asin: "B0BTZB7F88" },
    { label: "RTX 4070 Super (GPU)", asin: "B0CS6Y1H1X" },
    { label: "MSI B650 Tomahawk (Motherboard)", asin: "B0BTB9MCH6" },
    { label: "Samsung 990 PRO 2TB (SSD)", asin: "B0BHJJ9358" },
    { label: "Zephyrus G16 OLED (Laptop)", asin: "B0CY2K9P11" },
    { label: "Synology DS923+ (NAS)", asin: "B0BTZ8N64M" },
  ];

  const handleImportSingle = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputUrl.trim()) return;

    setIsLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/amazon/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          asinOrUrl: inputUrl,
          region,
          customAffiliateTag: affiliateTag.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to import from Amazon");
      }

      setImportResult(data.data);
    } catch (err: any) {
      setErrorMsg(err.message || "An unexpected error occurred during import.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImportBulk = async () => {
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const allAsins = sampleAsins.map((s) => s.asin);
      const res = await fetch("/api/amazon/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: allAsins,
          region,
          customAffiliateTag: affiliateTag.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to bulk import from Amazon");
      }

      setBulkResults(data.data);
    } catch (err: any) {
      setErrorMsg(err.message || "An error occurred during bulk import.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Page Header */}
      <div className="pb-6 border-b border-border/80">
        <div className="inline-flex items-center space-x-2 text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full mb-2">
          <DownloadCloud className="w-3.5 h-3.5" />
          <span>Amazon Automated Product & Media Importer</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
          Auto-Import Products by Affiliate ID
        </h1>
        <p className="text-sm text-muted-foreground mt-1 max-w-3xl leading-relaxed">
          Provide your Amazon Associate tracking ID and any product URL or ASIN. The engine automatically extracts high-resolution packaging photos from Amazon's CDN (<code className="text-foreground">m.media-amazon.com</code>), titles, prices, specs, and embeds your affiliate link.
        </p>
      </div>

      {/* Affiliate ID Configuration Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-yellow-500/10 border-2 border-amber-500/30 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <Tag className="w-5 h-5 text-amber-500" />
            <h3 className="font-black text-base text-foreground">
              Your Amazon Associate Tracking ID
            </h3>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center self-start sm:self-auto">
            <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
            Auto-Tagging Enabled
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label className="text-[11px] font-bold text-muted-foreground uppercase block mb-1">
              Associate Tag / Store ID (e.g. yourname-21)
            </label>
            <input
              type="text"
              value={affiliateTag}
              onChange={(e) => setAffiliateTag(e.target.value)}
              placeholder="e.g. techadvisorin-21 or yourname-21"
              className="w-full bg-background border border-border rounded-xl py-2 px-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="text-[11px] font-bold text-muted-foreground uppercase block mb-1">
              Default Marketplace
            </label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value as any)}
              className="w-full bg-background border border-border rounded-xl py-2 px-3 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="IN">🇮🇳 Amazon India (tag: -21)</option>
              <option value="AU">🇦🇺 Amazon Australia (tag: -22)</option>
              <option value="US">🇺🇸 Amazon USA (tag: -20)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Mode Switcher: Single vs 1-Click Bulk */}
      <div className="flex items-center space-x-2 p-1.5 rounded-2xl bg-secondary/60 border border-border max-w-sm">
        <button
          onClick={() => setMode("single")}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
            mode === "single"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Single Product / URL
        </button>
        <button
          onClick={() => setMode("bulk")}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
            mode === "bulk"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          1-Click Bulk Auto-Import
        </button>
      </div>

      {/* Mode 1: Single Product Form */}
      {mode === "single" && (
        <div className="p-6 sm:p-8 rounded-3xl bg-card border-2 border-border shadow-xl space-y-6">
          <form onSubmit={handleImportSingle} className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground block mb-2">
                Paste Amazon Product URL or 10-Digit ASIN
              </label>
              <input
                type="text"
                value={inputUrl}
                onChange={(e) => setInputUrl(e.target.value)}
                placeholder="e.g. https://www.amazon.in/dp/B0BTZB7F88 or B0BTZB7F88"
                className="w-full bg-secondary/50 border border-border rounded-2xl py-3 px-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              />
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="text-muted-foreground font-semibold">Popular ASINs:</span>
              {sampleAsins.map((s, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setInputUrl(s.asin)}
                  className="px-2.5 py-1 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground border border-border/80 transition-colors"
                >
                  {s.label}
                </button>
              ))}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-sm shadow-lg shadow-primary/25 transition-transform hover:scale-[1.02] flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Importing from Amazon...</span>
                  </>
                ) : (
                  <>
                    <DownloadCloud className="w-4 h-4" />
                    <span>Auto-Import Product & Attach Tag</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {errorMsg && (
            <div className="p-4 rounded-2xl bg-destructive/10 border border-destructive/20 text-destructive text-xs font-bold flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}
        </div>
      )}

      {/* Mode 2: 1-Click Bulk Hardware Category Importer */}
      {mode === "bulk" && (
        <div className="p-6 sm:p-8 rounded-3xl bg-card border-2 border-border shadow-xl space-y-6">
          <div className="space-y-2">
            <h3 className="font-black text-lg text-foreground">
              1-Click Bulk Hardware Importer
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Instantly auto-import top-selling Gaming CPUs, RTX GPUs, AM5 Motherboards, Gen4 NVMe SSDs, Laptops, and NAS appliances from Amazon with your tag <span className="font-bold text-foreground">({affiliateTag})</span> attached to every item.
            </p>
          </div>

          <button
            onClick={handleImportBulk}
            disabled={isLoading}
            className="px-8 py-3.5 rounded-2xl bg-amber-600 hover:bg-amber-500 text-white font-black text-sm shadow-lg shadow-amber-600/25 transition-transform hover:scale-[1.02] flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Bulk Importing Hardware Library...</span>
              </>
            ) : (
              <>
                <Layers className="w-4 h-4" />
                <span>Auto-Import All Top Hardware ({sampleAsins.length} Items)</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Bulk Results Grid */}
      {bulkResults.length > 0 && (
        <div className="space-y-4 animate-in fade-in duration-300">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-xl text-foreground flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span>Bulk Imported ({bulkResults.length} Products with Tag "{affiliateTag}")</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bulkResults.map((product) => (
              <div
                key={product.asin}
                className="p-5 rounded-3xl bg-card border-2 border-border hover:border-primary shadow-lg flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-square rounded-2xl bg-secondary/30 border border-border p-3 overflow-hidden flex items-center justify-center mb-3">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <span className="text-xs font-bold text-primary uppercase">
                    {product.brand}
                  </span>
                  <h4 className="font-bold text-sm text-foreground mt-0.5 line-clamp-2">
                    {product.name}
                  </h4>
                  <div className="text-xs text-muted-foreground mt-1 capitalize">
                    {product.subcategory} • ASIN: {product.asin}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-border space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-lg font-black text-foreground">
                      {formatPrice(
                        region === "IN" ? product.basePriceINR : product.basePriceAUD,
                        region === "IN" ? "INR" : "AUD"
                      )}
                    </span>
                    <span className="text-xs font-bold text-amber-500">
                      ★ {product.rating}
                    </span>
                  </div>

                  <a
                    href={product.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center space-x-1 py-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs"
                  >
                    <span>Check Tagged Link</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Single Imported Result Preview */}
      {mode === "single" && importResult && (
        <div className="p-6 sm:p-8 rounded-3xl bg-card border-2 border-primary/30 shadow-2xl space-y-6 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border/80 gap-2">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <h3 className="font-black text-lg text-foreground">
                Successfully Imported from Amazon
              </h3>
            </div>
            <span className="text-xs font-bold text-muted-foreground">
              ASIN: <span className="text-foreground font-mono">{importResult.asin}</span>
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Product Images from Amazon CDN */}
            <div className="space-y-3">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-secondary/30 border border-border flex items-center justify-center p-4">
                <img
                  src={importResult.images[0]}
                  alt={importResult.name}
                  className="w-full h-full object-contain"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 text-white text-[10px] font-bold">
                  Amazon Media CDN
                </div>
              </div>

              {importResult.images.length > 1 && (
                <div className="flex gap-2">
                  {importResult.images.map((img, i) => (
                    <div
                      key={i}
                      className="w-16 h-16 rounded-xl border border-border overflow-hidden bg-secondary/20 p-1"
                    >
                      <img src={img} alt="alt" className="w-full h-full object-contain" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right 2 cols: Details, Pricing, Affiliate Tag */}
            <div className="lg:col-span-2 space-y-4">
              <div>
                <span className="text-xs font-bold text-primary uppercase">
                  {importResult.brand}
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-foreground mt-0.5 leading-snug">
                  {importResult.name}
                </h2>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                  {importResult.description}
                </p>
              </div>

              {/* Price Row */}
              <div className="p-4 rounded-2xl bg-secondary/40 border border-border flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="text-[10px] font-bold text-muted-foreground uppercase">
                    Detected Amazon Price ({region})
                  </div>
                  <div className="text-2xl font-black text-foreground mt-0.5">
                    {region === "IN"
                      ? formatPrice(importResult.basePriceINR, "INR")
                      : region === "AU"
                      ? formatPrice(importResult.basePriceAUD, "AUD")
                      : formatPrice(importResult.basePriceUSD, "USD")}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[10px] font-bold text-muted-foreground uppercase">
                    Customer Satisfaction
                  </div>
                  <div className="text-sm font-bold text-amber-500 mt-0.5">
                    ★ {importResult.rating} ({importResult.reviewCount.toLocaleString()} reviews)
                  </div>
                </div>
              </div>

              {/* Affiliate URL Box */}
              <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-blue-600 dark:text-blue-400 flex items-center">
                    <Tag className="w-3.5 h-3.5 mr-1" />
                    Generated Amazon Affiliate Link (Tag: "{affiliateTag}")
                  </span>
                  <button
                    onClick={() => handleCopyLink(importResult.affiliateUrl)}
                    className="text-[11px] font-bold text-primary hover:underline flex items-center space-x-1"
                  >
                    <Copy className="w-3 h-3" />
                    <span>{copiedLink ? "Copied!" : "Copy URL"}</span>
                  </button>
                </div>

                <div className="font-mono text-[11px] text-foreground bg-background/80 p-2.5 rounded-xl border border-border break-all">
                  {importResult.affiliateUrl}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={importResult.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs flex items-center space-x-1.5 shadow-md shadow-primary/20"
                >
                  <span>Verify on Amazon</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <Link
                  href="/pc-builder"
                  className="px-5 py-2.5 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-bold text-xs border border-border"
                >
                  Configure in PC Builder
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
