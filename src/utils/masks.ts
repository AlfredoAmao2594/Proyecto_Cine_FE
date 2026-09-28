/** "4097440000000004" → "4097 4400 0000 0004" */
export const formatCardNumber = (value: string | undefined): string =>
  (value ?? '').replace(/\D/g, '').slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ');

/** "1230" → "12/30" */
export const formatExpiration = (value: string | undefined): string => {
  const digits = (value ?? '').replace(/\D/g, '').slice(0, 4);
  return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
};
