import { useEffect } from 'react';
import { getTicketPrice } from '../api/paymentApi';
import { useCartStore } from './useCartStore';

/**
 * Carga el precio de la entrada desde el backend (complete-service) al entrar a Dulcería o Pago
 * y lo guarda en el carrito. Así el front muestra el mismo precio que el backend cobra.
 */
export default function useTicketPrice(): number | null {
  const ticketPrice = useCartStore((state) => state.ticketPrice);
  const setTicketPrice = useCartStore((state) => state.setTicketPrice);

  useEffect(() => {
    getTicketPrice()
      .then(setTicketPrice)
      .catch(() => {
        // Si falla, ticketPrice queda en null y CartSummary no deja continuar
      });
  }, [setTicketPrice]);

  return ticketPrice;
}
