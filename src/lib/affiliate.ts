import { Region } from "@/types";

export interface AffiliateConfig {
  amazonIndiaTag: string;
  amazonAustraliaTag: string;
  amazonUsTag: string;
  mdComputersRef: string;
  scorptecRef: string;
  vedantRef: string;
  primeabgbRef: string;
}

export const DEFAULT_AFFILIATE_CONFIG: AffiliateConfig = {
  amazonIndiaTag: process.env.NEXT_PUBLIC_AMAZON_AFFILIATE_TAG_IN || "techadvisorin-21",
  amazonAustraliaTag: process.env.NEXT_PUBLIC_AMAZON_AFFILIATE_TAG_AU || "techadvisorau-22",
  amazonUsTag: process.env.NEXT_PUBLIC_AMAZON_AFFILIATE_TAG_US || "techadvisorai-20",
  mdComputersRef: "techadvisor",
  scorptecRef: "techadvisor",
  vedantRef: "techadvisor",
  primeabgbRef: "techadvisor",
};

export function buildAffiliateUrl(
  rawUrl: string,
  store: string,
  region: Region = 'IN',
  customTag?: string
): string {
  try {
    const url = new URL(rawUrl);

    if (store.toLowerCase().includes("amazon")) {
      const tag = customTag && customTag.trim()
        ? customTag.trim()
        : region === 'AU'
          ? DEFAULT_AFFILIATE_CONFIG.amazonAustraliaTag
          : region === 'US'
            ? DEFAULT_AFFILIATE_CONFIG.amazonUsTag
            : DEFAULT_AFFILIATE_CONFIG.amazonIndiaTag;

      url.searchParams.set("tag", tag);
      return url.toString();
    }

    if (store.toLowerCase().includes("mdcomputers")) {
      url.searchParams.set("tracking", DEFAULT_AFFILIATE_CONFIG.mdComputersRef);
      return url.toString();
    }

    if (store.toLowerCase().includes("scorptec")) {
      url.searchParams.set("ref", DEFAULT_AFFILIATE_CONFIG.scorptecRef);
      return url.toString();
    }

    return rawUrl;
  } catch (e) {
    return rawUrl;
  }
}
