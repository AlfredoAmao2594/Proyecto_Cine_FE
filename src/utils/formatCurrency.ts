const formatter = new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' });

/** 32.5 → "S/ 32.50" */
export const formatCurrency = (value: number | null | undefined): string => formatter.format(value ?? 0);