/**
 * Algoritmo de Luhn: de derecha a izquierda, duplica uno sí y uno no;
 * si el doble pasa de 9 réstale 9; la suma debe ser múltiplo de 10.
 */
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

/** "MM/AA" vencida respecto al mes actual (la tarjeta vale hasta el fin de su mes). */
export function isExpired(mmYY: string, today: Date = new Date()): boolean {
  const [month, year] = mmYY.split('/').map(Number);
  const fullYear = 2000 + year;
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  return fullYear < currentYear || (fullYear === currentYear && month < currentMonth);
}

/** "12/30" → "2030/12" (formato que espera el backend / PayU). */
export function toApiExpiration(mmYY: string): string {
  const [month, year] = mmYY.split('/');
  return `20${year}/${month}`;
}

/** "4097 4400 0000 0004" → "4097440000000004" */
export const onlyDigits = (value: string | undefined): string => (value ?? '').replace(/\D/g, '');
