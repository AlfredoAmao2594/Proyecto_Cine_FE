import httpClient from './httpClient';
import type { ApiResponse, Session } from '../types/api';

export const loginGuest = async (): Promise<Session> => {
  const response = await httpClient.post<ApiResponse<Session>>('/auth/guest');
  return response.data.data;
};

export interface SessionInfo {
  sub: string;
  name: string;
  role: Session['role'];
}

/** Valida que el token siga vigente. */
export const getSession = async (): Promise<SessionInfo> => {
  const response = await httpClient.get<ApiResponse<SessionInfo>>('/auth/me');
  return response.data.data;
};