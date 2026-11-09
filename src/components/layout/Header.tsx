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
  ExternalLink,
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
  const { compareList, clearCompare } = useComparisonStore();
  const { bookmarks, savedBuilds } = useUserStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [isCompareDrawerOpen, setIsCompareDrawerOpen] = useState(false);

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
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/90 backdrop-blur-md transition-all">
      {/* Top Banner: Regional Notice & Price Tracking Stat */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-700 text-white text-xs py-1.5 px-4 font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2 truncate">
            <span className="bg-white/20 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider font-bold">
              Live Price Tracking
            </span>
            <span className="hidden sm:inline">
              Tracking real-time pricing across {region === "AU" ? "Scorptec, Centre Com, Mwave, JB Hi-Fi & Amazon AU" : "Amazon India, MDComputers, PrimeABGB, Vedant & EliteHubs"}
            </span>
            <span className="sm:hidden">
              Tracking India & Australia tech prices
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="flex items-center text-[11px] opacity-90">
              <ShieldCheck className="w-3.5 h-3.5 mr-1" />
              Verified Retailers
            </span>
            <span className="text-[11px] opacity-80 hidden md:inline">
              No sponsored bias
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-xl font-black tracking-tight bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text">
                  TechAdvisor
                </span>
                <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                  AI
                </span>
              </div>
              <p className="text-[10px] text-muted-foreground font-medium hidden sm:block">
                Australia & India Tech Intelligence
              </p>
            </div>
          </Link>

          {/* Center Search Bar with Instant Autocomplete */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8 relative">
            <form onSubmit={handleSearchSubmit} className="w-full relative">
              <input
                type="text"
                placeholder="Search RTX 4070, Ryzen 7, Gaming Laptops, NAS..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => setIsSearchOpen(true)}
                className="w-full bg-secondary/70 border border-border/80 focus:border-primary/60 focus:bg-background rounded-full py-2 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
              <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
            </form>

            {/* Instant Search Dropdown */}
            {isSearchOpen && searchResults.length > 0 && (
              <div
                className="absolute left-0 right-0 top-full mt-2 bg-card border border-border shadow-2xl rounded-2xl p-2 z-50"
                onMouseLeave={() => setIsSearchOpen(false)}
              >
                <div className="text-[11px] font-semibold text-muted-foreground px-3 py-1.5 uppercase tracking-wider">
                  Matching Products & Components
                </div>
                {searchResults.map((product) => (
                  <Link
                    key={product.id}
                    href={`/product/${product.slug}`}
                    onClick={() => setIsSearchOpen(false)}
                    className="flex items-center justify-between p-2 rounded-xl hover:bg-secondary/70 transition-colors group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center font-bold text-xs text-muted-foreground">
                        {product.brand.substring(0, 2)}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                          {product.name}
                        </div>
                        <div className="text-xs text-muted-foreground capitalize">
                          {product.subcategory.replace("-", " ")} • {product.brand}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-foreground">
                        {currency === "INR"
                          ? `₹${product.basePriceINR.toLocaleString("en-IN")}`
                          : currency === "AUD"
                          ? `A$${product.basePriceAUD.toLocaleString("en-AU")}`
                          : `$${product.basePriceUSD}`}
                      </div>
                      <div className="text-[11px] text-emerald-600 font-medium">
                        ★ {product.rating}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden xl:flex items-center space-x-1 font-medium text-sm">
            <Link
              href="/pc-builder"
              className="px-3 py-2 rounded-lg text-foreground hover:bg-secondary hover:text-primary transition-colors flex items-center space-x-1.5"
            >
              <Cpu className="w-4 h-4 text-blue-500" />
              <span>PC Builder</span>
              <span className="text-[9px] bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold px-1.5 py-0.5 rounded ml-1">
                Flagship
              </span>
            </Link>

            <Link
              href="/compare"
              className="px-3 py-2 rounded-lg text-foreground hover:bg-secondary hover:text-primary transition-colors flex items-center space-x-1.5"
            >
              <Scale className="w-4 h-4 text-purple-500" />
              <span>Compare</span>
            </Link>

            <Link
              href="/fps-estimator"
              className="px-3 py-2 rounded-lg text-foreground hover:bg-secondary hover:text-primary transition-colors flex items-center space-x-1.5"
            >
              <Zap className="w-4 h-4 text-amber-500" />
              <span>FPS Estimator</span>
            </Link>

            <Link
              href="/ai-advisor"
              className="px-3 py-2 rounded-lg text-foreground hover:bg-secondary hover:text-primary transition-colors flex items-center space-x-1.5"
            >
              <Sparkles className="w-4 h-4 text-cyan-500" />
              <span>AI Advisor</span>
            </Link>

            <Link
              href="/deals"
              className="px-3 py-2 rounded-lg text-foreground hover:bg-secondary hover:text-primary transition-colors flex items-center space-x-1.5"
            >
              <ShoppingBag className="w-4 h-4 text-rose-500" />
              <span>Deals</span>
            </Link>

            <Link
              href="/buying-guides"
              className="px-3 py-2 rounded-lg text-foreground hover:bg-secondary hover:text-primary transition-colors flex items-center space-x-1.5"
            >
              <Layers className="w-4 h-4 text-emerald-500" />
              <span>Guides</span>
            </Link>

            <Link
              href="/admin/import"
              className="px-3 py-2 rounded-lg text-foreground hover:bg-secondary hover:text-amber-500 transition-colors flex items-center space-x-1.5"
              title="Import Products from Amazon"
            >
              <ShoppingBag className="w-4 h-4 text-amber-500" />
              <span>Amazon Import</span>
            </Link>
          </nav>

          {/* Right Action Icons: Currency Selector, Compare Tray, Bookmarks */}
          <div className="flex items-center space-x-2.5">
            {/* Region / Currency Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen)}
                className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg border border-border text-xs font-semibold bg-secondary/50 hover:bg-secondary transition-colors"
                title="Select Region & Currency"
              >
                <span>
                  {currency === "INR" ? "🇮🇳 ₹ INR" : currency === "AUD" ? "🇦🇺 A$ AUD" : "🇺🇸 $ USD"}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-muted-foreground ml-0.5" />
              </button>

              {isCurrencyDropdownOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-48 bg-card border border-border shadow-xl rounded-xl p-1.5 z-50 text-xs">
                  <div className="px-2 py-1 text-[10px] font-bold text-muted-foreground uppercase">
                    Select Target Market
                  </div>
                  <button
                    onClick={() => handleSelectCurrency("INR", "IN")}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-colors ${
                      currency === "INR" ? "bg-primary text-white font-bold" : "hover:bg-secondary"
                    }`}
                  >
                    <span>🇮🇳 India (INR ₹)</span>
                    <span className="text-[10px] opacity-80">Amazon IN, MD, Prime</span>
                  </button>
                  <button
                    onClick={() => handleSelectCurrency("AUD", "AU")}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-colors ${
                      currency === "AUD" ? "bg-primary text-white font-bold" : "hover:bg-secondary"
                    }`}
                  >
                    <span>🇦🇺 Australia (AUD A$)</span>
                    <span className="text-[10px] opacity-80">Scorptec, JB Hi-Fi</span>
                  </button>
                  <button
                    onClick={() => handleSelectCurrency("USD", "US")}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition-colors ${
                      currency === "USD" ? "bg-primary text-white font-bold" : "hover:bg-secondary"
                    }`}
                  >
                    <span>🇺🇸 Global / US (USD $)</span>
                    <span className="text-[10px] opacity-80">Amazon US, Newegg</span>
                  </button>
                </div>
              )}
            </div>

            {/* Compare Pill Trigger */}
            <Link
              href="/compare"
              className="relative p-2 rounded-lg border border-border/80 bg-secondary/50 hover:bg-secondary text-foreground transition-colors flex items-center justify-center"
              title="View Side-by-Side Comparisons"
            >
              <Scale className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              {compareList.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-purple-600 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow">
                  {compareList.length}
                </span>
              )}
            </Link>

            {/* Saved Items / Dashboard Link */}
            <Link
              href="/dashboard"
              className="relative p-2 rounded-lg border border-border/80 bg-secondary/50 hover:bg-secondary text-foreground transition-colors flex items-center justify-center"
              title="Saved Builds & Watchlist"
            >
              <Bookmark className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              {(bookmarks.length > 0 || savedBuilds.length > 0) && (
                <span className="absolute -top-1.5 -right-1.5 bg-blue-600 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow">
                  {bookmarks.length + savedBuilds.length}
                </span>
              )}
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg border border-border text-foreground hover:bg-secondary"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="xl:hidden border-t border-border bg-card px-4 pt-3 pb-6 space-y-2 shadow-2xl animate-in slide-in-from-top duration-200">
          <form onSubmit={handleSearchSubmit} className="relative mb-3">
            <input
              type="text"
              placeholder="Search components, laptops, guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-secondary border border-border rounded-xl py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Search className="w-4 h-4 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
          </form>

          <div className="grid grid-cols-2 gap-2">
            <Link
              href="/pc-builder"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center space-x-2 p-2.5 rounded-xl bg-secondary/60 hover:bg-secondary font-semibold text-sm"
            >
              <Cpu className="w-4 h-4 text-blue-500" />
              <span>PC Builder</span>
            </Link>
            <Link
              href="/compare"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center space-x-2 p-2.5 rounded-xl bg-secondary/60 hover:bg-secondary font-semibold text-sm"
            >
              <Scale className="w-4 h-4 text-purple-500" />
              <span>Comparisons</span>
            </Link>
            <Link
              href="/fps-estimator"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center space-x-2 p-2.5 rounded-xl bg-secondary/60 hover:bg-secondary font-semibold text-sm"
            >
              <Zap className="w-4 h-4 text-amber-500" />
              <span>FPS Estimator</span>
            </Link>
            <Link
              href="/ai-advisor"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center space-x-2 p-2.5 rounded-xl bg-secondary/60 hover:bg-secondary font-semibold text-sm"
            >
              <Sparkles className="w-4 h-4 text-cyan-500" />
              <span>AI Advisor</span>
            </Link>
            <Link
              href="/deals"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center space-x-2 p-2.5 rounded-xl bg-secondary/60 hover:bg-secondary font-semibold text-sm"
            >
              <ShoppingBag className="w-4 h-4 text-rose-500" />
              <span>Deals Hub</span>
            </Link>
            <Link
              href="/buying-guides"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center space-x-2 p-2.5 rounded-xl bg-secondary/60 hover:bg-secondary font-semibold text-sm"
            >
              <Layers className="w-4 h-4 text-emerald-500" />
              <span>Buying Guides</span>
            </Link>
            <Link
              href="/admin/import"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center space-x-2 p-2.5 rounded-xl bg-secondary/60 hover:bg-secondary font-semibold text-sm text-amber-500"
            >
              <ShoppingBag className="w-4 h-4 text-amber-500" />
              <span>Amazon Import</span>
            </Link>
          </div>

          <div className="pt-2 border-t border-border/60 flex items-center justify-between text-xs text-muted-foreground">
            <span>TechAdvisor AI Platform</span>
            <span>Local Market: {region === "AU" ? "Australia" : "India"}</span>
          </div>
        </div>
      )}
    </header>
  );
}
