"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Cpu,
  Search,
  Scale,
  Sparkles,
  Zap,
  Bookmark,
  Layers,
  ChevronDown,
  ShoppingBag,
  ShieldCheck,
  Menu,
  X
} from "lucide-react";
import { useCurrencyStore } from "@/store/useCurrencyStore";
import { useComparisonStore } from "@/store/useComparisonStore";
import { useUserStore } from "@/store/useUserStore";
import { PRODUCTS } from "@/data/products";
import { Currency, Region } from "@/types";

export function Header() {
  const router = useRouter();
  const { currency, region, setCurrency, setRegion } = useCurrencyStore();
  const { compareList } = useComparisonStore();
  const { bookmarks, savedBuilds } = useUserStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);

  // Quick search filtered results
  const searchResults = searchQuery.trim()
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.subcategory.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 6)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSelectCurrency = (c: Currency, r: Region) => {
    setCurrency(c);
    setRegion(r);
    setIsCurrencyDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/95 backdrop-blur-md transition-colors">
      {/* Top Banner: Quiet, high-craft hardware market notice */}
      <div className="bg-muted/40 border-b border-border/40 text-[11px] font-mono py-1 px-4 text-muted-foreground">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 truncate">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-foreground/90 uppercase tracking-wider text-[10px]">
              Live Index
            </span>
            <span className="hidden sm:inline opacity-70">•</span>
            <span className="truncate opacity-80">
              Tracking verified pricing across {region === "AU" ? "Scorptec, Centre Com, Mwave, JB Hi-Fi & Amazon AU" : "Amazon India, MDComputers, PrimeABGB, Vedant & EliteHubs"}
            </span>
          </div>

          <div className="flex items-center space-x-4 shrink-0">
            <span className="flex items-center opacity-80">
              <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-500" />
              Verified Retailers
            </span>
            <span className="opacity-60 hidden md:inline">
              100% Independent Lab Testing
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold transition-transform group-hover:scale-105">
              <Cpu className="w-4 h-4" />
            </div>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-base font-black tracking-tight text-foreground">
                TechAdvisor
              </span>
              <span className="text-[10px] font-mono font-bold uppercase px-1.5 py-0.2 rounded bg-primary/10 text-primary border border-primary/20">
                AI
              </span>
            </div>
          </Link>

          {/* Center Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-sm mx-8 relative">
            <form onSubmit={handleSearchSubmit} className="w-full relative">
              <input
                type="text"
                placeholder="Search RTX 4070, Ryzen 7, Laptops, NAS..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => setIsSearchOpen(true)}
                className="w-full bg-secondary/50 border border-border focus:border-primary focus:bg-background rounded-lg py-1.5 pl-8 pr-8 text-xs placeholder:text-muted-foreground focus:outline-none transition-colors"
              />
              <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-2.5 top-1/2 -translate-y-1/2" />
              <kbd className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-mono text-muted-foreground border border-border rounded px-1 bg-background">
                /
              </kbd>
            </form>

            {/* Instant Search Dropdown */}
            {isSearchOpen && searchResults.length > 0 && (
              <div
                className="absolute left-0 right-0 top-full mt-1.5 bg-card border border-border shadow-2xl rounded-xl p-1.5 z-50"
                onMouseLeave={() => setIsSearchOpen(false)}
              >
                <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground px-2 py-1">
                  Matching Products & Components
                </div>
                {searchResults.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    onClick={() => setIsSearchOpen(false)}
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary/70 transition-colors group"
                  >
                    <div>
                      <div className="text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
                        {product.name}
                      </div>
                      <div className="text-[11px] text-muted-foreground capitalize">
                        {product.subcategory.replace("-", " ")} • {product.brand}
                      </div>
                    </div>
                    <div className="text-right font-mono">
                      <div className="text-xs font-bold text-foreground">
                        {currency === "INR"
                          ? `₹${product.basePriceINR.toLocaleString("en-IN")}`
                          : currency === "AUD"
                          ? `A$${product.basePriceAUD.toLocaleString("en-AU")}`
                          : `$${product.basePriceUSD}`}
                      </div>
                      <div className="text-[10px] text-emerald-600 font-semibold">
                        ★ {product.rating}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden xl:flex items-center space-x-1 font-medium text-xs">
            <Link
              href="/pc-builder"
              className="px-2.5 py-1.5 rounded-lg text-foreground hover:bg-secondary hover:text-primary transition-colors flex items-center space-x-1.5"
            >
              <Cpu className="w-3.5 h-3.5 text-blue-500" />
              <span>PC Builder</span>
            </Link>

            <Link
              href="/compare"
              className="px-2.5 py-1.5 rounded-lg text-foreground hover:bg-secondary hover:text-primary transition-colors flex items-center space-x-1.5"
            >
              <Scale className="w-3.5 h-3.5 text-purple-500" />
              <span>Compare</span>
            </Link>

            <Link
              href="/fps-estimator"
              className="px-2.5 py-1.5 rounded-lg text-foreground hover:bg-secondary hover:text-primary transition-colors flex items-center space-x-1.5"
            >
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>FPS Estimator</span>
            </Link>

            <Link
              href="/ai-advisor"
              className="px-2.5 py-1.5 rounded-lg text-foreground hover:bg-secondary hover:text-primary transition-colors flex items-center space-x-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
              <span>AI Advisor</span>
            </Link>

            <Link
              href="/deals"
              className="px-2.5 py-1.5 rounded-lg text-foreground hover:bg-secondary hover:text-primary transition-colors flex items-center space-x-1.5"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-rose-500" />
              <span>Deals</span>
            </Link>

            <Link
              href="/buying-guides"
              className="px-2.5 py-1.5 rounded-lg text-foreground hover:bg-secondary hover:text-primary transition-colors flex items-center space-x-1.5"
            >
              <Layers className="w-3.5 h-3.5 text-emerald-500" />
              <span>Guides</span>
            </Link>

            <Link
              href="/admin/import"
              className="px-2.5 py-1.5 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors flex items-center space-x-1"
              title="Import Products from Amazon"
            >
              <span>Amazon Import</span>
            </Link>
          </nav>

          {/* Right Action Icons: Currency Selector, Compare Tray, Bookmarks */}
          <div className="flex items-center space-x-2">
            {/* Region / Currency Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg border border-border text-xs font-mono font-semibold bg-secondary/40 hover:bg-secondary transition-colors"
                title="Select Region & Currency"
              >
                <span>
                  {currency === "INR" ? "🇮🇳 INR (₹)" : currency === "AUD" ? "🇦🇺 AUD (A$)" : "🇺🇸 USD ($)"}
                </span>
                <ChevronDown className="w-3 h-3 text-muted-foreground ml-0.5" />
              </button>

              {isCurrencyDropdownOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-48 bg-card border border-border shadow-xl rounded-xl p-1.5 z-50 text-xs">
                  <div className="px-2 py-1 text-[10px] font-mono uppercase text-muted-foreground">
                    Select Target Market
                  </div>
                  <button
                    onClick={() => handleSelectCurrency("INR", "IN")}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-colors ${
                      currency === "INR" ? "bg-primary text-primary-foreground font-bold" : "hover:bg-secondary"
                    }`}
                  >
                    <span>🇮🇳 India (INR ₹)</span>
                  </button>
                  <button
                    onClick={() => handleSelectCurrency("AUD", "AU")}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-colors ${
                      currency === "AUD" ? "bg-primary text-primary-foreground font-bold" : "hover:bg-secondary"
                    }`}
                  >
                    <span>🇦🇺 Australia (AUD A$)</span>
                  </button>
                  <button
                    onClick={() => handleSelectCurrency("USD", "US")}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-colors ${
                      currency === "USD" ? "bg-primary text-primary-foreground font-bold" : "hover:bg-secondary"
                    }`}
                  >
                    <span>🇺🇸 Global / US (USD $)</span>
                  </button>
                </div>
              )}
            </div>

            {/* Compare Pill Trigger */}
            <Link
              href="/compare"
              className="relative p-2 rounded-lg border border-border bg-secondary/30 hover:bg-secondary text-foreground transition-colors flex items-center justify-center"
              title="View Side-by-Side Comparisons"
            >
              <Scale className="w-3.5 h-3.5 text-muted-foreground" />
              {compareList.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground font-mono font-bold text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center">
                  {compareList.length}
                </span>
              )}
            </Link>

            {/* Saved Items / Dashboard Link */}
            <Link
              href="/dashboard"
              className="relative p-2 rounded-lg border border-border bg-secondary/30 hover:bg-secondary text-foreground transition-colors flex items-center justify-center"
              title="Saved Builds & Watchlist"
            >
              <Bookmark className="w-3.5 h-3.5 text-muted-foreground" />
              {(bookmarks.length > 0 || savedBuilds.length > 0) && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white font-mono font-bold text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center">
                  {bookmarks.length + savedBuilds.length}
                </span>
              )}
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg border border-border text-foreground hover:bg-secondary"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="xl:hidden border-t border-border bg-card px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top duration-150">
          <form onSubmit={handleSearchSubmit} className="relative mb-3">
            <input
              type="text"
              placeholder="Search components, laptops, guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-secondary border border-border rounded-lg py-2 pl-9 pr-3 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          </form>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <Link
              href="/pc-builder"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center space-x-2 p-2 rounded-lg bg-secondary/60 hover:bg-secondary font-semibold"
            >
              <Cpu className="w-3.5 h-3.5 text-blue-500" />
              <span>PC Builder</span>
            </Link>
            <Link
              href="/compare"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center space-x-2 p-2 rounded-lg bg-secondary/60 hover:bg-secondary font-semibold"
            >
              <Scale className="w-3.5 h-3.5 text-purple-500" />
              <span>Comparisons</span>
            </Link>
            <Link
              href="/fps-estimator"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center space-x-2 p-2 rounded-lg bg-secondary/60 hover:bg-secondary font-semibold"
            >
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>FPS Estimator</span>
            </Link>
            <Link
              href="/ai-advisor"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center space-x-2 p-2 rounded-lg bg-secondary/60 hover:bg-secondary font-semibold"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
              <span>AI Advisor</span>
            </Link>
            <Link
              href="/deals"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center space-x-2 p-2 rounded-lg bg-secondary/60 hover:bg-secondary font-semibold"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-rose-500" />
              <span>Deals Hub</span>
            </Link>
            <Link
              href="/buying-guides"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center space-x-2 p-2 rounded-lg bg-secondary/60 hover:bg-secondary font-semibold"
            >
              <Layers className="w-3.5 h-3.5 text-emerald-500" />
              <span>Buying Guides</span>
            </Link>
            <Link
              href="/admin/import"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center space-x-2 p-2 rounded-lg bg-secondary/60 hover:bg-secondary font-semibold col-span-2"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-amber-500" />
              <span>Amazon Importer</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
