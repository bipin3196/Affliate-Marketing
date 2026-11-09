import { Currency } from "@/types";

export function formatPrice(amount: number, currency: Currency = 'INR'): string {
  if (amount === undefined || amount === null || isNaN(amount)) return '-';

  if (currency === 'INR') {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  }

  if (currency === 'AUD') {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      maximumFractionDigits: 0,
    }).format(amount);
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getCurrencySymbol(currency: Currency = 'INR'): string {
  switch (currency) {
    case 'INR':
      return '₹';
    case 'AUD':
      return 'A$';
    case 'USD':
      return '$';
    default:
      return '₹';
  }
}
