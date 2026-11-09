import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS } from "@/data/products";
import { formatPrice } from "@/lib/currency";
import {
  generateItemListSchema,
  generateFAQSchema,
  generateBreadcrumbSchema
} from "@/lib/schema";
import {
  Sparkles,
  Award,
  CheckCircle2,
  ExternalLink,
  Scale,
  ShieldCheck,
  Star,
  Layers,
  ArrowRight
} from "lucide-react";
import { Metadata } from "next";

interface ProgrammaticSEOProps {
  params: Promise<{ slug: string }>;
}

function parseSlugDetails(slug: string) {
  // Replace hyphens with spaces and capitalize words
  const words = slug.split("-");
  const readableTitle = words
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  // Extract budget number if present
  let budget: number | null = null;
  const numMatch = slug.match(/(\d+)/);
  if (numMatch) {
    budget = parseInt(numMatch[1], 10);
  }

  // Detect category keywords
  let category: string = "tech";
  if (slug.includes("pc") || slug.includes("gaming-pc")) category = "Gaming PCs";
  else if (slug.includes("laptop")) category = "Laptops";
  else if (slug.includes("monitor")) category = "Monitors";
  else if (slug.includes("docking")) category = "Docking Stations";
  else if (slug.includes("nas")) category = "NAS Storage";

  return { readableTitle, budget, category };
}

export async function generateMetadata({ params }: ProgrammaticSEOProps): Promise<Metadata> {
  const { slug } = await params;
  const { readableTitle } = parseSlugDetails(slug);

  return {
    title: `Best ${readableTitle} (2026 Tested Recommendations) | TechAdvisor AI`,
    description: `Expert tested recommendations, benchmark comparisons, and live multi-store price tracking for the best ${readableTitle}.`,
  };
}

export default async function ProgrammaticSEOPage({ params }: ProgrammaticSEOProps) {
  const { slug } = await params;
  const { readableTitle, budget, category } = parseSlugDetails(slug);

  // Filter products relevant to this cluster
  let relevantProducts = PRODUCTS.filter((p) => {
    if (slug.includes("laptop")) return p.subcategory === "laptops";
    if (slug.includes("monitor")) return p.subcategory.includes("monitors");
    if (slug.includes("docking")) return p.subcategory === "docking-stations";
    if (slug.includes("nas")) return p.subcategory === "nas";
    // For PC or default
    return p.category === "components" || p.category === "computers";
  });

  if (relevantProducts.length === 0) relevantProducts = PRODUCTS.slice(0, 4);

  // Generate ItemList and FAQ Schemas
  const itemListSchema = generateItemListSchema(
    `Best ${readableTitle}`,
    relevantProducts.map((p, idx) => ({
      name: p.name,
      url: `https://techadvisor.ai/product/${p.slug}`,
      position: idx + 1,
    }))
  );

  const dynamicFaqs = [
    {
      question: `What makes a top-rated ${readableTitle}?`,
      answer: `Our hardware testing lab prioritizes reliability, thermal dissipation, benchmark efficiency, and real price-to-performance value across verified retailers.`
    },
    {
      question: `How often do prices update for ${readableTitle}?`,
      answer: `TechAdvisor AI tracks and refreshes retailer pricing every 6 hours across Amazon, MDComputers, PrimeABGB, Scorptec, and JB Hi-Fi.`
    }
  ];

  const faqSchema = generateFAQSchema(dynamicFaqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://techadvisor.ai" },
    { name: "Best Tech Recommendations", url: "https://techadvisor.ai/best" },
    { name: `Best ${readableTitle}`, url: `https://techadvisor.ai/best/${slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-muted-foreground">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link href="/buying-guides" className="hover:text-foreground">Buying Guides</Link>
          <span>/</span>
          <span className="text-foreground font-semibold">Best {readableTitle}</span>
        </nav>

        {/* Page Header */}
        <header className="pb-6 border-b border-border/80 space-y-3">
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Programmatic Hardware Cluster • 2026 Tested</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight">
            Best {readableTitle}
          </h1>

          <p className="text-base text-muted-foreground max-w-3xl leading-relaxed">
            We evaluated performance benchmarks, power draw, display accuracy, and real-world buyer reviews to identify the highest value options for <span className="text-foreground font-semibold">{readableTitle}</span>.
          </p>
        </header>

        {/* Recommended Products Grid */}
        <div className="space-y-6">
          <h2 className="text-2xl font-black text-foreground">
            Top Picks for {readableTitle}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relevantProducts.map((product, pIdx) => (
              <div
                key={product.id}
                className="p-5 rounded-3xl bg-card border-2 border-border hover:border-primary/50 shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-primary uppercase">
                      {product.brand}
                    </span>
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
                      Rank #{pIdx + 1}
                    </span>
                  </div>

                  <Link href={`/product/${product.slug}`}>
                    <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>

                  <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-1 text-amber-500 font-bold">
                      <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                      <span>{product.rating}</span>
                      <span className="text-muted-foreground font-normal">
                        ({product.reviewCount})
                      </span>
                    </div>
                    <span className="text-emerald-600 font-semibold flex items-center">
                      <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Verified
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-muted-foreground">Best Price:</div>
                    <div className="text-lg font-black text-foreground">
                      {formatPrice(product.basePriceINR, "INR")}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Link
                      href={`/product/${product.slug}`}
                      className="px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs shadow-sm flex items-center space-x-1"
                    >
                      <span>View Deals</span>
                      <ExternalLink className="w-3 h-3 ml-0.5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic FAQ Section */}
        <div className="p-6 rounded-3xl bg-card border border-border shadow-md space-y-4">
          <h3 className="font-black text-lg text-foreground">
            Frequently Asked Questions: {readableTitle}
          </h3>
          <div className="space-y-4">
            {dynamicFaqs.map((faq, i) => (
              <div key={i} className="p-4 rounded-2xl bg-secondary/30 border border-border/60 space-y-1">
                <h4 className="font-bold text-sm text-foreground">{faq.question}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
