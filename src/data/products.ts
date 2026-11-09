import { Product } from "@/types";

export const PRODUCTS: Product[] = [
  // ==========================================
  // CPUS
  // ==========================================
  {
    id: "amd-ryzen-7-7800x3d",
    name: "AMD Ryzen 7 7800X3D Desktop Processor",
    slug: "amd-ryzen-7-7800x3d",
    brand: "AMD",
    description: "The undisputed champion of gaming CPUs. Equipped with AMD 3D V-Cache technology delivering unmatched gaming frame rates, incredible power efficiency, and class-leading 1% low frame consistency.",
    category: "components",
    subcategory: "cpus",
    pcPartType: "cpu",
    basePriceINR: 37999,
    basePriceAUD: 649,
    basePriceUSD: 449,
    rating: 4.9,
    reviewCount: 3840,
    affiliateUrl: "https://www.amazon.in/dp/B0BTZB7F88",
    pros: [
      "Fastest dedicated gaming CPU on the market",
      "Remarkable power efficiency (draws only ~65W in games)",
      "Uses modern AM5 socket with guaranteed platform support through 2027+",
      "Huge 96MB 3D V-Cache eradicates micro-stuttering"
    ],
    cons: [
      "Moderate productivity performance compared to high-core i7/i9",
      "No bundled CPU cooler",
      "Strict DDR5 memory requirement only"
    ],
    releaseDate: "2023-04-06",
    featured: true,
    badges: ["Editor Choice", "Top Performance"],
    specifications: {
      "Cores": 8,
      "Threads": 16,
      "Base Clock": "4.2 GHz",
      "Boost Clock": "5.0 GHz",
      "L3 Cache": "96 MB (3D V-Cache)",
      "Socket": "AM5",
      "TDP": "120W",
      "Memory Support": "DDR5-5200 (Up to DDR5-6000 EXPO)",
      "PCIe Version": "PCIe 5.0",
      "Integrated Graphics": "AMD Radeon Graphics (2 CUs)"
    },
    componentSpecs: {
      socket: "AM5",
      tdp: 120,
      coreCount: 8,
      threadCount: 16,
      baseClock: "4.2 GHz",
      boostClock: "5.0 GHz",
      integratedGraphics: true
    },
    images: [
      "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&auto=format&fit=crop&q=80"
    ],
    faqs: [
      {
        question: "Does the Ryzen 7 7800X3D need an expensive AIO liquid cooler?",
        answer: "No! Despite its 120W rating, real-world gaming power consumption is only 55W to 75W. A standard dual-tower air cooler like the Thermalright Peerless Assassin or DeepCool AK620 is more than enough."
      },
      {
        question: "Can I use DDR4 RAM with Ryzen 7 7800X3D?",
        answer: "No, the AMD AM5 socket exclusively supports DDR5 memory. The recommended sweet spot is DDR5-6000 CL30."
      }
    ],
    retailers: [
      {
        store: "Amazon India",
        storeSlug: "amazon-in",
        region: "IN",
        priceINR: 37999,
        priceAUD: 649,
        priceUSD: 449,
        inStock: true,
        affiliateUrl: "https://amazon.in/dp/B0BTZB7F88",
        shippingInfo: "Free One-Day Prime Delivery"
      },
      {
        store: "MDComputers",
        storeSlug: "mdcomputers",
        region: "IN",
        priceINR: 37490,
        priceAUD: 640,
        priceUSD: 440,
        inStock: true,
        affiliateUrl: "https://mdcomputers.in",
        shippingInfo: "Ships within 24 Hours"
      },
      {
        store: "PrimeABGB",
        storeSlug: "primeabgb",
        region: "IN",
        priceINR: 37200,
        priceAUD: 638,
        priceUSD: 438,
        inStock: true,
        affiliateUrl: "https://primeabgb.com",
        shippingInfo: "Mumbai Warehouse Pickup & Express Delivery"
      },
      {
        store: "Vedant Computers",
        storeSlug: "vedant",
        region: "IN",
        priceINR: 37600,
        priceAUD: 642,
        priceUSD: 442,
        inStock: true,
        affiliateUrl: "https://vedantcomputers.com"
      },
      {
        store: "Scorptec Australia",
        storeSlug: "scorptec",
        region: "AU",
        priceINR: 39500,
        priceAUD: 629,
        priceUSD: 435,
        inStock: true,
        affiliateUrl: "https://scorptec.com.au"
      },
      {
        store: "Centre Com",
        storeSlug: "centrecom",
        region: "AU",
        priceINR: 39100,
        priceAUD: 619,
        priceUSD: 429,
        inStock: true,
        affiliateUrl: "https://centrecom.com.au"
      },
      {
        store: "Mwave Australia",
        storeSlug: "mwave",
        region: "AU",
        priceINR: 39800,
        priceAUD: 635,
        priceUSD: 439,
        inStock: true,
        affiliateUrl: "https://mwave.com.au"
      }
    ],
    priceHistory: [
      { date: "2026-05-01", priceINR: 42000, priceAUD: 699, priceUSD: 489 },
      { date: "2026-07-15", priceINR: 39999, priceAUD: 669, priceUSD: 469 },
      { date: "2026-09-01", priceINR: 38500, priceAUD: 659, priceUSD: 455 },
      { date: "2026-11-01", priceINR: 37200, priceAUD: 619, priceUSD: 438 }
    ],
    reviewScores: {
      buildQuality: 9.8,
      performance: 10.0,
      value: 9.6,
      features: 9.4,
      overall: 9.7
    }
  },
  {
    id: "amd-ryzen-5-7600",
    name: "AMD Ryzen 5 7600 6-Core Processor",
    slug: "amd-ryzen-5-7600",
    brand: "AMD",
    description: "The undisputed value king of AM5. Delivers phenomenal 1080p and 1440p gaming performance, includes a Wraith Stealth cooler, and draws just 65W, making it the premier choice for budget to mid-range gaming builds.",
    category: "components",
    subcategory: "cpus",
    pcPartType: "cpu",
    basePriceINR: 17499,
    basePriceAUD: 319,
    basePriceUSD: 199,
    rating: 4.8,
    reviewCount: 2150,
    affiliateUrl: "https://amazon.in",
    pros: [
      "Exceptional price-to-performance ratio",
      "Included stock cooler is sufficient for daily use",
      "Very low 65W thermal power draw",
      "AM5 upgradability down the road"
    ],
    cons: [
      "Only 6 cores for heavily multi-threaded render workflows",
      "Requires DDR5 RAM"
    ],
    releaseDate: "2023-01-14",
    featured: true,
    badges: ["Best Value"],
    specifications: {
      "Cores": 6,
      "Threads": 12,
      "Base Clock": "3.8 GHz",
      "Boost Clock": "5.1 GHz",
      "L3 Cache": "32 MB",
      "Socket": "AM5",
      "TDP": "65W",
      "Bundled Cooler": "AMD Wraith Stealth"
    },
    componentSpecs: {
      socket: "AM5",
      tdp: 65,
      coreCount: 6,
      threadCount: 12,
      baseClock: "3.8 GHz",
      boostClock: "5.1 GHz",
      integratedGraphics: true
    },
    images: [
      "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&auto=format&fit=crop&q=80"
    ],
    faqs: [
      {
        question: "Does the Ryzen 5 7600 bottleneck an RTX 4070 Super?",
        answer: "No, the Ryzen 5 7600 provides ample IPC to push the RTX 4070 Super to 100% GPU utilization in 1440p and 4K gaming."
      }
    ],
    retailers: [
      {
        store: "Amazon India",
        storeSlug: "amazon-in",
        region: "IN",
        priceINR: 17499,
        priceAUD: 319,
        priceUSD: 199,
        inStock: true,
        affiliateUrl: "https://amazon.in"
      },
      {
        store: "MDComputers",
        storeSlug: "mdcomputers",
        region: "IN",
        priceINR: 16999,
        priceAUD: 310,
        priceUSD: 195,
        inStock: true,
        affiliateUrl: "https://mdcomputers.in"
      },
      {
        store: "Scorptec Australia",
        storeSlug: "scorptec",
        region: "AU",
        priceINR: 18200,
        priceAUD: 309,
        priceUSD: 205,
        inStock: true,
        affiliateUrl: "https://scorptec.com.au"
      }
    ],
    priceHistory: [
      { date: "2026-05-01", priceINR: 19500, priceAUD: 349, priceUSD: 229 },
      { date: "2026-09-01", priceINR: 17999, priceAUD: 329, priceUSD: 209 },
      { date: "2026-11-01", priceINR: 16999, priceAUD: 309, priceUSD: 195 }
    ]
  },
  {
    id: "intel-core-i7-14700k",
    name: "Intel Core i7-14700K 20-Core Processor",
    slug: "intel-core-i7-14700k",
    brand: "Intel",
    description: "A hybrid computing beast combining 8 Performance-cores and 12 Efficient-cores (28 threads) with up to 5.6 GHz clock speeds. Ideal for creators, video editors, and gamers who demand maximum multi-threaded horsepower.",
    category: "components",
    subcategory: "cpus",
    pcPartType: "cpu",
    basePriceINR: 38499,
    basePriceAUD: 629,
    basePriceUSD: 409,
    rating: 4.7,
    reviewCount: 1620,
    affiliateUrl: "https://amazon.in",
    pros: [
      "Phenomenal multi-threaded render and encoding speed",
      "Supports both DDR4 and DDR5 motherboards",
      "Intel QuickSync for lightning fast video exports",
      "Very strong 1440p and 4K gaming throughput"
    ],
    cons: [
      "High power draw under full synthetic load (~250W)",
      "Requires high-end 360mm AIO cooler",
      "LGA1700 is an end-of-life socket"
    ],
    releaseDate: "2023-10-17",
    specifications: {
      "Cores": 20,
      "Threads": 28,
      "Base Clock": "3.4 GHz",
      "Boost Clock": "5.6 GHz",
      "L3 Cache": "33 MB",
      "Socket": "LGA1700",
      "TDP": "125W (Max Turbo 253W)",
      "Integrated Graphics": "Intel UHD Graphics 770"
    },
    componentSpecs: {
      socket: "LGA1700",
      tdp: 253,
      coreCount: 20,
      threadCount: 28,
      baseClock: "3.4 GHz",
      boostClock: "5.6 GHz",
      integratedGraphics: true
    },
    images: [
      "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&auto=format&fit=crop&q=80"
    ],
    faqs: [],
    retailers: [
      {
        store: "Amazon India",
        storeSlug: "amazon-in",
        region: "IN",
        priceINR: 38499,
        priceAUD: 629,
        priceUSD: 409,
        inStock: true,
        affiliateUrl: "https://amazon.in"
      },
      {
        store: "Vedant Computers",
        storeSlug: "vedant",
        region: "IN",
        priceINR: 37900,
        priceAUD: 620,
        priceUSD: 400,
        inStock: true,
        affiliateUrl: "https://vedantcomputers.com"
      }
    ],
    priceHistory: [
      { date: "2026-05-01", priceINR: 41500, priceAUD: 689, priceUSD: 449 },
      { date: "2026-11-01", priceINR: 37900, priceAUD: 620, priceUSD: 400 }
    ]
  },

  // ==========================================
  // GPUS
  // ==========================================
  {
    id: "nvidia-geforce-rtx-4070-super",
    name: "NVIDIA GeForce RTX 4070 Super 12GB GDDR6X",
    slug: "nvidia-geforce-rtx-4070-super",
    brand: "NVIDIA",
    description: "The golden standard for 1440p max-settings gaming. Featuring 7168 CUDA cores, DLSS 3.5 Frame Generation, dual AV1 encoders, and class-leading power efficiency at only 220W.",
    category: "components",
    subcategory: "gpus",
    pcPartType: "gpu",
    basePriceINR: 58999,
    basePriceAUD: 989,
    basePriceUSD: 599,
    rating: 4.9,
    reviewCount: 3120,
    affiliateUrl: "https://amazon.in",
    pros: [
      "Outstanding 1440p high-refresh & entry 4K performance",
      "DLSS 3.5 Frame Generation & Ray Reconstruction",
      "Extremely power efficient (220W TDP)",
      "Strong AI acceleration and CUDA creator support"
    ],
    cons: [
      "12GB VRAM is adequate for 1440p but less futureproof for heavily modded 4K",
      "Requires 12VHPWR 16-pin connector or dual 8-pin adapter"
    ],
    releaseDate: "2024-01-17",
    featured: true,
    badges: ["Editor Choice", "Best Value"],
    specifications: {
      "CUDA Cores": 7168,
      "VRAM": "12GB GDDR6X",
      "Memory Bus": "192-bit",
      "Boost Clock": "2475 MHz",
      "Length": "242 mm",
      "TDP": "220W",
      "Recommended PSU": "650W",
      "Outputs": "3x DisplayPort 1.4a, 1x HDMI 2.1a"
    },
    componentSpecs: {
      vramGB: 12,
      gpuLengthMM: 242,
      recommendedPsuWattage: 650,
      tdp: 220,
      powerConnectors: "1x 16-pin (12VHPWR)"
    },
    images: [
      "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&auto=format&fit=crop&q=80"
    ],
    faqs: [
      {
        question: "Can the RTX 4070 Super handle 4K gaming?",
        answer: "Yes! At 4K Ultra, modern titles run at 60-90 FPS natively, and easily 100+ FPS when utilizing DLSS Quality and Frame Generation."
      }
    ],
    retailers: [
      {
        store: "Amazon India",
        storeSlug: "amazon-in",
        region: "IN",
        priceINR: 58999,
        priceAUD: 989,
        priceUSD: 599,
        inStock: true,
        affiliateUrl: "https://amazon.in"
      },
      {
        store: "MDComputers",
        storeSlug: "mdcomputers",
        region: "IN",
        priceINR: 57800,
        priceAUD: 975,
        priceUSD: 589,
        inStock: true,
        affiliateUrl: "https://mdcomputers.in"
      },
      {
        store: "PrimeABGB",
        storeSlug: "primeabgb",
        region: "IN",
        priceINR: 57500,
        priceAUD: 969,
        priceUSD: 585,
        inStock: true,
        affiliateUrl: "https://primeabgb.com"
      },
      {
        store: "Scorptec Australia",
        storeSlug: "scorptec",
        region: "AU",
        priceINR: 59800,
        priceAUD: 979,
        priceUSD: 605,
        inStock: true,
        affiliateUrl: "https://scorptec.com.au"
      },
      {
        store: "Centre Com",
        storeSlug: "centrecom",
        region: "AU",
        priceINR: 59200,
        priceAUD: 969,
        priceUSD: 599,
        inStock: true,
        affiliateUrl: "https://centrecom.com.au"
      }
    ],
    priceHistory: [
      { date: "2026-05-01", priceINR: 64999, priceAUD: 1049, priceUSD: 649 },
      { date: "2026-08-15", priceINR: 61500, priceAUD: 1019, priceUSD: 619 },
      { date: "2026-11-01", priceINR: 57500, priceAUD: 969, priceUSD: 585 }
    ],
    reviewScores: {
      buildQuality: 9.6,
      performance: 9.7,
      value: 9.5,
      features: 9.9,
      overall: 9.7
    }
  },
  {
    id: "nvidia-geforce-rtx-4080-super",
    name: "NVIDIA GeForce RTX 4080 Super 16GB GDDR6X",
    slug: "nvidia-geforce-rtx-4080-super",
    brand: "NVIDIA",
    description: "The definitive 4K high-frame-rate powerhouse. Packed with 10,240 CUDA cores and 16GB of blisteringly fast GDDR6X VRAM, rendering path-traced visual masterpieces effortlessly.",
    category: "components",
    subcategory: "gpus",
    pcPartType: "gpu",
    basePriceINR: 102999,
    basePriceAUD: 1699,
    basePriceUSD: 999,
    rating: 4.9,
    reviewCount: 1450,
    affiliateUrl: "https://amazon.in",
    pros: [
      "Flawless 4K native and ray-traced gaming performance",
      "16GB VRAM provides futureproofing for generative AI models",
      "Superior cooling acoustics and low temperatures",
      "Complete DLSS 3.5 feature suite"
    ],
    cons: [
      "Premium price tier",
      "Large physical dimensions (304mm+) requires spacious case"
    ],
    releaseDate: "2024-01-31",
    featured: true,
    badges: ["Top Performance"],
    specifications: {
      "CUDA Cores": 10240,
      "VRAM": "16GB GDDR6X",
      "Memory Bus": "256-bit",
      "Boost Clock": "2550 MHz",
      "Length": "304 mm",
      "TDP": "320W",
      "Recommended PSU": "750W",
      "Outputs": "3x DP 1.4a, 1x HDMI 2.1a"
    },
    componentSpecs: {
      vramGB: 16,
      gpuLengthMM: 304,
      recommendedPsuWattage: 750,
      tdp: 320,
      powerConnectors: "1x 16-pin (12VHPWR)"
    },
    images: [
      "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&auto=format&fit=crop&q=80"
    ],
    faqs: [],
    retailers: [
      {
        store: "Amazon India",
        storeSlug: "amazon-in",
        region: "IN",
        priceINR: 102999,
        priceAUD: 1699,
        priceUSD: 999,
        inStock: true,
        affiliateUrl: "https://amazon.in"
      },
      {
        store: "EliteHubs",
        storeSlug: "elitehubs",
        region: "IN",
        priceINR: 101500,
        priceAUD: 1675,
        priceUSD: 985,
        inStock: true,
        affiliateUrl: "https://elitehubs.com"
      },
      {
        store: "Scorptec Australia",
        storeSlug: "scorptec",
        region: "AU",
        priceINR: 104500,
        priceAUD: 1689,
        priceUSD: 1010,
        inStock: true,
        affiliateUrl: "https://scorptec.com.au"
      }
    ],
    priceHistory: [
      { date: "2026-05-01", priceINR: 112000, priceAUD: 1849, priceUSD: 1099 },
      { date: "2026-11-01", priceINR: 101500, priceAUD: 1675, priceUSD: 985 }
    ]
  },
  {
    id: "amd-radeon-rx-7800-xt",
    name: "AMD Radeon RX 7800 XT 16GB GDDR6",
    slug: "amd-radeon-rx-7800-xt",
    brand: "AMD",
    description: "The undisputed VRAM champion in the mid-range tier. Boasting 16GB GDDR6 on a 256-bit bus, offering phenomenal raw rasterization speed that frequently outpaces rival cards in heavy modern games.",
    category: "components",
    subcategory: "gpus",
    pcPartType: "gpu",
    basePriceINR: 49999,
    basePriceAUD: 799,
    basePriceUSD: 499,
    rating: 4.8,
    reviewCount: 2210,
    affiliateUrl: "https://amazon.in",
    pros: [
      "Generous 16GB VRAM on wide 256-bit bus",
      "Superb raster gaming performance in 1440p",
      "DisplayPort 2.1 support",
      "Standard dual 8-pin PCIe power connectors (no 12VHPWR needed)"
    ],
    cons: [
      "Ray tracing performance lags behind RTX 4070",
      "FSR 3.1 adoption still trails DLSS in total title count"
    ],
    releaseDate: "2023-09-06",
    badges: ["Best Value"],
    specifications: {
      "Compute Units": 60,
      "Stream Processors": 3840,
      "VRAM": "16GB GDDR6",
      "Memory Bus": "256-bit",
      "Boost Clock": "2430 MHz",
      "Length": "267 mm",
      "TDP": "263W",
      "Recommended PSU": "700W"
    },
    componentSpecs: {
      vramGB: 16,
      gpuLengthMM: 267,
      recommendedPsuWattage: 700,
      tdp: 263,
      powerConnectors: "2x 8-pin PCIe"
    },
    images: [
      "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&auto=format&fit=crop&q=80"
    ],
    faqs: [],
    retailers: [
      {
        store: "Amazon India",
        storeSlug: "amazon-in",
        region: "IN",
        priceINR: 49999,
        priceAUD: 799,
        priceUSD: 499,
        inStock: true,
        affiliateUrl: "https://amazon.in"
      },
      {
        store: "PCStudio",
        storeSlug: "pcstudio",
        region: "IN",
        priceINR: 48900,
        priceAUD: 785,
        priceUSD: 489,
        inStock: true,
        affiliateUrl: "https://pcstudio.in"
      }
    ],
    priceHistory: [
      { date: "2026-05-01", priceINR: 53500, priceAUD: 849, priceUSD: 529 },
      { date: "2026-11-01", priceINR: 48900, priceAUD: 785, priceUSD: 489 }
    ]
  },

  // ==========================================
  // MOTHERBOARDS
  // ==========================================
  {
    id: "msi-mag-b650-tomahawk-wifi",
    name: "MSI MAG B650 TOMAHAWK WIFI Motherboard",
    slug: "msi-mag-b650-tomahawk-wifi",
    brand: "MSI",
    description: "The most trusted AM5 motherboard for builders. Features heavy-duty 14+2+1 Duet Rail power design, triple M.2 Gen4 SSD slots, Wi-Fi 6E, and robust thermal heatsinks for sustained overclocking.",
    category: "components",
    subcategory: "motherboards",
    pcPartType: "motherboard",
    basePriceINR: 20999,
    basePriceAUD: 349,
    basePriceUSD: 219,
    rating: 4.8,
    reviewCount: 1980,
    affiliateUrl: "https://amazon.in",
    pros: [
      "Rock-solid 80A Smart Power Stage VRM handles up to Ryzen 9 9950X",
      "Triple M.2 Gen4 slots with Shield Frozr heatsinks",
      "Built-in Wi-Fi 6E and Realtek 2.5G LAN",
      "Pre-installed I/O shield and BIOS Flashback button"
    ],
    cons: [
      "No PCIe 5.0 x16 slot (PCIe 4.0 only)",
      "Standard matte black look without flashy RGB"
    ],
    releaseDate: "2022-10-10",
    badges: ["Editor Choice"],
    specifications: {
      "Socket": "AM5",
      "Chipset": "AMD B650",
      "Form Factor": "ATX",
      "Memory Support": "4x DDR5 DIMM (Up to 7600+ MHz OC, 192GB Max)",
      "PCIe Slots": "1x PCIe 4.0 x16, 1x PCIe 4.0 x4, 1x PCIe 3.0 x1",
      "Storage": "3x M.2 PCIe 4.0, 6x SATA 6Gb/s",
      "Wireless": "Wi-Fi 6E + Bluetooth 5.3"
    },
    componentSpecs: {
      socket: "AM5",
      chipset: "B650",
      formFactor: "ATX",
      memoryType: "DDR5",
      memorySlots: 4,
      maxMemoryGB: 192,
      pcieVersion: "PCIe 4.0",
      m2Slots: 3,
      wifiSupport: true
    },
    images: [
      "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&auto=format&fit=crop&q=80"
    ],
    faqs: [],
    retailers: [
      {
        store: "Amazon India",
        storeSlug: "amazon-in",
        region: "IN",
        priceINR: 20999,
        priceAUD: 349,
        priceUSD: 219,
        inStock: true,
        affiliateUrl: "https://amazon.in"
      },
      {
        store: "MDComputers",
        storeSlug: "mdcomputers",
        region: "IN",
        priceINR: 20490,
        priceAUD: 340,
        priceUSD: 215,
        inStock: true,
        affiliateUrl: "https://mdcomputers.in"
      },
      {
        store: "Scorptec Australia",
        storeSlug: "scorptec",
        region: "AU",
        priceINR: 21800,
        priceAUD: 339,
        priceUSD: 225,
        inStock: true,
        affiliateUrl: "https://scorptec.com.au"
      }
    ],
    priceHistory: [
      { date: "2026-05-01", priceINR: 22500, priceAUD: 369, priceUSD: 239 },
      { date: "2026-11-01", priceINR: 20490, priceAUD: 339, priceUSD: 215 }
    ]
  },
  {
    id: "gigabyte-b650m-gaming-wifi",
    name: "Gigabyte B650M Gaming WIFI Micro-ATX Motherboard",
    slug: "gigabyte-b650m-gaming-wifi",
    brand: "Gigabyte",
    description: "Compact AM5 value motherboard for budget and mid-tier builds. Equipped with dual DDR5 slots, PCIe 4.0 M.2 slot, and onboard Wi-Fi 5 at an unbeatable price point.",
    category: "components",
    subcategory: "motherboards",
    pcPartType: "motherboard",
    basePriceINR: 10499,
    basePriceAUD: 179,
    basePriceUSD: 119,
    rating: 4.5,
    reviewCount: 890,
    affiliateUrl: "https://amazon.in",
    pros: [
      "Super affordable entry point to the AM5 ecosystem",
      "Micro-ATX compact form factor fits in budget mini towers",
      "Q-Flash Plus for CPU-less BIOS updates"
    ],
    cons: [
      "Only 2 DDR5 RAM slots",
      "Modest VRM design, not recommended for Ryzen 9"
    ],
    releaseDate: "2023-04-12",
    badges: ["Best Value"],
    specifications: {
      "Socket": "AM5",
      "Chipset": "AMD B650",
      "Form Factor": "Micro-ATX",
      "Memory Support": "2x DDR5 DIMM (Up to 96GB)",
      "Storage": "1x M.2 PCIe 4.0, 4x SATA"
    },
    componentSpecs: {
      socket: "AM5",
      chipset: "B650",
      formFactor: "Micro-ATX",
      memoryType: "DDR5",
      memorySlots: 2,
      maxMemoryGB: 96,
      pcieVersion: "PCIe 4.0",
      m2Slots: 1,
      wifiSupport: true
    },
    images: [
      "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&auto=format&fit=crop&q=80"
    ],
    faqs: [],
    retailers: [
      {
        store: "Amazon India",
        storeSlug: "amazon-in",
        region: "IN",
        priceINR: 10499,
        priceAUD: 179,
        priceUSD: 119,
        inStock: true,
        affiliateUrl: "https://amazon.in"
      }
    ],
    priceHistory: [
      { date: "2026-05-01", priceINR: 11999, priceAUD: 199, priceUSD: 139 },
      { date: "2026-11-01", priceINR: 10499, priceAUD: 179, priceUSD: 119 }
    ]
  },
  {
    id: "asus-rog-strix-z790-e",
    name: "ASUS ROG STRIX Z790-E Gaming WIFI Motherboard (LGA1700, DDR5, PCIe 5.0)",
    slug: "asus-rog-strix-z790-e",
    brand: "ASUS",
    description: "Premium enthusiast Intel motherboard engineered for 13th & 14th Gen Intel Core processors. Features 18+1 power stages, PCIe 5.0 M.2 slot, Wi-Fi 6E, and robust heatsinks.",
    category: "components",
    subcategory: "motherboards",
    pcPartType: "motherboard",
    basePriceINR: 44999,
    basePriceAUD: 689,
    basePriceUSD: 469,
    rating: 4.9,
    reviewCount: 1120,
    affiliateUrl: "https://amazon.in",
    pros: [
      "18+1 power stages for high-frequency Core i7/i9 overclocking",
      "PCIe 5.0 M.2 slot with thermal heatsink",
      "Wi-Fi 6E and Intel 2.5Gb Ethernet"
    ],
    cons: [
      "LGA1700 socket is not compatible with AMD Ryzen processors"
    ],
    releaseDate: "2023-10-15",
    badges: ["Top Performance"],
    specifications: {
      "Socket": "LGA1700",
      "Chipset": "Intel Z790",
      "Form Factor": "ATX",
      "Memory Support": "4x DDR5 DIMM (Up to 7800+ MHz, 192GB Max)",
      "PCIe Slots": "1x PCIe 5.0 x16, 2x PCIe 4.0 x16",
      "Storage": "5x M.2 slots (1x PCIe 5.0, 4x PCIe 4.0)"
    },
    componentSpecs: {
      socket: "LGA1700",
      chipset: "Z790",
      formFactor: "ATX",
      memoryType: "DDR5",
      memorySlots: 4,
      maxMemoryGB: 192,
      pcieVersion: "PCIe 5.0",
      m2Slots: 5,
      wifiSupport: true
    },
    images: [
      "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&auto=format&fit=crop&q=80"
    ],
    faqs: [],
    retailers: [
      {
        store: "Amazon India",
        storeSlug: "amazon-in",
        region: "IN",
        priceINR: 44999,
        priceAUD: 689,
        priceUSD: 469,
        inStock: true,
        affiliateUrl: "https://amazon.in"
      },
      {
        store: "Scorptec Australia",
        storeSlug: "scorptec",
        region: "AU",
        priceINR: 45800,
        priceAUD: 679,
        priceUSD: 465,
        inStock: true,
        affiliateUrl: "https://scorptec.com.au"
      }
    ],
    priceHistory: [
      { date: "2026-05-01", priceINR: 48999, priceAUD: 739, priceUSD: 499 },
      { date: "2026-11-01", priceINR: 44999, priceAUD: 679, priceUSD: 465 }
    ]
  },
  {
    id: "asrock-b550m-pro4",
    name: "ASRock B550M PRO4 Micro-ATX Motherboard (AM4, DDR4)",
    slug: "asrock-b550m-pro4",
    brand: "ASRock",
    description: "Budget champion for previous-generation AM4 systems. Supports Ryzen 3000/4000/5000 series with dual DDR4 slots, dual M.2 slots, and PCIe 4.0 support.",
    category: "components",
    subcategory: "motherboards",
    pcPartType: "motherboard",
    basePriceINR: 8999,
    basePriceAUD: 149,
    basePriceUSD: 89,
    rating: 4.6,
    reviewCount: 3100,
    affiliateUrl: "https://amazon.in",
    pros: [
      "Inexpensive platform for budget esports gaming builds",
      "Dual M.2 SSD slots",
      "Supports affordable DDR4 memory kits"
    ],
    cons: [
      "AM4 socket (cannot be upgraded to Ryzen 7000/9000)",
      "Requires DDR4 only (incompatible with DDR5)"
    ],
    releaseDate: "2020-07-01",
    badges: ["Best Value"],
    specifications: {
      "Socket": "AM4",
      "Chipset": "AMD B550",
      "Form Factor": "Micro-ATX",
      "Memory Support": "4x DDR4 DIMM (Up to 128GB)",
      "Storage": "2x M.2 slots, 6x SATA"
    },
    componentSpecs: {
      socket: "AM4",
      chipset: "B550",
      formFactor: "Micro-ATX",
      memoryType: "DDR4",
      memorySlots: 4,
      maxMemoryGB: 128,
      pcieVersion: "PCIe 4.0",
      m2Slots: 2,
      wifiSupport: false,
      biosUpdateNeededForRyzen5000: true
    },
    images: [
      "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&auto=format&fit=crop&q=80"
    ],
    faqs: [],
    retailers: [
      {
        store: "Amazon India",
        storeSlug: "amazon-in",
        region: "IN",
        priceINR: 8999,
        priceAUD: 149,
        priceUSD: 89,
        inStock: true,
        affiliateUrl: "https://amazon.in"
      }
    ],
    priceHistory: [
      { date: "2026-05-01", priceINR: 9499, priceAUD: 159, priceUSD: 99 },
      { date: "2026-11-01", priceINR: 8999, priceAUD: 149, priceUSD: 89 }
    ]
  },

  // ==========================================
  // RAM
  // ==========================================
  {
    id: "corsair-vengeance-rgb-32gb-ddr5-6000",
    name: "Corsair Vengeance RGB 32GB (2x16GB) DDR5-6000 CL30",
    slug: "corsair-vengeance-rgb-32gb-ddr5-6000",
    brand: "Corsair",
    description: "The ideal sweet-spot memory kit for Ryzen 7000/9000 and Intel 13th/14th Gen processors. Features optimized AMD EXPO & Intel XMP 3.0 profiles with ultra-low CL30 latency and ten-zone RGB illumination.",
    category: "components",
    subcategory: "ram",
    pcPartType: "ram",
    basePriceINR: 10999,
    basePriceAUD: 189,
    basePriceUSD: 119,
    rating: 4.9,
    reviewCount: 4200,
    affiliateUrl: "https://amazon.in",
    pros: [
      "Optimal 6000MHz speed and ultra-low CL30-36-36-76 timings",
      "Native AMD EXPO and Intel XMP profiles for one-click setup",
      "Stunning dynamic panoramic RGB lighting",
      "Solid aluminum heatspreader for superior thermal dissipation"
    ],
    cons: [
      "44mm module height requires checking clearance with twin-tower air coolers"
    ],
    releaseDate: "2023-03-10",
    featured: true,
    badges: ["Editor Choice"],
    specifications: {
      "Capacity": "32GB (2 x 16GB)",
      "Memory Type": "DDR5",
      "Speed": "6000 MHz",
      "CAS Latency": "CL30",
      "Voltage": "1.35V",
      "RGB Lighting": "Yes (iCUE Compatible)"
    },
    componentSpecs: {
      memoryType: "DDR5",
      speedMhz: 6000,
      capacityGB: 32,
      modules: "2x16GB",
      casLatency: "CL30"
    },
    images: [
      "https://images.unsplash.com/photo-1562976540-1502c2145186?w=800&auto=format&fit=crop&q=80"
    ],
    faqs: [],
    retailers: [
      {
        store: "Amazon India",
        storeSlug: "amazon-in",
        region: "IN",
        priceINR: 10999,
        priceAUD: 189,
        priceUSD: 119,
        inStock: true,
        affiliateUrl: "https://amazon.in"
      },
      {
        store: "PrimeABGB",
        storeSlug: "primeabgb",
        region: "IN",
        priceINR: 10450,
        priceAUD: 180,
        priceUSD: 115,
        inStock: true,
        affiliateUrl: "https://primeabgb.com"
      }
    ],
    priceHistory: [
      { date: "2026-05-01", priceINR: 12500, priceAUD: 219, priceUSD: 139 },
      { date: "2026-11-01", priceINR: 10450, priceAUD: 180, priceUSD: 115 }
    ]
  },
  {
    id: "kingston-fury-beast-16gb-ddr4-3200",
    name: "Kingston FURY Beast 16GB (2x8GB) DDR4-3200 CL16",
    slug: "kingston-fury-beast-16gb-ddr4-3200",
    brand: "Kingston",
    description: "Reliable, high-performance DDR4 memory upgrade for Intel LGA1200/older LGA1700 DDR4 and AMD AM4 motherboards. Low-profile heat spreader with Intel XMP 2.0 support.",
    category: "components",
    subcategory: "ram",
    pcPartType: "ram",
    basePriceINR: 3899,
    basePriceAUD: 65,
    basePriceUSD: 45,
    rating: 4.8,
    reviewCount: 8900,
    affiliateUrl: "https://amazon.in",
    pros: [
      "Affordable dual-channel 16GB memory upgrade",
      "Low profile 34mm height fits under all CPU air coolers",
      "Plug-and-play automatic overclocking"
    ],
    cons: [
      "DDR4 only (physically incompatible with AMD AM5 or DDR5-only motherboards)"
    ],
    releaseDate: "2021-08-01",
    badges: ["Best Value"],
    specifications: {
      "Capacity": "16GB (2 x 8GB)",
      "Memory Type": "DDR4",
      "Speed": "3200 MHz",
      "CAS Latency": "CL16",
      "Voltage": "1.35V"
    },
    componentSpecs: {
      memoryType: "DDR4",
      speedMhz: 3200,
      capacityGB: 16,
      modules: "2x8GB",
      casLatency: "CL16"
    },
    images: [
      "https://images.unsplash.com/photo-1562976540-1502c2145186?w=800&auto=format&fit=crop&q=80"
    ],
    faqs: [],
    retailers: [
      {
        store: "Amazon India",
        storeSlug: "amazon-in",
        region: "IN",
        priceINR: 3899,
        priceAUD: 65,
        priceUSD: 45,
        inStock: true,
        affiliateUrl: "https://amazon.in"
      }
    ],
    priceHistory: [
      { date: "2026-05-01", priceINR: 4299, priceAUD: 75, priceUSD: 52 },
      { date: "2026-11-01", priceINR: 3899, priceAUD: 65, priceUSD: 45 }
    ]
  },

  // ==========================================
  // STORAGE (SSDS & NAS)
  // ==========================================
  {
    id: "samsung-990-pro-2tb",
    name: "Samsung 990 PRO 2TB PCIe 4.0 NVMe M.2 Internal SSD",
    slug: "samsung-990-pro-2tb",
    brand: "Samsung",
    description: "The gold standard of PCIe Gen4 storage. Delivers sequential read speeds up to 7,450 MB/s and random read/write speeds up to 1,400K/1,550K IOPS, ensuring near-instantaneous game load times and smooth 4K/8K media editing.",
    category: "components",
    subcategory: "ssds",
    pcPartType: "storage",
    basePriceINR: 16999,
    basePriceAUD: 279,
    basePriceUSD: 179,
    rating: 4.9,
    reviewCount: 6800,
    affiliateUrl: "https://amazon.in",
    pros: [
      "Blistering sequential speeds hitting PCIe 4.0 ceiling (7450 MB/s)",
      "World-class sustained write stability with dedicated nickel heat controller",
      "DirectStorage gaming optimization",
      "Samsung Magician software suite for health monitoring & encryption"
    ],
    cons: [
      "Priced at a premium over budget DRAM-less SSDs"
    ],
    releaseDate: "2022-11-01",
    featured: true,
    badges: ["Editor Choice", "Top Performance"],
    specifications: {
      "Capacity": "2TB",
      "Interface": "PCIe Gen 4.0 x4, NVMe 2.0",
      "Form Factor": "M.2 2280",
      "Sequential Read": "Up to 7,450 MB/s",
      "Sequential Write": "Up to 6,900 MB/s",
      "Endurance (TBW)": "1200 TBW",
      "DRAM Cache": "2GB LPDDR4"
    },
    componentSpecs: {
      storageInterface: "M.2 NVMe Gen4",
      readSpeedMBps: 7450,
      writeSpeedMBps: 6900
    },
    images: [
      "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=800&auto=format&fit=crop&q=80"
    ],
    faqs: [],
    retailers: [
      {
        store: "Amazon India",
        storeSlug: "amazon-in",
        region: "IN",
        priceINR: 16999,
        priceAUD: 279,
        priceUSD: 179,
        inStock: true,
        affiliateUrl: "https://amazon.in"
      },
      {
        store: "MDComputers",
        storeSlug: "mdcomputers",
        region: "IN",
        priceINR: 16400,
        priceAUD: 269,
        priceUSD: 172,
        inStock: true,
        affiliateUrl: "https://mdcomputers.in"
      },
      {
        store: "Scorptec Australia",
        storeSlug: "scorptec",
        region: "AU",
        priceINR: 17500,
        priceAUD: 269,
        priceUSD: 182,
        inStock: true,
        affiliateUrl: "https://scorptec.com.au"
      }
    ],
    priceHistory: [
      { date: "2026-05-01", priceINR: 19500, priceAUD: 319, priceUSD: 209 },
      { date: "2026-11-01", priceINR: 16400, priceAUD: 269, priceUSD: 172 }
    ]
  },

  // ==========================================
  // POWER SUPPLIES (PSUS)
  // ==========================================
  {
    id: "corsair-rm850x-850w-gold",
    name: "Corsair RM850x (2024) 850W 80 Plus Gold Fully Modular PSU",
    slug: "corsair-rm850x-850w-gold",
    brand: "Corsair",
    description: "The gold standard in enthusiast power supplies. Built with 100% Japanese 105°C electrolytic capacitors, ATX 3.1 & PCIe 5.1 compliance with native 12V-2x6 cable, Zero RPM fan mode, and backed by a 10-year warranty.",
    category: "components",
    subcategory: "power-supplies",
    pcPartType: "psu",
    basePriceINR: 12999,
    basePriceAUD: 219,
    basePriceUSD: 139,
    rating: 4.9,
    reviewCount: 5120,
    affiliateUrl: "https://amazon.in",
    pros: [
      "100% Japanese 105°C capacitors for unmatched voltage regulation",
      "Native ATX 3.1 & PCIe 5.1 compliant with native 12V-2x6 cable",
      "Virtually silent Zero RPM fan mode at low to moderate loads",
      "Industry-leading 10-year Corsair warranty"
    ],
    cons: [
      "Slightly stiff embossed cables"
    ],
    releaseDate: "2024-03-01",
    featured: true,
    badges: ["Editor Choice"],
    specifications: {
      "Wattage": "850W",
      "Efficiency": "80 PLUS Gold & Cybenetics Gold",
      "Modularity": "Fully Modular",
      "Fan Size": "135mm Magnetic Levitation",
      "Form Factor": "ATX (160mm length)"
    },
    componentSpecs: {
      wattage: 850,
      efficiencyRating: "80+ Gold",
      modularType: "Full"
    },
    images: [
      "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&auto=format&fit=crop&q=80"
    ],
    faqs: [],
    retailers: [
      {
        store: "Amazon India",
        storeSlug: "amazon-in",
        region: "IN",
        priceINR: 12999,
        priceAUD: 219,
        priceUSD: 139,
        inStock: true,
        affiliateUrl: "https://amazon.in"
      },
      {
        store: "PrimeABGB",
        storeSlug: "primeabgb",
        region: "IN",
        priceINR: 12450,
        priceAUD: 210,
        priceUSD: 134,
        inStock: true,
        affiliateUrl: "https://primeabgb.com"
      }
    ],
    priceHistory: [
      { date: "2026-05-01", priceINR: 13999, priceAUD: 239, priceUSD: 149 },
      { date: "2026-11-01", priceINR: 12450, priceAUD: 210, priceUSD: 134 }
    ]
  },

  // ==========================================
  // CASES
  // ==========================================
  {
    id: "lian-li-o11-dynamic-evo",
    name: "Lian Li O11 Dynamic EVO Mid-Tower Case",
    slug: "lian-li-o11-dynamic-evo",
    brand: "Lian Li",
    description: "The benchmark showcase chassis. Features panoramic dual-tempered glass, reversible chassis configuration (left or right side desk placement), dual-chamber cable management, and support for up to three 360mm radiators.",
    category: "components",
    subcategory: "cases",
    pcPartType: "case",
    basePriceINR: 14499,
    basePriceAUD: 249,
    basePriceUSD: 159,
    rating: 4.9,
    reviewCount: 3890,
    affiliateUrl: "https://amazon.in",
    pros: [
      "Showcase dual-chamber aesthetic with unobstructed glass views",
      "Supports massive 426mm GPUs and up to three 360mm radiators",
      "Reversible chassis design",
      "Outstanding modularity and cable routing space"
    ],
    cons: [
      "Does not come with pre-installed fans",
      "Wide dual-chamber footprint requires spacious desk"
    ],
    releaseDate: "2022-04-15",
    badges: ["Editor Choice"],
    specifications: {
      "Form Factor": "Mid-Tower",
      "Motherboard Support": "E-ATX, ATX, Micro-ATX, Mini-ITX",
      "Max GPU Length": "426 mm",
      "Max CPU Cooler Height": "167 mm",
      "Radiator Support": "Up to 3x 360mm"
    },
    componentSpecs: {
      supportedFormFactors: ["E-ATX", "ATX", "Micro-ATX", "Mini-ITX"],
      maxGpuLengthMM: 426,
      maxCoolerHeightMM: 167
    },
    images: [
      "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&auto=format&fit=crop&q=80"
    ],
    faqs: [],
    retailers: [
      {
        store: "Amazon India",
        storeSlug: "amazon-in",
        region: "IN",
        priceINR: 14499,
        priceAUD: 249,
        priceUSD: 159,
        inStock: true,
        affiliateUrl: "https://amazon.in"
      },
      {
        store: "MDComputers",
        storeSlug: "mdcomputers",
        region: "IN",
        priceINR: 13999,
        priceAUD: 239,
        priceUSD: 152,
        inStock: true,
        affiliateUrl: "https://mdcomputers.in"
      }
    ],
    priceHistory: [
      { date: "2026-05-01", priceINR: 15500, priceAUD: 269, priceUSD: 169 },
      { date: "2026-11-01", priceINR: 13999, priceAUD: 239, priceUSD: 152 }
    ]
  },

  // ==========================================
  // COOLERS
  // ==========================================
  {
    id: "deepcool-ak620-digital",
    name: "DeepCool AK620 Digital Dual-Tower CPU Air Cooler",
    slug: "deepcool-ak620-digital",
    brand: "DeepCool",
    description: "Enthusiast-grade dual-tower air cooling with a crystal-clear real-time digital temperature and usage display. Packed with 6 heatpipes and two fluid-dynamic bearing 120mm fans capable of dissipating up to 260W TDP.",
    category: "components",
    subcategory: "cooling",
    pcPartType: "cooler",
    basePriceINR: 6499,
    basePriceAUD: 109,
    basePriceUSD: 69,
    rating: 4.8,
    reviewCount: 2400,
    affiliateUrl: "https://amazon.in",
    pros: [
      "Real-time CPU temperature and utilization display on top cover",
      "Cools 260W TDP whisper quiet, rivaling 240mm AIOs",
      "Zero pump noise or leak anxiety",
      "Pre-applied high-performance thermal paste"
    ],
    cons: [
      "162mm height requires checking case clearance",
      "Front fan may need slight elevation with tall RGB RAM"
    ],
    releaseDate: "2023-08-01",
    badges: ["Editor Choice", "Best Value"],
    specifications: {
      "Type": "Dual Tower Air Cooler",
      "Heatpipes": "6x 6mm Copper Heatpipes",
      "Height": "162 mm",
      "Max TDP": "260W",
      "Supported Sockets": "AM5, AM4, LGA1700, LGA1851"
    },
    componentSpecs: {
      coolerType: "Air",
      coolerHeightMM: 162,
      supportedSockets: ["AM5", "AM4", "LGA1700", "LGA1851"]
    },
    images: [
      "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=800&auto=format&fit=crop&q=80"
    ],
    faqs: [],
    retailers: [
      {
        store: "Amazon India",
        storeSlug: "amazon-in",
        region: "IN",
        priceINR: 6499,
        priceAUD: 109,
        priceUSD: 69,
        inStock: true,
        affiliateUrl: "https://amazon.in"
      }
    ],
    priceHistory: [
      { date: "2026-05-01", priceINR: 7200, priceAUD: 119, priceUSD: 79 },
      { date: "2026-11-01", priceINR: 6499, priceAUD: 109, priceUSD: 69 }
    ]
  },

  // ==========================================
  // LAPTOPS
  // ==========================================
  {
    id: "asus-rog-zephyrus-g16-oled",
    name: "ASUS ROG Zephyrus G16 OLED (2025/2026 Edition)",
    slug: "asus-rog-zephyrus-g16-oled",
    brand: "ASUS",
    description: "The pinnacle of ultra-portable gaming and creative excellence. Powered by the Intel Core Ultra 9 processor, NVIDIA RTX 4080 (115W), and a jaw-dropping 16-inch 2.5K 240Hz ROG Nebula OLED display wrapped in a CNC aluminum unibody.",
    category: "computers",
    subcategory: "laptops",
    basePriceINR: 239999,
    basePriceAUD: 3899,
    basePriceUSD: 2499,
    rating: 4.9,
    reviewCount: 920,
    affiliateUrl: "https://amazon.in",
    pros: [
      "Mesmerizing 2.5K 240Hz 0.2ms OLED display with 100% DCI-P3 & G-Sync",
      "Sleek 1.49cm thin CNC aluminum chassis weighing only 1.85 kg",
      "Sublime 6-speaker acoustic soundstage with dual force-cancelling woofers",
      "Huge 90Wh battery with 100W USB-C fast charging"
    ],
    cons: [
      "LPDDR5X RAM is soldered (not user upgradeable)",
      "High price tier"
    ],
    releaseDate: "2024-02-15",
    featured: true,
    badges: ["Editor Choice", "Top Performance"],
    specifications: {
      "Processor": "Intel Core Ultra 9 185H (16 Cores, 22 Threads)",
      "Graphics": "NVIDIA GeForce RTX 4080 Laptop GPU 12GB (115W)",
      "Display": "16-inch 2.5K (2560x1600) 240Hz OLED ROG Nebula",
      "RAM": "32GB LPDDR5X-7467 MHz",
      "Storage": "2TB PCIe 4.0 NVMe SSD",
      "Weight": "1.85 kg",
      "Battery": "90 Wh"
    },
    images: [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80"
    ],
    faqs: [
      {
        question: "Is the OLED screen prone to burn-in during productivity work?",
        answer: "ASUS equips the ROG Zephyrus G16 with ROG OLED Care, including pixel refresh, taskbar dimming, and Samsung pixel shift algorithms to virtually eliminate burn-in risk."
      }
    ],
    retailers: [
      {
        store: "Amazon India",
        storeSlug: "amazon-in",
        region: "IN",
        priceINR: 239999,
        priceAUD: 3899,
        priceUSD: 2499,
        inStock: true,
        affiliateUrl: "https://amazon.in"
      },
      {
        store: "JB Hi-Fi Australia",
        storeSlug: "jbhifi",
        region: "AU",
        priceINR: 242000,
        priceAUD: 3799,
        priceUSD: 2480,
        inStock: true,
        affiliateUrl: "https://jbhifi.com.au"
      }
    ],
    priceHistory: [
      { date: "2026-05-01", priceINR: 259999, priceAUD: 4199, priceUSD: 2699 },
      { date: "2026-11-01", priceINR: 239999, priceAUD: 3799, priceUSD: 2480 }
    ],
    reviewScores: {
      buildQuality: 9.9,
      performance: 9.8,
      value: 9.2,
      features: 9.9,
      overall: 9.7
    }
  },
  {
    id: "lenovo-legion-pro-5-gen9",
    name: "Lenovo Legion Pro 5 Gen 9 (Ryzen 7 + RTX 4070)",
    slug: "lenovo-legion-pro-5-gen9",
    brand: "Lenovo",
    description: "The sweetest value-to-performance esports and AAA gaming laptop. Features AMD Ryzen 7 7745HX, full-power 140W RTX 4070, and a color-calibrated 16-inch 165Hz PureSight WQXGA gaming panel with Lenovo Coldfront 5.0 vapor chamber.",
    category: "computers",
    subcategory: "laptops",
    basePriceINR: 144990,
    basePriceAUD: 2399,
    basePriceUSD: 1499,
    rating: 4.8,
    reviewCount: 1540,
    affiliateUrl: "https://amazon.in",
    pros: [
      "Maximum TGP 140W RTX 4070 delivers desktop-class performance",
      "Superb Legion TrueStrike keyboard with 1.5mm key travel",
      "Exceptional Legion Coldfront thermal cooling",
      "Dual upgradable DDR5 RAM slots and dual M.2 SSD slots"
    ],
    cons: [
      "Large 300W power brick",
      "Battery life is average under mixed workloads (~4-5 hours)"
    ],
    releaseDate: "2024-03-20",
    badges: ["Best Value"],
    specifications: {
      "Processor": "AMD Ryzen 7 7745HX (8 Cores, 16 Threads)",
      "Graphics": "NVIDIA GeForce RTX 4070 Laptop GPU 8GB (140W TGP)",
      "Display": "16-inch WQXGA (2560x1600) 165Hz IPS 500 nits",
      "RAM": "16GB (2x8GB) DDR5-5200 (Upgradable to 64GB)",
      "Storage": "1TB PCIe Gen4 NVMe SSD",
      "Weight": "2.5 kg"
    },
    images: [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format&fit=crop&q=80"
    ],
    faqs: [],
    retailers: [
      {
        store: "Amazon India",
        storeSlug: "amazon-in",
        region: "IN",
        priceINR: 144990,
        priceAUD: 2399,
        priceUSD: 1499,
        inStock: true,
        affiliateUrl: "https://amazon.in"
      },
      {
        store: "Centre Com",
        storeSlug: "centrecom",
        region: "AU",
        priceINR: 148000,
        priceAUD: 2349,
        priceUSD: 1490,
        inStock: true,
        affiliateUrl: "https://centrecom.com.au"
      }
    ],
    priceHistory: [
      { date: "2026-05-01", priceINR: 159990, priceAUD: 2599, priceUSD: 1649 },
      { date: "2026-11-01", priceINR: 144990, priceAUD: 2349, priceUSD: 1490 }
    ]
  },
  {
    id: "apple-macbook-pro-14-m4-pro",
    name: "Apple MacBook Pro 14-inch (M4 Pro Chip, 2025/2026)",
    slug: "apple-macbook-pro-14-m4-pro",
    brand: "Apple",
    description: "The premier professional workstation laptop. Engineered with the revolutionary M4 Pro silicon, 14-core CPU, 20-core GPU, 24GB unified memory, Liquid Retina XDR with 1600 nits HDR, and unprecedented 22-hour battery life.",
    category: "computers",
    subcategory: "laptops",
    basePriceINR: 199900,
    basePriceAUD: 3299,
    basePriceUSD: 1999,
    rating: 4.9,
    reviewCount: 3100,
    affiliateUrl: "https://amazon.in",
    pros: [
      "Incomparable 22-hour battery life with full unplugged performance",
      "Spectacular Liquid Retina XDR Mini-LED panel with nano-texture option",
      "Thunderbolt 5 ports supporting up to 120Gb/s transfer speeds",
      "Class-leading trackpad, keyboard, and 1080p Center Stage camera"
    ],
    cons: [
      "Not designed for AAA Windows PC gaming library",
      "RAM and storage cannot be upgraded after purchase"
    ],
    releaseDate: "2024-11-08",
    featured: true,
    badges: ["Editor Choice"],
    specifications: {
      "Processor": "Apple M4 Pro (14-core CPU with 10 performance and 4 efficiency cores)",
      "Graphics": "20-core GPU with hardware-accelerated ray tracing",
      "Memory": "24GB Unified Memory (273GB/s bandwidth)",
      "Display": "14.2-inch Liquid Retina XDR (3024x1964) 120Hz ProMotion",
      "Storage": "512GB / 1TB SSD",
      "Battery": "Up to 22 hours video playback"
    },
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80"
    ],
    faqs: [],
    retailers: [
      {
        store: "Amazon India",
        storeSlug: "amazon-in",
        region: "IN",
        priceINR: 199900,
        priceAUD: 3299,
        priceUSD: 1999,
        inStock: true,
        affiliateUrl: "https://amazon.in"
      },
      {
        store: "Officeworks Australia",
        storeSlug: "officeworks",
        region: "AU",
        priceINR: 202000,
        priceAUD: 3249,
        priceUSD: 1980,
        inStock: true,
        affiliateUrl: "https://officeworks.com.au"
      }
    ],
    priceHistory: [
      { date: "2026-05-01", priceINR: 209900, priceAUD: 3399, priceUSD: 2099 },
      { date: "2026-11-01", priceINR: 199900, priceAUD: 3249, priceUSD: 1980 }
    ]
  },

  // ==========================================
  // DISPLAYS / MONITORS
  // ==========================================
  {
    id: "asus-rog-swift-oled-pg32ucdm",
    name: "ASUS ROG Swift OLED PG32UCDM 32\" 4K 240Hz QD-OLED Monitor",
    slug: "asus-rog-swift-oled-pg32ucdm",
    brand: "ASUS",
    description: "The ultimate gaming monitor. Unites 4K UHD resolution, 240Hz refresh rate, 3rd-Gen QD-OLED panel, 0.03ms GTG response time, Dolby Vision, custom graphene heatsink, and 90W USB-C Power Delivery.",
    category: "displays",
    subcategory: "gaming-monitors",
    basePriceINR: 124999,
    basePriceAUD: 1999,
    basePriceUSD: 1299,
    rating: 5.0,
    reviewCount: 780,
    affiliateUrl: "https://amazon.in",
    pros: [
      "Incredible 4K 240Hz QD-OLED with true infinite black and 1,500,000:1 contrast",
      "Near-zero 0.03ms response time eradicates ghosting completely",
      "Custom passive graphene heatsink ensures zero fan noise & burn-in prevention",
      "Includes 90W USB-C KVM switch for multiple PCs"
    ],
    cons: [
      "High price tag",
      "Glossy screen reflections in directly lit rooms"
    ],
    releaseDate: "2024-02-28",
    featured: true,
    badges: ["Editor Choice", "Top Performance"],
    specifications: {
      "Screen Size": "31.5 inch",
      "Panel Type": "3rd Gen QD-OLED",
      "Resolution": "3840 x 2160 (4K UHD)",
      "Refresh Rate": "240 Hz",
      "Response Time": "0.03 ms GTG",
      "HDR": "DisplayHDR True Black 400 & Dolby Vision",
      "Connectivity": "2x HDMI 2.1, 1x DP 1.4 (DSC), 1x USB-C (90W PD)"
    },
    images: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80"
    ],
    faqs: [],
    retailers: [
      {
        store: "Amazon India",
        storeSlug: "amazon-in",
        region: "IN",
        priceINR: 124999,
        priceAUD: 1999,
        priceUSD: 1299,
        inStock: true,
        affiliateUrl: "https://amazon.in"
      },
      {
        store: "Scorptec Australia",
        storeSlug: "scorptec",
        region: "AU",
        priceINR: 128000,
        priceAUD: 1949,
        priceUSD: 1280,
        inStock: true,
        affiliateUrl: "https://scorptec.com.au"
      }
    ],
    priceHistory: [
      { date: "2026-05-01", priceINR: 135000, priceAUD: 2199, priceUSD: 1399 },
      { date: "2026-11-01", priceINR: 124999, priceAUD: 1949, priceUSD: 1280 }
    ]
  },

  // ==========================================
  // STORAGE & NAS
  // ==========================================
  {
    id: "synology-diskstation-ds923plus",
    name: "Synology DiskStation DS923+ 4-Bay NAS Enclosure",
    slug: "synology-diskstation-ds923plus",
    brand: "Synology",
    description: "The gold standard private cloud and backup server for homes and small businesses. Powered by an AMD Ryzen R1600 processor, ECC DDR4 memory, dual NVMe M.2 caching slots, and the award-winning Synology DiskStation Manager (DSM) OS.",
    category: "storage",
    subcategory: "nas",
    basePriceINR: 56999,
    basePriceAUD: 899,
    basePriceUSD: 599,
    rating: 4.8,
    reviewCount: 1650,
    affiliateUrl: "https://amazon.in",
    pros: [
      "DSM 7.2 operating system with automated multi-PC snapshot backups",
      "Expandable up to 9 drives with DX517 expansion unit (108TB+)",
      "Dual M.2 NVMe SSD slots for high-speed cache acceleration or storage pools",
      "Optional 10GbE networking card upgrade"
    ],
    cons: [
      "Hard drives sold separately",
      "No onboard hardware video transcoding chip (Plex transcode limited)"
    ],
    releaseDate: "2023-01-10",
    badges: ["Editor Choice"],
    specifications: {
      "Drive Bays": "4x 3.5\"/2.5\" SATA (Expandable to 9)",
      "Processor": "AMD Ryzen R1600 (Dual Core 2.6/3.1 GHz)",
      "RAM": "4GB DDR4 ECC (Expandable to 32GB)",
      "M.2 Slots": "2x M.2 2280 NVMe SSD",
      "LAN Ports": "2x 1GbE RJ-45 (Link Aggregation / Failover)",
      "Optional PCIe": "10GbE network upgrade slot"
    },
    images: [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80"
    ],
    faqs: [
      {
        question: "Can the DS923+ automatically back up my iPhone, Android, and Windows PC?",
        answer: "Yes! Synology Active Backup for Business and Synology Photos provide seamless, automatic, scheduled backup of PCs, Macs, and smartphones directly over Wi-Fi without any monthly subscription fees."
      }
    ],
    retailers: [
      {
        store: "Amazon India",
        storeSlug: "amazon-in",
        region: "IN",
        priceINR: 56999,
        priceAUD: 899,
        priceUSD: 599,
        inStock: true,
        affiliateUrl: "https://amazon.in"
      },
      {
        store: "Mwave Australia",
        storeSlug: "mwave",
        region: "AU",
        priceINR: 58500,
        priceAUD: 879,
        priceUSD: 589,
        inStock: true,
        affiliateUrl: "https://mwave.com.au"
      }
    ],
    priceHistory: [
      { date: "2026-05-01", priceINR: 62000, priceAUD: 949, priceUSD: 629 },
      { date: "2026-11-01", priceINR: 56999, priceAUD: 879, priceUSD: 589 }
    ]
  },

  // ==========================================
  // PERIPHERALS (DOCKS, MICE, KEYBOARDS)
  // ==========================================
  {
    id: "caldigit-ts4-thunderbolt-4-dock",
    name: "CalDigit TS4 Thunderbolt 4 Docking Station (18 Ports, 98W)",
    slug: "caldigit-ts4-thunderbolt-4-dock",
    brand: "CalDigit",
    description: "The absolute benchmark in docking stations. Packed with 18 versatile ports, full 98W host laptop charging, 2.5GbE Ethernet, UHS-II SD/microSD slots, and dual 6K 60Hz or single 8K monitor support.",
    category: "peripherals",
    subcategory: "docking-stations",
    basePriceINR: 36999,
    basePriceAUD: 599,
    basePriceUSD: 399,
    rating: 4.9,
    reviewCount: 2890,
    affiliateUrl: "https://amazon.in",
    pros: [
      "18 massive ports including 3x Thunderbolt 4 and 5x USB-A 3.2 Gen2",
      "Full 98W fast charging to power MacBook Pros and Dell XPS workstations",
      "Ultra-fast 2.5 Gigabit Ethernet port",
      "Sturdy CNC aluminum chassis dissipates heat passively"
    ],
    cons: [
      "Premium price investment",
      "Requires Thunderbolt 4/3 or USB4 host for full dual-display output"
    ],
    releaseDate: "2022-03-15",
    badges: ["Editor Choice", "Top Performance"],
    specifications: {
      "Host Interface": "Thunderbolt 4 / USB4",
      "Total Ports": 18,
      "Power Delivery": "98W",
      "Display Outputs": "DisplayPort 1.4, 2x Downstream TB4",
      "Ethernet": "2.5 Gigabit RJ-45",
      "Card Readers": "UHS-II SD & MicroSD"
    },
    images: [
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80"
    ],
    faqs: [],
    retailers: [
      {
        store: "Amazon India",
        storeSlug: "amazon-in",
        region: "IN",
        priceINR: 36999,
        priceAUD: 599,
        priceUSD: 399,
        inStock: true,
        affiliateUrl: "https://amazon.in"
      },
      {
        store: "Scorptec Australia",
        storeSlug: "scorptec",
        region: "AU",
        priceINR: 38200,
        priceAUD: 589,
        priceUSD: 395,
        inStock: true,
        affiliateUrl: "https://scorptec.com.au"
      }
    ],
    priceHistory: [
      { date: "2026-05-01", priceINR: 39999, priceAUD: 649, priceUSD: 429 },
      { date: "2026-11-01", priceINR: 36999, priceAUD: 589, priceUSD: 395 }
    ]
  },
  {
    id: "logitech-mx-master-3s",
    name: "Logitech MX Master 3S Wireless Performance Mouse",
    slug: "logitech-mx-master-3s",
    brand: "Logitech",
    description: "The gold standard for productivity and ergonomics. Features ultra-quiet clicks, 8,000 DPI track-on-glass optical sensor, electromagnetic MagSpeed scrolling wheel (1,000 lines/sec), and seamless cross-computer flow.",
    category: "peripherals",
    subcategory: "mice",
    basePriceINR: 8995,
    basePriceAUD: 149,
    basePriceUSD: 99,
    rating: 4.9,
    reviewCount: 9400,
    affiliateUrl: "https://amazon.in",
    pros: [
      "Electromagnetic MagSpeed scroll wheel toggles ratcheted & free-spin instantly",
      "Quiet Clicks produce 90% less click noise",
      "8,000 DPI sensor tracks seamlessly even on transparent glass surfaces",
      "Logi Options+ gesture customization and 70-day battery life"
    ],
    cons: [
      "Right-handed only ergonomic shape",
      "125Hz polling rate not meant for competitive esports gaming"
    ],
    releaseDate: "2022-05-24",
    badges: ["Editor Choice"],
    specifications: {
      "Sensor": "Darkfield High Precision (8,000 DPI)",
      "Battery": "500 mAh Li-Po (Up to 70 days)",
      "Connectivity": "Bluetooth Low Energy + Logi Bolt USB",
      "Buttons": "7 customizable buttons + gesture button"
    },
    images: [
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop&q=80"
    ],
    faqs: [],
    retailers: [
      {
        store: "Amazon India",
        storeSlug: "amazon-in",
        region: "IN",
        priceINR: 8995,
        priceAUD: 149,
        priceUSD: 99,
        inStock: true,
        affiliateUrl: "https://amazon.in"
      },
      {
        store: "JB Hi-Fi Australia",
        storeSlug: "jbhifi",
        region: "AU",
        priceINR: 9200,
        priceAUD: 144,
        priceUSD: 96,
        inStock: true,
        affiliateUrl: "https://jbhifi.com.au"
      }
    ],
    priceHistory: [
      { date: "2026-05-01", priceINR: 9995, priceAUD: 169, priceUSD: 109 },
      { date: "2026-11-01", priceINR: 8995, priceAUD: 144, priceUSD: 96 }
    ]
  },

  // ==========================================
  // SOFTWARE
  // ==========================================
  {
    id: "microsoft-365-family",
    name: "Microsoft 365 Family (Up to 6 People, 6TB Cloud Storage)",
    slug: "microsoft-365-family",
    brand: "Microsoft",
    description: "The complete productivity suite for families and households. Includes premium Word, Excel, PowerPoint, Outlook, OneNote, 1TB OneDrive cloud storage per user (6TB total), and advanced Microsoft Defender cybersecurity.",
    category: "software",
    subcategory: "microsoft-365",
    basePriceINR: 5399,
    basePriceAUD: 139,
    basePriceUSD: 99,
    rating: 4.8,
    reviewCount: 12400,
    affiliateUrl: "https://amazon.in",
    pros: [
      "Covers up to 6 separate family members with independent accounts",
      "6TB total cloud storage (1TB private OneDrive per member)",
      "Always updated desktop, mobile, and web Office apps with Copilot integration",
      "Integrated ransomware detection and file recovery"
    ],
    cons: [
      "Annual subscription model"
    ],
    releaseDate: "2024-01-01",
    badges: ["Best Value"],
    specifications: {
      "Users": "1 to 6 people",
      "Storage": "6 TB Total (1 TB per person)",
      "Included Apps": "Word, Excel, PowerPoint, Outlook, OneNote, Defender",
      "Platform": "Windows, macOS, iOS, Android"
    },
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80"
    ],
    faqs: [],
    retailers: [
      {
        store: "Amazon India",
        storeSlug: "amazon-in",
        region: "IN",
        priceINR: 5399,
        priceAUD: 139,
        priceUSD: 99,
        inStock: true,
        affiliateUrl: "https://amazon.in"
      }
    ],
    priceHistory: [
      { date: "2026-05-01", priceINR: 5899, priceAUD: 149, priceUSD: 109 },
      { date: "2026-11-01", priceINR: 5399, priceAUD: 139, priceUSD: 99 }
    ]
  }
];
