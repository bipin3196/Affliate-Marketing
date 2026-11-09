import { notFound } from "next/navigation";
import { BUYING_GUIDES } from "@/data/buyingGuides";
import { BuyingGuideDetailView } from "@/components/guides/BuyingGuideDetailView";
import { Metadata } from "next";

interface GuidePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = BUYING_GUIDES.find((g) => g.slug === slug);
  if (!guide) return { title: "Guide Not Found | TechAdvisor AI" };

  return {
    title: `${guide.title} | TechAdvisor AI`,
    description: guide.summary,
    openGraph: {
      title: guide.title,
      description: guide.summary,
      images: [guide.heroImage],
    },
  };
}

export default async function BuyingGuideDetailPage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = BUYING_GUIDES.find((g) => g.slug === slug);

  if (!guide) {
    notFound();
  }

  return <BuyingGuideDetailView guide={guide} />;
}
