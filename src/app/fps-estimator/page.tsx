import { FPSEstimatorView } from "@/components/fps/FPSEstimatorView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gaming FPS Estimator & Hardware Bottleneck Test | TechAdvisor AI",
  description:
    "Accurately estimate gaming frame rates and 1% lows for Cyberpunk 2077, GTA VI, CS2, Valorant, and Fortnite across 1080p, 1440p, and 4K resolutions.",
};

export default function FPSEstimatorPage() {
  return <FPSEstimatorView />;
}
