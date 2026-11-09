import { UserDashboardView } from "@/components/user/UserDashboardView";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Dashboard, Saved Builds & Price Watchlists | TechAdvisor AI",
  description: "View and manage your saved PC configurations, price drop tracking alerts, and bookmarked hardware.",
};

export default function DashboardPage() {
  return <UserDashboardView />;
}
