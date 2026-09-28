import httpClient from './httpClient';
import type {
  ApiResponse,
  CompleteRequest,
  CompleteResult,
  PaymentRequest,
  PaymentResult,
  TicketPrice,
} from '../types/api';


export const pay = async (payload: PaymentRequest): Promise<ApiResponse<PaymentResult>> => {
  const response = await httpClient.post<ApiResponse<PaymentResult>>('/payments', payload);
  return response.data;
};

export const completePurchase = async (payload: CompleteRequest): Promise<ApiResponse<CompleteResult>> => {
  const response = await httpClient.post<ApiResponse<CompleteResult>>('/complete', payload);
  return response.data;
};

export const getTicketPrice = async (): Promise<number> => {
  const response = await httpClient.get<ApiResponse<TicketPrice>>('/payments/ticket-price');
  return response.data.data.price;
};
