import { ProductComparisonView } from "@/components/comparison/ProductComparisonView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compare Tech Products Side-by-Side | TechAdvisor AI",
  description:
    "Compare up to 4 products simultaneously with side-by-side hardware specifications, benchmarks, winner badges, and live store pricing.",
};

export default function ComparePage() {
  return <ProductComparisonView />;
}
