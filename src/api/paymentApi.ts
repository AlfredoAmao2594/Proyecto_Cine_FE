import httpClient from './httpClient';
import type {
  ApiResponse,
  CompleteRequest,
  CompleteResult,
  PaymentRequest,
  PaymentResult,
  TicketPrice,
} from '../types/api';

/** Devuelve la respuesta completa: el flujo necesita el code ("0" | "1") y el mensaje de PayU. */
export const pay = async (payload: PaymentRequest): Promise<ApiResponse<PaymentResult>> => {
  const response = await httpClient.post<ApiResponse<PaymentResult>>('/payments', payload);
  return response.data;
};

/** code "0" = registrada, "1" = ya existía. */
export const completePurchase = async (payload: CompleteRequest): Promise<ApiResponse<CompleteResult>> => {
  const response = await httpClient.post<ApiResponse<CompleteResult>>('/complete', payload);
  return response.data;
};
/** Precio de la entrada. Solo se MUESTRA en el front: el cobro lo calcula el backend. */
export const getTicketPrice = async (): Promise<number> => {
  const response = await httpClient.get<ApiResponse<TicketPrice>>('/payments/ticket-price');
  return response.data.data.price;
};
