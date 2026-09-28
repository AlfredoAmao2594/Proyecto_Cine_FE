
import { completePurchase, pay } from '../api/paymentApi';
import { onlyDigits, toApiExpiration } from '../utils/validators';
import { useState } from 'react';
import { App, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from './useCartStore';
import { formatCurrency } from '../utils/formatCurrency';
import { ROUTES } from '../app/routes';
import type { PaymentFormValues } from '../components/paymentRules';


export default function usePurchase() {
  const navigate = useNavigate();
  const { message, modal, notification } = App.useApp();
  const cartItems = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const [submitting, setSubmitting] = useState(false);

  const showSuccess = (amount: number, transactionId: string) =>
    new Promise<void>((resolve) => {
      modal.success({
        title: '¡Compra correcta!',
        content: (
          <>
            <Typography.Paragraph>Pagaste <strong>{formatCurrency(amount)}</strong>.</Typography.Paragraph>
            <Typography.Text type="secondary">Transacción: {transactionId}</Typography.Text>
          </>
        ),
        okText: 'Volver al inicio',
        onOk: () => resolve(),
      });
    });

  const purchase = async (form: PaymentFormValues) => {
    setSubmitting(true);
    const items = cartItems.map(({ productId, quantity }) => ({ productId, quantity }));

    try {
      const payment = await pay({
        cardNumber: onlyDigits(form.cardNumber),
        expirationDate: toApiExpiration(form.expiration),
        cvv: form.cvv,
        cardHolderName: form.cardHolderName.trim(),
        email: form.email.trim(),
        fullName: form.fullName.trim(),
        documentType: form.documentType,
        documentNumber: form.documentNumber.trim(),
        items,
      });

      const { state, transactionId, operationDate, orderId, amount } = payment.data;
      if (state !== 'APPROVED' || !transactionId || operationDate === undefined) {
        message.error(payment.message || 'El pago fue rechazado');
        return;
      }
      try {
        const result = await completePurchase({
          email: form.email.trim(),
          name: form.fullName.trim(),
          dni: form.documentNumber.trim(),
          documentType: form.documentType,
          operationDate,
          transactionId,
          orderId,
          items,
        });

        if (result.code !== '0' && result.code !== '1') {
          throw new Error(result.message);
        }
      } catch (error) {
        notification.error({
          title: 'Pago aprobado, pero no se pudo registrar la compra',
          description: `${error instanceof Error ? error.message : 'Error'}. Transacción: ${transactionId}`,
          duration: 0,
        });
        return;
      }

      await showSuccess(amount, transactionId);
      navigate(ROUTES.HOME);
      clearCart();
    } catch (error) {
      message.error(error instanceof Error ? error.message : 'No se pudo procesar el pago');
    } finally {
      setSubmitting(false);
    }
  };

  return { purchase, submitting };
}