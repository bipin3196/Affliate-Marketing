import { create } from 'zustand';
import { Product } from '@/types';

interface ComparisonState {
  compareList: Product[];
  addToCompare: (product: Product) => boolean;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
  isInCompare: (productId: string) => boolean;
}

export const useComparisonStore = create<ComparisonState>((set, get) => ({
  compareList: [],
  addToCompare: (product: Product) => {
    const list = get().compareList;
    if (list.length >= 4) {
      return false; // Limit reached
    }
    if (!list.some((p) => p.id === product.id)) {
      set({ compareList: [...list, product] });
      return true;
    }
    return true;
  },
  removeFromCompare: (productId: string) => {
    set({ compareList: get().compareList.filter((p) => p.id !== productId) });
  },
  clearCompare: () => {
    set({ compareList: [] });
  },
  isInCompare: (productId: string) => {
    return get().compareList.some((p) => p.id === productId);
  },
}));
