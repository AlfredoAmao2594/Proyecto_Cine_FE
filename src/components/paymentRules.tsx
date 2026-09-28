import type { FormRule } from 'antd';
import type { DocumentType } from '../types/api';
import { isExpired, isValidLuhn, onlyDigits } from '../utils/validators';


export interface PaymentFormValues {
  cardNumber: string;
  expiration: string;
  cvv: string;
  cardHolderName: string;
  email: string;
  fullName: string;
  documentType: DocumentType;
  documentNumber: string;
}

export const DOCUMENT_TYPES: { value: DocumentType; label: string }[] = [
  { value: 'DNI', label: 'DNI' },
  { value: 'CE', label: 'Carné de extranjería' },
  { value: 'PASAPORTE', label: 'Pasaporte' },
];

const DOCUMENT_PATTERNS: Record<DocumentType, { regex: RegExp; message: string }> = {
  DNI: { regex: /^\d{8}$/, message: 'El DNI tiene 8 dígitos' },
  CE: { regex: /^[A-Za-z0-9]{8,12}$/, message: 'Entre 8 y 12 caracteres' },
  PASAPORTE: { regex: /^[A-Za-z0-9]{6,12}$/, message: 'Entre 6 y 12 caracteres alfanuméricos' },
};

export const paymentRules: Record<keyof PaymentFormValues, FormRule[]> = {
  cardNumber: [
    { required: true, message: 'Ingresa el número de tarjeta' },
    {
      validator: (_, value?: string) => {
        const digits = onlyDigits(value);
        if (!digits) return Promise.resolve();
        if (digits.length !== 16) return Promise.reject(new Error('Debe tener 16 dígitos'));
        if (!isValidLuhn(digits)) return Promise.reject(new Error('Número de tarjeta inválido'));
        return Promise.resolve();
      },
    },
  ],
  expiration: [
    { required: true, message: 'Ingresa la fecha de expiración' },
    { pattern: /^(0[1-9]|1[0-2])\/\d{2}$/, message: 'Formato MM/AA' },
    {
      validator: (_, value?: string) =>
        value && /^\d{2}\/\d{2}$/.test(value) && isExpired(value)
          ? Promise.reject(new Error('La tarjeta está vencida'))
          : Promise.resolve(),
    },
  ],
  cvv: [
    { required: true, message: 'Ingresa el CVV' },
    { pattern: /^\d{3,4}$/, message: 'Debe tener 3 o 4 dígitos' },
  ],
  cardHolderName: [
    { required: true, whitespace: true, message: 'Ingresa el nombre del titular' },
    { max: 100, message: 'Máximo 100 caracteres' },
  ],
  email: [
    { required: true, message: 'Ingresa tu correo' },
    { type: 'email', message: 'Correo inválido' },
  ],
  fullName: [
    { required: true, whitespace: true, message: 'Ingresa tu nombre' },
    { pattern: /^[A-Za-zÁÉÍÓÚÜáéíóúüÑñ ]+$/, message: 'Solo letras y espacios' },
    { max: 150, message: 'Máximo 150 caracteres' },
  ],
  documentType: [{ required: true, message: 'Elige un tipo de documento' }],
  documentNumber: [
    { required: true, whitespace: true, message: 'Ingresa el número de documento' },
    // Regla como función: AntD le pasa el formulario para leer el tipo de documento elegido
    ({ getFieldValue }) => ({
      validator: (_, value?: string) => {
        const rule = DOCUMENT_PATTERNS[getFieldValue('documentType') as DocumentType];
        if (!value || !rule || rule.regex.test(value.trim())) return Promise.resolve();
        return Promise.reject(new Error(rule.message));
      },
    }),
  ],
};