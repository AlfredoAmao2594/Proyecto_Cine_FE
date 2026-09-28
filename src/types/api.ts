export interface ApiResponse<T> {
  code: string;
  message: string;
  data: T;
}

export interface Premiere {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  releaseDate: string | null;
}

export type Role = 'GUEST' | 'USER';

export interface Session {
  token: string;
  tokenType: string;
  expiresIn: number;
  name: string;
  email: string | null;
  role: Role;
}

export type ProductCategory = 'COMBO' | 'BEBIDA' | 'SNACK';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string | null;
  category: ProductCategory;
}

export type DocumentType = 'DNI' | 'CE' | 'PASAPORTE';
export type PaymentState = 'APPROVED' | 'DECLINED' | 'PENDING' | 'ERROR';

export interface CartItemRequest {
  productId: string;
  quantity: number;
}


export interface PaymentRequest {
  cardNumber: string;
  expirationDate: string; // "YYYY/MM"
  cvv: string;
  cardHolderName: string;
  email: string;
  fullName: string;
  documentType: DocumentType;
  documentNumber: string;
  items: CartItemRequest[];
}

export interface PaymentResult {
  state: PaymentState;
  transactionId?: string;
  orderId?: number;
  operationDate?: number; // milisegundos
  message: string;
  amount: number;
  referenceCode: string;
}

export interface CompleteRequest {
  email: string;
  name: string;
  dni: string;
  operationDate: number;
  transactionId: string;
  documentType?: DocumentType;
  orderId?: number;
  items?: CartItemRequest[];
}

export interface CompleteResult {
  purchaseId: string | null;
}

/** Precio de la entrada de cine (1 por compra), configurado en complete-service. */
export interface TicketPrice {
  price: number;
}
