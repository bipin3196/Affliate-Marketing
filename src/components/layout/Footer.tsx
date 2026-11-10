import React from "react";
import Link from "next/link";
import { Cpu, ShieldCheck, Heart, Award, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/40 text-card-foreground mt-20">
      {/* Upper Cluster: Value Proposition */}
      <div className="border-b border-border py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-md bg-secondary flex items-center justify-center text-foreground border border-border shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-foreground">
                Independent Hardware Lab
              </h4>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Objective silicon benchmarks, thermal throttling analysis, VRM ratings, and multi-retailer live price tracking for India and Australia.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-md bg-secondary flex items-center justify-center text-foreground border border-border shrink-0">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-foreground">
                Deterministic Compatibility
              </h4>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Rules-based socket verification, DDR4/DDR5 pin matching, transient power overhead, and GPU chassis clearance checks.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-md bg-secondary flex items-center justify-center text-foreground border border-border shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-foreground">
                Real-Time Price Discovery
              </h4>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Scanning Amazon India, MDComputers, PrimeABGB, Vedant and Australian retailers (Scorptec, Centre Com, Mwave, JB Hi-Fi).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Directory Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Col 1: Platform Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-md bg-foreground text-background flex items-center justify-center font-bold">
                <Cpu className="w-3.5 h-3.5" />
              </div>
              <span className="font-bold text-sm tracking-tight text-foreground">TechAdvisor AI</span>
            </Link>
            <p className="text-xs text-muted-foreground mt-2.5 leading-relaxed">
              Hardware discovery, component configurator, and multi-retailer price engine for Australia, India, and global buyers.
            </p>
            <div className="mt-3 flex items-center space-x-1.5 font-mono text-[10px] text-muted-foreground">
              <span className="px-1.5 py-0.5 rounded bg-secondary border border-border">IN ₹</span>
              <span className="px-1.5 py-0.5 rounded bg-secondary border border-border">AU A$</span>
              <span className="px-1.5 py-0.5 rounded bg-secondary border border-border">US $</span>
            </div>
          </div>

          {/* Col 2: Core Tools */}
          <div>
            <h5 className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-2.5">
              Engines
            </h5>
            <ul className="space-y-1.5 text-xs text-muted-foreground">
              <li>
                <Link href="/pc-builder" className="hover:text-foreground transition-colors flex items-center">
                  PC Configurator <ArrowUpRight className="w-3 h-3 ml-0.5" />
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-foreground transition-colors">
                  Spec Matrix
                </Link>
              </li>
              <li>
                <Link href="/fps-estimator" className="hover:text-foreground transition-colors">
                  FPS Estimator
                </Link>
              </li>
              <li>
                <Link href="/ai-advisor" className="hover:text-foreground transition-colors">
                  AI Buying Advisor
                </Link>
              </li>
              <li>
                <Link href="/deals" className="hover:text-foreground transition-colors">
                  Deals Monitor
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Hardware Categories */}
          <div>
            <h5 className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-2.5">
              Categories
            </h5>
            <ul className="space-y-1.5 text-xs text-muted-foreground">
              <li>
                <Link href="/category/cpus" className="hover:text-foreground transition-colors">
                  Processors (CPUs)
                </Link>
              </li>
              <li>
                <Link href="/category/gpus" className="hover:text-foreground transition-colors">
                  Graphics Cards (GPUs)
                </Link>
              </li>
              <li>
                <Link href="/category/motherboards" className="hover:text-foreground transition-colors">
                  Motherboards
                </Link>
              </li>
              <li>
                <Link href="/category/laptops" className="hover:text-foreground transition-colors">
                  Laptops & Mobile
                </Link>
              </li>
              <li>
                <Link href="/category/monitors" className="hover:text-foreground transition-colors">
                  Displays & OLED
                </Link>
              </li>
              <li>
                <Link href="/category/storage" className="hover:text-foreground transition-colors">
                  Storage & NAS
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Popular Buying Guides */}
          <div>
            <h5 className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-2.5">
              Buying Guides
            </h5>
            <ul className="space-y-1.5 text-xs text-muted-foreground">
              <li>
                <Link href="/buying-guides/best-gaming-pc-under-75000" className="hover:text-foreground transition-colors">
                  Gaming PC Under ₹75K
                </Link>
              </li>
              <li>
                <Link href="/buying-guides/best-gaming-laptops" className="hover:text-foreground transition-colors">
                  Best Gaming Laptops 2026
                </Link>
              </li>
              <li>
                <Link href="/buying-guides/best-docking-station" className="hover:text-foreground transition-colors">
                  Thunderbolt 4 Docks
                </Link>
              </li>
              <li>
                <Link href="/buying-guides/best-nas-device" className="hover:text-foreground transition-colors">
                  Small Business NAS
                </Link>
              </li>
              <li>
                <Link href="/pc-builder" className="hover:text-foreground transition-colors">
                  Custom Build Presets
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Retailers */}
          <div>
            <h5 className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-2.5">
              Retail Coverage
            </h5>
            <div className="space-y-2 text-xs text-muted-foreground font-mono text-[11px]">
              <div>
                <span className="text-foreground font-semibold">IN: </span>
                Amazon IN, MDComputers, PrimeABGB, Vedant
              </div>
              <div>
                <span className="text-foreground font-semibold">AU: </span>
                Amazon AU, Scorptec, Centre Com, Mwave, JB Hi-Fi
              </div>
            </div>
          </div>
        </div>

        {/* Affiliate Disclosure */}
        <div className="mt-10 pt-6 border-t border-border">
          <div className="bg-secondary/20 border border-border rounded-lg p-3.5 text-xs text-muted-foreground leading-relaxed">
            <span className="font-semibold text-foreground">Disclosure: </span>
            TechAdvisor AI participates in the Amazon Services LLC Associates Program and partner affiliate networks. When purchasing through our links, we may receive an affiliate commission. Editorial integrity and lab benchmarks are never influenced by commercial relationships.
          </div>

          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-2 font-mono text-[11px]">
            <p>© {new Date().getFullYear()} TechAdvisor AI. All rights reserved.</p>
            <div className="flex items-center space-x-3">
              <Link href="/privacy" className="hover:text-foreground">Privacy</Link>
              <Link href="/terms" className="hover:text-foreground">Terms</Link>
              <Link href="/editorial-standards" className="hover:text-foreground">Standards</Link>
              <Link href="/contact" className="hover:text-foreground">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
