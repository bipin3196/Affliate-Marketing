import { AIAdvisorView } from "@/components/advisor/AIAdvisorView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Buying Advisor & Laptop Recommendation Engine | TechAdvisor AI",
  description:
    "Ask our AI buying advisor for custom PC build recommendations, student or creator laptops, and storage solutions tailored to your exact budget.",
};

export default function AIAdvisorPage() {
  return <AIAdvisorView />;
}
