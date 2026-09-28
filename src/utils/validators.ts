export function isValidLuhn(number: string): boolean {
  if (!/^\d{12,19}$/.test(number)) return false;
  let sum = 0;
  let double = false;
  for (let i = number.length - 1; i >= 0; i -= 1) {
    let digit = Number(number[i]);
    if (double) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    double = !double;
  }
  return sum % 10 === 0;
}


export function isExpired(mmYY: string, today: Date = new Date()): boolean {
  const [month, year] = mmYY.split('/').map(Number);
  const fullYear = 2000 + year;
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  return fullYear < currentYear || (fullYear === currentYear && month < currentMonth);
}


export function toApiExpiration(mmYY: string): string {
  const [month, year] = mmYY.split('/');
  return `20${year}/${month}`;
}

export const onlyDigits = (value: string | undefined): string => (value ?? '').replace(/\D/g, '');
