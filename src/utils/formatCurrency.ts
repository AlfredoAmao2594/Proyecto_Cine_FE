const formatter = new Intl.NumberFormat('es-PE', { style: 'currency', currency: 'PEN' });


export const formatCurrency = (value: number | null | undefined): string => formatter.format(value ?? 0);