import { BuyingGuidesIndexView } from "@/components/guides/BuyingGuidesIndexView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hardware Buying Guides & Expert Tech Reviews | TechAdvisor AI",
  description:
    "Curated buying guides, testing benchmarks, and tested recommendations for gaming PCs, laptops, docking stations, and storage.",
};

export default function BuyingGuidesPage() {
  return <BuyingGuidesIndexView />;
}
