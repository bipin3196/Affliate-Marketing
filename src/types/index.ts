export type Currency = 'INR' | 'AUD' | 'USD';
export type Region = 'IN' | 'AU' | 'US';

export type MainCategory =
  | 'computers'
  | 'components'
  | 'displays'
  | 'networking'
  | 'storage'
  | 'peripherals'
  | 'software';

export type SubCategory =
  // Computers
  | 'gaming-pcs'
  | 'business-pcs'
  | 'workstations'
  | 'mini-pcs'
  | 'laptops'
  | 'student-laptops'
  // Components
  | 'cpus'
  | 'gpus'
  | 'motherboards'
  | 'ram'
  | 'ssds'
  | 'hdds'
  | 'power-supplies'
  | 'cases'
  | 'cooling'
  // Displays
  | 'monitors'
  | 'ultrawide-monitors'
  | 'gaming-monitors'
  | 'portable-monitors'
  // Networking
  | 'routers'
  | 'mesh-systems'
  | 'access-points'
  | 'switches'
  | 'firewalls'
  // Storage
  | 'nas'
  | 'das'
  | 'backup-devices'
  | 'external-ssds'
  // Peripherals
  | 'keyboards'
  | 'mice'
  | 'headsets'
  | 'webcams'
  | 'microphones'
  | 'docking-stations'
  // Software
  | 'antivirus'
  | 'vpns'
  | 'backup-software'
  | 'pdf-software'
  | 'productivity-tools'
  | 'microsoft-365'
  | 'adobe-solutions';

export interface RetailerPrice {
  store: string;
  storeSlug: string;
  region: Region;
  priceINR: number;
  priceAUD: number;
  priceUSD: number;
  inStock: boolean;
  affiliateUrl: string;
  shippingInfo?: string;
  logo?: string;
  isOfficialPartner?: boolean;
}

export interface PricePoint {
  date: string;
  priceINR: number;
  priceAUD: number;
  priceUSD: number;
}

export interface ProductFAQ {
  question: string;
  answer: string;
}

export interface ProductReviewScore {
  buildQuality: number;
  performance: number;
  value: number;
  features: number;
  overall: number;
}

export type PCPartType =
  | 'cpu'
  | 'motherboard'
  | 'gpu'
  | 'ram'
  | 'storage'
  | 'psu'
  | 'case'
  | 'cooler';

export interface ComponentSpecifics {
  // CPU
  socket?: 'AM5' | 'AM4' | 'LGA1700' | 'LGA1851';
  tdp?: number;
  coreCount?: number;
  threadCount?: number;
  baseClock?: string;
  boostClock?: string;
  integratedGraphics?: boolean;

  // Motherboard
  chipset?: string;
  formFactor?: 'ATX' | 'Micro-ATX' | 'Mini-ITX' | 'E-ATX';
  memoryType?: 'DDR5' | 'DDR4';
  memorySlots?: number;
  maxMemoryGB?: number;
  pcieVersion?: string;
  m2Slots?: number;
  wifiSupport?: boolean;
  biosUpdateNeededForRyzen5000?: boolean;

  // GPU
  vramGB?: number;
  gpuLengthMM?: number;
  recommendedPsuWattage?: number;
  powerConnectors?: string;

  // RAM
  speedMhz?: number;
  capacityGB?: number;
  modules?: string;
  casLatency?: string;

  // Storage
  storageInterface?: 'M.2 NVMe Gen4' | 'M.2 NVMe Gen5' | 'SATA III' | 'External USB 3.2';
  readSpeedMBps?: number;
  writeSpeedMBps?: number;

  // PSU
  wattage?: number;
  efficiencyRating?: '80+ Bronze' | '80+ Gold' | '80+ Platinum' | '80+ Titanium';
  modularType?: 'Full' | 'Semi' | 'Non';

  // Case
  supportedFormFactors?: ('ATX' | 'Micro-ATX' | 'Mini-ITX' | 'E-ATX')[];
  maxGpuLengthMM?: number;
  maxCoolerHeightMM?: number;

  // Cooler
  coolerType?: 'Air' | '240mm AIO' | '360mm AIO';
  coolerHeightMM?: number;
  supportedSockets?: ('AM5' | 'AM4' | 'LGA1700' | 'LGA1851')[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  description: string;
  category: MainCategory;
  subcategory: SubCategory;
  pcPartType?: PCPartType;
  basePriceINR: number;
  basePriceAUD: number;
  basePriceUSD: number;
  rating: number;
  reviewCount: number;
  affiliateUrl: string;
  pros: string[];
  cons: string[];
  releaseDate: string;
  specifications: Record<string, string | number>;
  componentSpecs?: ComponentSpecifics;
  images: string[];
  videos?: string[];
  faqs: ProductFAQ[];
  retailers: RetailerPrice[];
  priceHistory: PricePoint[];
  reviewScores?: ProductReviewScore;
  featured?: boolean;
  badges?: ('Editor Choice' | 'Best Value' | 'Top Performance' | 'Trending' | 'Staff Pick')[];
}

export interface CompatibilityIssue {
  severity: 'error' | 'warning' | 'info';
  title: string;
  message: string;
  affectedParts: PCPartType[];
}

export interface CompatibilityReport {
  isCompatible: boolean;
  totalEstimatedWattage: number;
  recommendedPsuWattage: number;
  issues: CompatibilityIssue[];
}

export interface PCBuild {
  id: string;
  title: string;
  slug: string;
  purpose: 'Gaming' | 'Streaming' | 'Video Editing' | '3D Rendering' | 'AI Development' | 'Home Office' | 'Business';
  targetBudgetINR: number;
  targetBudgetAUD: number;
  targetBudgetUSD: number;
  description: string;
  parts: Partial<Record<PCPartType, Product>>;
  benchmarks?: {
    cyberpunk1080p: number;
    cs21080p: number;
    valorant1080p: number;
  };
}

export interface FPSBenchmarkRecord {
  game: string;
  coverImage?: string;
  gameSlug: string;
  resolution: '1080p' | '1440p' | '4K';
  qualityPreset: 'Low' | 'Medium' | 'High' | 'Ultra' | 'Ray Tracing';
  gpuName: string;
  cpuName: string;
  avgFps: number;
  onePercentLowFps: number;
  playableRating: 'Smooth' | 'Very Smooth' | 'Competitive Esports' | 'Extreme';
}

export interface Deal {
  id: string;
  title: string;
  slug: string;
  productId: string;
  productName: string;
  category: MainCategory;
  retailer: string;
  region: Region;
  originalPriceINR: number;
  dealPriceINR: number;
  originalPriceAUD: number;
  dealPriceAUD: number;
  originalPriceUSD: number;
  dealPriceUSD: number;
  discountPercentage: number;
  saleEvent: 'Diwali Sale' | 'EOFY Sale' | 'Prime Day' | 'Black Friday' | 'Daily Deal';
  affiliateUrl: string;
  expiresAt: string;
  image: string;
  badge?: string;
}

export interface BuyingGuide {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  category: MainCategory;
  author: string;
  publishedDate: string;
  readTime: string;
  heroImage: string;
  summary: string;
  topPickId: string;
  bestValueId: string;
  premiumPickId: string;
  productIds: string[];
  faqs: ProductFAQ[];
  contentSections: {
    title: string;
    body: string;
    tips?: string[];
  }[];
}
