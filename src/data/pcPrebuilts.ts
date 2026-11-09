import { PCBuild } from "@/types";
import { PRODUCTS } from "./products";

const getPart = (id: string) => PRODUCTS.find((p) => p.id === id);

export const PC_BUILDS: PCBuild[] = [
  {
    id: "build-budget-75k",
    title: "₹75,000 Value Gaming & Esports Powerhouse",
    slug: "75000-gaming-pc-build",
    purpose: "Gaming",
    targetBudgetINR: 75000,
    targetBudgetAUD: 1350,
    targetBudgetUSD: 900,
    description: "The absolute sweet-spot budget gaming rig. Features AMD Ryzen 5 7600 AM5 platform paired with fast DDR5 RAM and snappy Gen4 NVMe storage, easily upgradeable for years to come.",
    parts: {
      cpu: getPart("amd-ryzen-5-7600"),
      motherboard: getPart("gigabyte-b650m-gaming-wifi"),
      gpu: getPart("amd-radeon-rx-7800-xt"),
      ram: getPart("corsair-vengeance-rgb-32gb-ddr5-6000"),
      storage: getPart("samsung-990-pro-2tb"),
      psu: getPart("corsair-rm850x-850w-gold"),
      case: getPart("lian-li-o11-dynamic-evo"),
      cooler: getPart("deepcool-ak620-digital")
    },
    benchmarks: {
      cyberpunk1080p: 88,
      cs21080p: 340,
      valorant1080p: 450
    }
  },
  {
    id: "build-budget-150k",
    title: "₹150,000 Enthusiast 1440p High-FPS Rig",
    slug: "150000-enthusiast-gaming-pc",
    purpose: "Gaming",
    targetBudgetINR: 150000,
    targetBudgetAUD: 2600,
    targetBudgetUSD: 1750,
    description: "Equipped with the world-beating Ryzen 7 7800X3D and RTX 4070 Super, this machine shreds 1440p Ultra games with DLSS 3.5 Frame Generation and esports titles at 400+ FPS.",
    parts: {
      cpu: getPart("amd-ryzen-7-7800x3d"),
      motherboard: getPart("msi-mag-b650-tomahawk-wifi"),
      gpu: getPart("nvidia-geforce-rtx-4070-super"),
      ram: getPart("corsair-vengeance-rgb-32gb-ddr5-6000"),
      storage: getPart("samsung-990-pro-2tb"),
      psu: getPart("corsair-rm850x-850w-gold"),
      case: getPart("lian-li-o11-dynamic-evo"),
      cooler: getPart("deepcool-ak620-digital")
    },
    benchmarks: {
      cyberpunk1080p: 135,
      cs21080p: 520,
      valorant1080p: 600
    }
  },
  {
    id: "build-budget-250k",
    title: "₹250,000 Ultimate 4K Path-Tracing & Creator Titan",
    slug: "250000-ultimate-4k-gaming-pc",
    purpose: "AI Development",
    targetBudgetINR: 250000,
    targetBudgetAUD: 4300,
    targetBudgetUSD: 2900,
    description: "Designed for hardcore 4K gaming, local LLM inference, 3D rendering, and streaming. Features RTX 4080 Super 16GB, AMD 3D V-Cache, and premier cooling in an iconic dual-chamber chassis.",
    parts: {
      cpu: getPart("amd-ryzen-7-7800x3d"),
      motherboard: getPart("msi-mag-b650-tomahawk-wifi"),
      gpu: getPart("nvidia-geforce-rtx-4080-super"),
      ram: getPart("corsair-vengeance-rgb-32gb-ddr5-6000"),
      storage: getPart("samsung-990-pro-2tb"),
      psu: getPart("corsair-rm850x-850w-gold"),
      case: getPart("lian-li-o11-dynamic-evo"),
      cooler: getPart("deepcool-ak620-digital")
    },
    benchmarks: {
      cyberpunk1080p: 168,
      cs21080p: 620,
      valorant1080p: 700
    }
  },
  {
    id: "build-purpose-editing",
    title: "Video Editing & 3D Rendering Workstation",
    slug: "video-editing-render-workstation",
    purpose: "Video Editing",
    targetBudgetINR: 195000,
    targetBudgetAUD: 3400,
    targetBudgetUSD: 2300,
    description: "Tuned specifically for Adobe Premiere Pro, After Effects, DaVinci Resolve Studio, and Blender. Intel 20-Core QuickSync acceleration combined with 16GB VRAM for 8K timeline scrubbing.",
    parts: {
      cpu: getPart("intel-core-i7-14700k"),
      motherboard: getPart("msi-mag-b650-tomahawk-wifi"),
      gpu: getPart("nvidia-geforce-rtx-4080-super"),
      ram: getPart("corsair-vengeance-rgb-32gb-ddr5-6000"),
      storage: getPart("samsung-990-pro-2tb"),
      psu: getPart("corsair-rm850x-850w-gold"),
      case: getPart("lian-li-o11-dynamic-evo"),
      cooler: getPart("deepcool-ak620-digital")
    },
    benchmarks: {
      cyberpunk1080p: 140,
      cs21080p: 480,
      valorant1080p: 550
    }
  }
];
