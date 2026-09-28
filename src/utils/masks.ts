
export const formatCardNumber = (value: string | undefined): string =>
  (value ?? '').replace(/\D/g, '').slice(0, 16).replace(/(\d{4})(?=\d)/g, '$1 ');


export const formatExpiration = (value: string | undefined): string => {
  const digits = (value ?? '').replace(/\D/g, '').slice(0, 4);
  return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
};
