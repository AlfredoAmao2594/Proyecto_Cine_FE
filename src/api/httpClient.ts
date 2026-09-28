import axios, { type AxiosError } from 'axios';
import ApiError from './ApiError';
import type { ApiResponse } from '../types/api';
import { useAuthStore } from '../store/useAuthStore';

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 40000, 
  headers: { 'Content-Type': 'application/json' },
});


httpClient.interceptors.request.use((config) => {
  const { token } = useAuthStore.getState();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError<Partial<ApiResponse<unknown>>>) => {
    const status = error.response?.status;
    const body = error.response?.data;

    let message = body?.message;
    if (!message) {
      message = error.code === 'ECONNABORTED'
        ? 'El servidor tardó demasiado en responder'
        : 'No se pudo conectar con el servidor';
    }

    if (status === 401) {
      useAuthStore.getState().logout();
      if (!window.location.pathname.startsWith('/login')) {
        window.location.assign('/login?expired=1');
      }
    }

    return Promise.reject(new ApiError(message, status, body?.code));
  }
);

export default httpClient;