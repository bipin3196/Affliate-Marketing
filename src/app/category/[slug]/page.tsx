import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS } from "@/data/products";
import { formatPrice } from "@/lib/currency";
import { Star, ArrowRight, Scale, Cpu, ShieldCheck } from "lucide-react";
import { Metadata } from "next";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const capitalized = slug.charAt(0).toUpperCase() + slug.slice(1);

  return {
    title: `Best ${capitalized} 2026 - Comparisons, Prices & Reviews | TechAdvisor AI`,
    description: `Discover top rated ${capitalized} tested by TechAdvisor AI hardware labs with live prices across India and Australia stores.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  // Filter products by category or subcategory
  const products = PRODUCTS.filter(
    (p) => p.category === slug || p.subcategory === slug
  );

  const displayTitle = slug.replace("-", " ").toUpperCase();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-border/80">
        <nav className="flex items-center space-x-2 text-xs text-muted-foreground mb-2">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <span className="text-foreground font-semibold capitalize">{slug.replace("-", " ")}</span>
        </nav>

        <h1 className="text-3xl sm:text-4xl font-black text-foreground tracking-tight">
          {displayTitle}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Explore lab-tested {slug.replace("-", " ")} with live multi-store price comparisons, verified ratings, and benchmark specs.
        </p>
      </div>

      {/* Product Grid */}
      {products.length === 0 ? (
        <div className="p-12 text-center text-sm text-muted-foreground bg-secondary/20 rounded-3xl border border-dashed border-border">
          No products listed yet under {displayTitle}. Check back soon as our hardware catalog updates daily!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="p-5 rounded-3xl bg-card border border-border shadow-md hover:border-primary/50 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-primary uppercase">
                    {product.brand}
                  </span>
                  {product.badges && product.badges.length > 0 && (
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
                      {product.badges[0]}
                    </span>
                  )}
                </div>

                <Link href={`/product/${product.slug}`}>
                  <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                </Link>

                <p className="text-xs text-muted-foreground mt-2 line-clamp-2 leading-relaxed">
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
                  <span className="text-[11px] text-muted-foreground capitalize">
                    {product.subcategory.replace("-", " ")}
                  </span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-muted-foreground">Base Price:</div>
                  <div className="text-lg font-black text-foreground">
                    {formatPrice(product.basePriceINR, "INR")}
                  </div>
                </div>

                <Link
                  href={`/product/${product.slug}`}
                  className="px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs shadow-sm flex items-center space-x-1"
                >
                  <span>View Deals</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
