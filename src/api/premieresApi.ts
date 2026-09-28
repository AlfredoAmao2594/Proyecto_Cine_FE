import httpClient from './httpClient';
import type { ApiResponse, Premiere } from '../types/api';

export const getPremieres = async (): Promise<Premiere[]> => {
  const response = await httpClient.get<ApiResponse<Premiere[]>>('/premieres');
  return response.data.data;
};