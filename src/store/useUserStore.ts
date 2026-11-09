import { create } from 'zustand';
import { PCBuild } from '@/types';

export interface PriceAlert {
  id: string;
  productId: string;
  productName: string;
  currentPrice: number;
  targetPrice: number;
  currency: string;
  email: string;
  createdAt: string;
}

interface UserState {
  bookmarks: string[]; // product IDs
  savedBuilds: PCBuild[];
  priceAlerts: PriceAlert[];
  toggleBookmark: (productId: string) => void;
  isBookmarked: (productId: string) => boolean;
  saveBuild: (build: PCBuild) => void;
  removeSavedBuild: (buildId: string) => void;
  addPriceAlert: (alert: Omit<PriceAlert, 'id' | 'createdAt'>) => void;
  removePriceAlert: (id: string) => void;
}

export const useUserStore = create<UserState>((set, get) => ({
  bookmarks: ['ryzen-7-7800x3d', 'rtx-4070-super', 'samsung-990-pro-2tb'],
  savedBuilds: [],
  priceAlerts: [
    {
      id: 'alert-1',
      productId: 'rtx-4070-super',
      productName: 'NVIDIA GeForce RTX 4070 Super 12GB',
      currentPrice: 58999,
      targetPrice: 55000,
      currency: 'INR',
      email: 'user@techadvisor.ai',
      createdAt: '2026-11-01',
    },
  ],
  toggleBookmark: (productId) => {
    const list = get().bookmarks;
    if (list.includes(productId)) {
      set({ bookmarks: list.filter((id) => id !== productId) });
    } else {
      set({ bookmarks: [...list, productId] });
    }
  },
  isBookmarked: (productId) => {
    return get().bookmarks.includes(productId);
  },
  saveBuild: (build) => {
    set((state) => ({
      savedBuilds: [build, ...state.savedBuilds.filter((b) => b.id !== build.id)],
    }));
  },
  removeSavedBuild: (buildId) => {
    set((state) => ({
      savedBuilds: state.savedBuilds.filter((b) => b.id !== buildId),
    }));
  },
  addPriceAlert: (alert) => {
    const newAlert: PriceAlert = {
      ...alert,
      id: 'alert-' + Date.now(),
      createdAt: new Date().toISOString().split('T')[0],
    };
    set((state) => ({
      priceAlerts: [newAlert, ...state.priceAlerts],
    }));
  },
  removePriceAlert: (id) => {
    set((state) => ({
      priceAlerts: state.priceAlerts.filter((a) => a.id !== id),
    }));
  },
}));
