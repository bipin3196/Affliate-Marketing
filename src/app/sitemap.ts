import { MetadataRoute } from "next";
import { PRODUCTS } from "@/data/products";
import { BUYING_GUIDES } from "@/data/buyingGuides";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://techadvisor.ai";

  // Static core routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/pc-builder`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/compare`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/fps-estimator`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/ai-advisor`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/deals`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/buying-guides`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  // Dynamic Product routes (/product/[slug])
  const productRoutes: MetadataRoute.Sitemap = PRODUCTS.map((product) => ({
    url: `${baseUrl}/product/${product.slug}`,
    lastModified: new Date(product.releaseDate || new Date()),
    changeFrequency: "daily",
    priority: 0.8,
  }));

  // Dynamic Buying Guides routes (/buying-guides/[slug])
  const guideRoutes: MetadataRoute.Sitemap = BUYING_GUIDES.map((guide) => ({
    url: `${baseUrl}/buying-guides/${guide.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  // Programmatic SEO Clusters (/best/[slug])
  const clusterSlugs = [
    "best-gaming-pc-under-50000",
    "best-gaming-pc-under-75000",
    "best-gaming-pc-under-100000",
    "best-gaming-laptops",
    "best-docking-station",
    "best-nas-device",
  ];
  const clusterRoutes: MetadataRoute.Sitemap = clusterSlugs.map((slug) => ({
    url: `${baseUrl}/best/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Category routes (/category/[slug])
  const categories = [
    "computers",
    "components",
    "displays",
    "networking",
    "storage",
    "peripherals",
    "software",
    "cpus",
    "gpus",
    "motherboards",
    "laptops",
  ];
  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/category/${cat}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.75,
  }));

  return [
    ...staticRoutes,
    ...productRoutes,
    ...guideRoutes,
    ...clusterRoutes,
    ...categoryRoutes,
  ];
}

