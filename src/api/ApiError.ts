
export default class ApiError extends Error {
  readonly status?: number; // código HTTP (400, 401, 503...) o undefined si no hubo respuesta
  readonly code?: string;   // "code" del JSON del backend

  constructor(message: string, status?: number, code?: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}