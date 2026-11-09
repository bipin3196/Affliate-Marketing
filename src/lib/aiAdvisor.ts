import { PRODUCTS } from "@/data/products";
import { Product, Currency } from "@/types";

export interface AIRecommendationResult {
  query: string;
  detectedIntent: 'pc_build' | 'laptop' | 'component' | 'storage' | 'display' | 'general';
  detectedBudget?: number;
  currency: Currency;
  summaryAdvice: string;
  topPick: Product;
  budgetAlternative?: Product;
  premiumAlternative?: Product;
  keySpecsHighlighted: string[];
  upgradePath: string[];
  purchaseStrategy: string;
}

export function generateAIAdvice(userPrompt: string, activeCurrency: Currency = 'INR'): AIRecommendationResult {
  const prompt = userPrompt.toLowerCase();

  // Extract budget if mentioned (e.g. 75000, 80,000, 150k, 1000, 2000)
  let extractedBudget: number | undefined;
  const numMatch = prompt.replace(/,/g, '').match(/(\d+)(k)?/i);
  if (numMatch) {
    let val = parseInt(numMatch[1], 10);
    if (numMatch[2]?.toLowerCase() === 'k') val *= 1000;
    if (val > 100) extractedBudget = val;
  }

  // Detect Intent
  const isLaptop = prompt.includes('laptop') || prompt.includes('notebook') || prompt.includes('macbook');
  const isPCBuild = prompt.includes('pc') || prompt.includes('build') || prompt.includes('desktop') || prompt.includes('gaming rig');
  const isStorage = prompt.includes('nas') || prompt.includes('storage') || prompt.includes('backup') || prompt.includes('ssd');
  const isDisplay = prompt.includes('monitor') || prompt.includes('screen') || prompt.includes('display');

  // Case 1: Laptop Advisor (e.g., "I need a laptop for Adobe Photoshop and Microsoft 365" or "gaming laptop")
  if (isLaptop) {
    const topPick = PRODUCTS.find((p) => p.id === 'apple-macbook-pro-14-m4-pro') || PRODUCTS[0];
    const budgetPick = PRODUCTS.find((p) => p.id === 'lenovo-legion-pro-5-gen9');
    const premiumPick = PRODUCTS.find((p) => p.id === 'asus-rog-zephyrus-g16-oled');

    return {
      query: userPrompt,
      detectedIntent: 'laptop',
      detectedBudget: extractedBudget,
      currency: activeCurrency,
      summaryAdvice:
        "For creative suites like Adobe Photoshop, Illustrator, and Microsoft 365, color accuracy (100% DCI-P3), high single-core CPU throughput, and at least 16GB-24GB of RAM are essential. For heavy video editing or 3D rendering alongside Office, dedicated NVIDIA GPUs or Apple M-series Pro silicon offer hardware acceleration.",
      topPick,
      budgetAlternative: budgetPick,
      premiumAlternative: premiumPick,
      keySpecsHighlighted: [
        "Minimum 16GB-24GB RAM for handling multi-layer PSD files",
        "Color-calibrated OLED or Mini-LED display with 500+ nits brightness",
        "PCIe Gen4 SSD storage with fast scratch disk capabilities",
        "Minimum 8+ hours real-world battery endurance"
      ],
      upgradePath: [
        "Year 1-2: Expand external Thunderbolt NVMe storage for archive libraries",
        "Year 2-3: Pair with a 27-inch 4K color-accurate monitor and CalDigit TS4 dock",
        "Year 4+: Upgrade to next-generation unified architecture"
      ],
      purchaseStrategy:
        "Check seasonal retail sales on Amazon and authorized brand stores; look for bundled Microsoft 365 licenses and student or business tax invoice GST input credits to save an additional 18%."
    };
  }

  // Case 2: Storage / NAS Advisor (e.g. "Best NAS device" or "Home backup")
  if (isStorage) {
    const topPick = PRODUCTS.find((p) => p.id === 'synology-diskstation-ds923plus') || PRODUCTS[0];
    const ssdPick = PRODUCTS.find((p) => p.id === 'samsung-990-pro-2tb');

    return {
      query: userPrompt,
      detectedIntent: 'storage',
      detectedBudget: extractedBudget,
      currency: activeCurrency,
      summaryAdvice:
        "Consolidating personal and business data requires automated RAID redundancy. A 4-bay NAS running Synology DSM lets you set up SHR (Synology Hybrid RAID) so single drive hardware failures will never destroy precious photos or financial records.",
      topPick,
      budgetAlternative: ssdPick,
      keySpecsHighlighted: [
        "4-Bay hot-swappable drive architecture with SHR/RAID-5 redundancy",
        "Dual M.2 NVMe read/write caching slots",
        "Automated backup agents for Windows, Mac, iOS, and Android",
        "Expandable memory with ECC DDR4 error-checking"
      ],
      upgradePath: [
        "Start with 2x 8TB Seagate IronWolf or WD Red Plus drives in SHR",
        "Add dual 1TB NVMe SSDs for instant thumbnail generation and database speed",
        "Install the 10GbE network card when your home switch upgrades"
      ],
      purchaseStrategy:
        "Buy the bare NAS enclosure first, then source high-capacity enterprise drives during Prime Day or festive sale discounts to minimize per-terabyte cost."
    };
  }

  // Case 3: PC Build Advisor (e.g., "I have ₹80,000 and want a gaming PC" or "Best Gaming PC Under ₹75,000")
  const topPick = PRODUCTS.find((p) => p.id === 'amd-ryzen-7-7800x3d') || PRODUCTS[0];
  const budgetPick = PRODUCTS.find((p) => p.id === 'amd-ryzen-5-7600');
  const premiumPick = PRODUCTS.find((p) => p.id === 'nvidia-geforce-rtx-4070-super');

  return {
    query: userPrompt,
    detectedIntent: 'pc_build',
    detectedBudget: extractedBudget || (activeCurrency === 'INR' ? 80000 : 1500),
    currency: activeCurrency,
    summaryAdvice:
      "For modern gaming at 1080p Ultra and 1440p, prioritizing an AMD AM5 processor paired with 32GB DDR5-6000 CL30 memory guarantees maximum frame stability and eliminates micro-stutters. Avoid obsolete dead-end platforms so you can easily upgrade your GPU or CPU without changing motherboards later.",
    topPick: budgetPick || topPick,
    budgetAlternative: budgetPick,
    premiumAlternative: premiumPick,
    keySpecsHighlighted: [
      "AMD AM5 socket platform with BIOS support guaranteed through 2027+",
      "32GB (2x16GB) dual-channel DDR5-6000 CL30 low-latency RAM",
      "Tier-A 80+ Gold power supply (750W-850W) for GPU safety",
      "PCIe Gen4 NVMe SSD with 7000+ MB/s read speeds for instant game loads"
    ],
    upgradePath: [
      "Phase 1 (Immediate): Deploy the AM5 platform with 32GB DDR5 and Gen4 SSD",
      "Phase 2 (Year 2): Drop in an RTX 50-series or next-gen GPU using the existing 850W PSU",
      "Phase 3 (Year 3-4): Swap CPU to a 3D V-Cache flagship without changing motherboard"
    ],
    purchaseStrategy:
      "Compare prices across MDComputers, PrimeABGB, Vedant, and Amazon India. Combining bank credit card instant discount offers (HDFC/ICICI/SBI) during sales will reliably knock 10% off the total build tally."
  };
}
