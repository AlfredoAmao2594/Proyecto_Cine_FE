import { useEffect } from 'react';
import { getTicketPrice } from '../api/paymentApi';
import { useCartStore } from './useCartStore';

export default function useTicketPrice(): number | null {
  const ticketPrice = useCartStore((state) => state.ticketPrice);
  const setTicketPrice = useCartStore((state) => state.setTicketPrice);

  useEffect(() => {
    getTicketPrice()
      .then(setTicketPrice)
      .catch(() => {

      });
  }, [setTicketPrice]);

  return ticketPrice;
}
