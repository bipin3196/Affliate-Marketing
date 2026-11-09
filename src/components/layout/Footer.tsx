import React from "react";
import Link from "next/link";
import { Cpu, ShieldCheck, Heart, Award, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/60 text-card-foreground mt-20">
      {/* Upper Cluster: Value Proposition */}
      <div className="border-b border-border/80 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start space-x-3.5">
            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-foreground">100% Unbiased Hardware Testing</h4>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                We independently benchmark real-world FPS, thermal throttling, VRM performance, and real-time market pricing across India and Australia.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3.5">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-foreground">Intelligent Compatibility Engine</h4>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Automated socket checks, DDR4/DDR5 memory validation, PSU overhead estimation, and GPU case clearance algorithms.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3.5">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-foreground">Multi-Retailer Price Drops</h4>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Comparing Amazon India, MDComputers, PrimeABGB, Vedant & Australian stores (Scorptec, Centre Com, Mwave, JB Hi-Fi).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Directory Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Col 1: Platform Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
                <Cpu className="w-4 h-4" />
              </div>
              <span className="font-black text-lg tracking-tight">TechAdvisor AI</span>
            </Link>
            <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
              The premier technology discovery, PC builder, and multi-retailer price comparison platform for Australia, India, and beyond.
            </p>
            <div className="mt-4 flex items-center space-x-2 text-xs text-muted-foreground">
              <span className="px-2 py-0.5 rounded bg-secondary border border-border">🇮🇳 India</span>
              <span className="px-2 py-0.5 rounded bg-secondary border border-border">🇦🇺 Australia</span>
              <span className="px-2 py-0.5 rounded bg-secondary border border-border">🌐 Global</span>
            </div>
          </div>

          {/* Col 2: Core Tools */}
          <div>
            <h5 className="font-bold text-xs uppercase tracking-wider text-foreground mb-3">
              Tools & Engines
            </h5>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="/pc-builder" className="hover:text-primary transition-colors flex items-center">
                  PC Part Picker & Builder <ArrowUpRight className="w-3 h-3 ml-0.5" />
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-primary transition-colors">
                  4-Way Product Comparison
                </Link>
              </li>
              <li>
                <Link href="/fps-estimator" className="hover:text-primary transition-colors">
                  Game FPS Estimator
                </Link>
              </li>
              <li>
                <Link href="/ai-advisor" className="hover:text-primary transition-colors">
                  AI Buying Advisor
                </Link>
              </li>
              <li>
                <Link href="/deals" className="hover:text-primary transition-colors">
                  Live Deals & Sales Hub
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Hardware Categories */}
          <div>
            <h5 className="font-bold text-xs uppercase tracking-wider text-foreground mb-3">
              Categories
            </h5>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="/category/cpus" className="hover:text-primary transition-colors">
                  Processors (CPUs)
                </Link>
              </li>
              <li>
                <Link href="/category/gpus" className="hover:text-primary transition-colors">
                  Graphics Cards (GPUs)
                </Link>
              </li>
              <li>
                <Link href="/category/motherboards" className="hover:text-primary transition-colors">
                  Motherboards (AM5 / LGA)
                </Link>
              </li>
              <li>
                <Link href="/category/laptops" className="hover:text-primary transition-colors">
                  Gaming & Creator Laptops
                </Link>
              </li>
              <li>
                <Link href="/category/monitors" className="hover:text-primary transition-colors">
                  OLED & 144Hz Displays
                </Link>
              </li>
              <li>
                <Link href="/category/storage" className="hover:text-primary transition-colors">
                  NAS & NVMe Gen4/Gen5
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Popular Buying Guides (SEO Clusters) */}
          <div>
            <h5 className="font-bold text-xs uppercase tracking-wider text-foreground mb-3">
              Buying Guides
            </h5>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>
                <Link href="/buying-guides/best-gaming-pc-under-75000" className="hover:text-primary transition-colors">
                  Best Gaming PC Under ₹75,000
                </Link>
              </li>
              <li>
                <Link href="/buying-guides/best-gaming-laptops" className="hover:text-primary transition-colors">
                  Best Gaming Laptops 2026
                </Link>
              </li>
              <li>
                <Link href="/buying-guides/best-docking-station" className="hover:text-primary transition-colors">
                  Best Thunderbolt 4 Docks
                </Link>
              </li>
              <li>
                <Link href="/buying-guides/best-nas-device" className="hover:text-primary transition-colors">
                  Best Home & Small Biz NAS
                </Link>
              </li>
              <li>
                <Link href="/pc-builder?preset=150000-enthusiast-gaming-pc" className="hover:text-primary transition-colors">
                  ₹150,000 RTX 4070S Build
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Verified Retailers */}
          <div>
            <h5 className="font-bold text-xs uppercase tracking-wider text-foreground mb-3">
              Tracked Retailers
            </h5>
            <div className="space-y-1.5 text-xs text-muted-foreground">
              <p className="font-semibold text-foreground text-[11px]">🇮🇳 India:</p>
              <p>Amazon IN • MDComputers • PrimeABGB • Vedant Computers • EliteHubs • PCStudio</p>
              <p className="font-semibold text-foreground text-[11px] pt-1.5">🇦🇺 Australia:</p>
              <p>Amazon AU • Scorptec • Centre Com • Mwave • CPL • JB Hi-Fi • Officeworks</p>
            </div>
          </div>
        </div>

        {/* Affiliate Disclosure & Compliance Banner */}
        <div className="mt-12 pt-8 border-t border-border/80">
          <div className="bg-secondary/40 border border-border/60 rounded-2xl p-4 sm:p-5 text-xs text-muted-foreground leading-relaxed">
            <span className="font-bold text-foreground block mb-1">
              Affiliate Disclosure & Transparency Statement:
            </span>
            TechAdvisor AI is an independent tech advisory publication. We participate in the Amazon Services LLC Associates Program, Amazon India Associates Program, and partner affiliate networks (Commission Factory, Impact, Partnerize, CJ). When you click through our links and complete a purchase, we may earn an affiliate commission at no extra cost to you. This monetization model funds our lab hardware testing, programmatic benchmark scrapers, and database operations. Our reviews, ratings, and compatibility verdicts are 100% editorially independent.
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-3">
            <p>© {new Date().getFullYear()} TechAdvisor AI. All rights reserved.</p>
            <div className="flex items-center space-x-4">
              <Link href="/privacy" className="hover:text-foreground">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-foreground">Terms of Service</Link>
              <Link href="/editorial-standards" className="hover:text-foreground">Editorial Standards</Link>
              <Link href="/contact" className="hover:text-foreground">Contact & Corrections</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
