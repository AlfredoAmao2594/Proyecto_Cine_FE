import httpClient from './httpClient';
import type { ApiResponse, Product } from '../types/api';

export const getProducts = async (): Promise<Product[]> => {
  const response = await httpClient.get<ApiResponse<Product[]>>('/candystore');
  return response.data.data;
};