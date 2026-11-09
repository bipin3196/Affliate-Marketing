import { DealsHubView } from "@/components/deals/DealsHubView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tech Deals, Price Drops & Festive Sales | TechAdvisor AI",
  description:
    "Track verified price drops and sales across Amazon, MDComputers, PrimeABGB, Scorptec, and JB Hi-Fi with live email price alerts.",
};

export default function DealsPage() {
  return <DealsHubView />;
}
