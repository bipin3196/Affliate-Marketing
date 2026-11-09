import { create } from 'zustand';
import { PCPartType, Product, PCBuild } from '@/types';
import { checkBuildCompatibility } from '@/lib/compatibility';

interface PCBuilderState {
  buildTitle: string;
  parts: Partial<Record<PCPartType, Product>>;
  setPart: (type: PCPartType, product: Product) => void;
  removePart: (type: PCPartType) => void;
  clearBuild: () => void;
  loadBuild: (build: PCBuild) => void;
  setTitle: (title: string) => void;
  getTotalPrice: (currency: 'INR' | 'AUD' | 'USD') => number;
  getCompatibility: () => ReturnType<typeof checkBuildCompatibility>;
}

export const usePCBuilderStore = create<PCBuilderState>((set, get) => ({
  buildTitle: "Custom High-Performance PC Build",
  parts: {},
  setPart: (type, product) => {
    set((state) => ({
      parts: { ...state.parts, [type]: product },
    }));
  },
  removePart: (type) => {
    set((state) => {
      const nextParts = { ...state.parts };
      delete nextParts[type];
      return { parts: nextParts };
    });
  },
  clearBuild: () => {
    set({ parts: {}, buildTitle: "Custom High-Performance PC Build" });
  },
  loadBuild: (build) => {
    set({
      buildTitle: build.title,
      parts: { ...build.parts },
    });
  },
  setTitle: (buildTitle) => set({ buildTitle }),
  getTotalPrice: (currency) => {
    const parts = get().parts;
    return Object.values(parts).reduce((sum, item) => {
      if (!item) return sum;
      if (currency === 'INR') return sum + (item.basePriceINR || 0);
      if (currency === 'AUD') return sum + (item.basePriceAUD || 0);
      return sum + (item.basePriceUSD || 0);
    }, 0);
  },
  getCompatibility: () => {
    return checkBuildCompatibility(get().parts);
  },
}));
