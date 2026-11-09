"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Layers, ArrowRight, Clock, User, Sparkles } from "lucide-react";
import { BUYING_GUIDES } from "@/data/buyingGuides";

export function BuyingGuidesIndexView() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header */}
      <div className="pb-6 border-b border-border/80">
        <div className="inline-flex items-center space-x-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full mb-2">
          <Layers className="w-3.5 h-3.5" />
          <span>Independent Hardware Lab Editorial Guides</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
          Expert Buying Guides
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          In-depth testing, architectural breakdowns, thermal comparisons, and recommendations for builders, gamers, and professionals.
        </p>
      </div>

      {/* Featured Guide Banner (Top Pick) */}
      {BUYING_GUIDES.length > 0 && (
        <Link
          href={`/buying-guides/${BUYING_GUIDES[0].slug}`}
          className="group block relative rounded-3xl overflow-hidden border border-border shadow-xl hover:border-primary/60 transition-all bg-card"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative aspect-[16/10] lg:aspect-auto">
              <img
                src={BUYING_GUIDES[0].heroImage}
                alt={BUYING_GUIDES[0].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <span className="text-xs font-black uppercase px-3 py-1 rounded-full bg-emerald-600 text-white shadow-md">
                  Featured Buying Guide
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                  <span className="capitalize text-primary font-bold">{BUYING_GUIDES[0].category}</span>
                  <span>•</span>
                  <span className="flex items-center">
                    <Clock className="w-3.5 h-3.5 mr-1" /> {BUYING_GUIDES[0].readTime}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-foreground group-hover:text-primary transition-colors leading-tight">
                  {BUYING_GUIDES[0].title}
                </h2>

                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {BUYING_GUIDES[0].summary}
                </p>
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-between text-xs">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <User className="w-4 h-4" />
                  <span>{BUYING_GUIDES[0].author}</span>
                </div>
                <span className="font-bold text-primary flex items-center">
                  Read Full Guide <ArrowRight className="w-4 h-4 ml-1" />
                </span>
              </div>
            </div>
          </div>
        </Link>
      )}

      {/* Grid of Remaining Guides */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {BUYING_GUIDES.slice(1).map((guide) => (
          <Link
            key={guide.id}
            href={`/buying-guides/${guide.slug}`}
            className="group rounded-3xl overflow-hidden border border-border bg-card shadow-md hover:border-primary/50 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={guide.heroImage}
                  alt={guide.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-5 space-y-2">
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <span className="text-primary font-bold capitalize">{guide.category}</span>
                  <span>•</span>
                  <span>{guide.readTime}</span>
                </div>

                <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors line-clamp-2">
                  {guide.title}
                </h3>

                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {guide.summary}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0 flex items-center justify-between text-xs text-muted-foreground border-t border-border/50">
              <span>{guide.author.split(",")[0]}</span>
              <span className="text-primary font-bold flex items-center">
                Read Guide <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
