import { create } from 'zustand';
import { Currency, Region } from '@/types';

interface CurrencyState {
  currency: Currency;
  region: Region;
  setCurrency: (c: Currency) => void;
  setRegion: (r: Region) => void;
}

export const useCurrencyStore = create<CurrencyState>((set) => ({
  currency: 'INR',
  region: 'IN',
  setCurrency: (currency) => {
    let region: Region = 'IN';
    if (currency === 'AUD') region = 'AU';
    if (currency === 'USD') region = 'US';
    set({ currency, region });
  },
  setRegion: (region) => {
    let currency: Currency = 'INR';
    if (region === 'AU') currency = 'AUD';
    if (region === 'US') currency = 'USD';
    set({ region, currency });
  },
}));
