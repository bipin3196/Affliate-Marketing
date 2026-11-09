import { PCBuilderView } from "@/components/pc-builder/PCBuilderView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gaming PC Builder & Compatibility Checker | TechAdvisor AI",
  description:
    "Build your custom gaming PC with real-time socket compatibility checks, DDR4/DDR5 validation, estimated system power draw, and price tracking across India and Australia.",
};

export default function PCBuilderPage() {
  return <PCBuilderView />;
}
