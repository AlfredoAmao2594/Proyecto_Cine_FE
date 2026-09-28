export type CardBrand = 'VISA' | 'MASTERCARD' | 'AMEX';

export function getCardBrand(number: string | undefined): CardBrand | null {
  const first = (number ?? '').replace(/\D/g, '')[0];
  if (first === '4') return 'VISA';
  if (first === '5') return 'MASTERCARD';
  if (first === '3') return 'AMEX';
  return null;
}