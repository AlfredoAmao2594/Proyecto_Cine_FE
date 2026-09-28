import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { Product } from '../types/api';

export const MAX_QUANTITY = 20;

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface SelectedPremiere {
  id: string;
  title: string;
}

interface CartState {
  items: CartItem[];
  selectedPremiere: SelectedPremiere | null;
  /** Precio de 1 entrada, leído del backend (null mientras no se carga). */
  ticketPrice: number | null;
  selectPremiere: (premiere: SelectedPremiere) => void;
  setTicketPrice: (price: number) => void;
  addItem: (product: Pick<Product, 'id' | 'name' | 'price'>) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      selectedPremiere: null,
      ticketPrice: null,

      selectPremiere: (premiere) => set({ selectedPremiere: premiere }),

      setTicketPrice: (price) => set({ ticketPrice: price }),

      addItem: (product) =>
        set((state) => {
          const exists = state.items.some((i) => i.productId === product.id);
          if (exists) {
            return {
              items: state.items.map((i) =>
                i.productId === product.id ? { ...i, quantity: Math.min(i.quantity + 1, MAX_QUANTITY) } : i
              ),
            };
          }
          return {
            items: [...state.items, { productId: product.id, name: product.name, price: product.price, quantity: 1 }],
          };
        }),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items
            .map((i) => (i.productId === productId ? { ...i, quantity: i.quantity - 1 } : i))
            .filter((i) => i.quantity > 0),
        })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cine-cart',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
// ---- Selectores: funciones puras, reutilizables en componentes y pruebas ----
export const selectItemCount = (state: CartState): number =>
  state.items.reduce((sum, i) => sum + i.quantity, 0);

/** Solo dulcería. En céntimos para evitar errores de decimales (0.1 + 0.2 = 0.30000000000000004). */
export const selectProductsTotal = (state: CartState): number =>
  state.items.reduce((sum, i) => sum + Math.round(i.price * 100) * i.quantity, 0) / 100;

/** Dulcería + 1 entrada. Es lo que se muestra; el backend recalcula y cobra lo mismo. */
export const selectTotal = (state: CartState): number =>
  (Math.round(selectProductsTotal(state) * 100) + Math.round((state.ticketPrice ?? 0) * 100)) / 100;

export const selectQuantityOf = (productId: string) => (state: CartState): number =>
  state.items.find((i) => i.productId === productId)?.quantity ?? 0;