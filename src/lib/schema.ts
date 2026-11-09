import { Product, BuyingGuide, Deal } from "@/types";

export function generateProductSchema(product: Product, currentUrl: string) {
  return {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: product.images,
    description: product.description,
    brand: {
      "@type": "Brand",
      name: product.brand,
    },
    offers: {
      "@type": "AggregateOffer",
      url: currentUrl,
      priceCurrency: "INR",
      lowPrice: product.basePriceINR,
      highPrice: Math.round(product.basePriceINR * 1.15),
      offerCount: product.retailers?.length || 1,
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
      bestRating: "5",
      worstRating: "1",
    },
  };
}

export function generateReviewSchema(product: Product, author = "TechAdvisor AI Editorial Staff") {
  return {
    "@context": "https://schema.org/",
    "@type": "Review",
    itemReviewed: {
      "@type": "Product",
      name: product.name,
    },
    author: {
      "@type": "Person",
      name: author,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: product.rating,
      bestRating: "5",
    },
    reviewBody: product.description,
    positiveNotes: {
      "@type": "ItemList",
      itemListElement: product.pros.map((p, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        name: p,
      })),
    },
    negativeNotes: {
      "@type": "ItemList",
      itemListElement: product.cons.map((c, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        name: c,
      })),
    },
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateItemListSchema(title: string, items: { name: string; url: string; position: number }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: title,
    itemListElement: items.map((it) => ({
      "@type": "ListItem",
      position: it.position,
      url: it.url,
      name: it.name,
    })),
  };
}
