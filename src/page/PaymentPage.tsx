import { Card, Col, Row, Typography } from 'antd';

import PaymentForm from '../components/PaymentForm';
import usePurchase from '../store/usePurchase';
import CartSummary from '../components/CartSummary';
import { useAuthStore } from '../store/useAuthStore';
import { selectTotal, useCartStore } from '../store/useCartStore';
import type { PaymentFormValues } from '../components/paymentRules';
import useTicketPrice from '../store/useTicketPrice';

export default function PaymentPage() {
  const email = useAuthStore((state) => state.email);
  const name = useAuthStore((state) => state.name);
  const role = useAuthStore((state) => state.role);
  const total = useCartStore(selectTotal);
  const { purchase, submitting } = usePurchase();
  useTicketPrice();

  // Si entró con Google (role USER), correo y nombre llegan precargados, como pide el PDF
  const isGoogleUser = role === 'USER';
  const initialValues: Partial<PaymentFormValues> = {
    documentType: 'DNI',
    email: isGoogleUser && email ? email : undefined,
    fullName: isGoogleUser && name ? name : undefined,
  };

  return (
    <>
      <Typography.Title level={2}>Pago</Typography.Title>
      <Row gutter={[24, 24]} align="top">
        <Col xs={24} md={16}>
          <Card>
            <PaymentForm initialValues={initialValues} total={total} submitting={submitting} onSubmit={purchase} />
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <CartSummary />
        </Col>
      </Row>
    </>
  );
}