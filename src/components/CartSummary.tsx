import { Alert, Button, Card, Divider, Flex, Typography } from 'antd';
import { selectProductsTotal, selectTotal, useCartStore } from '../store/useCartStore';
import { formatCurrency } from '../utils/formatCurrency';

const { Text } = Typography;

interface CartSummaryProps {
  /** Si se envía, muestra el botón (Dulcería: "Continuar"). En Pago se usa sin botón. */
  actionLabel?: string;
  onAction?: () => void;
}

export default function CartSummary({ actionLabel, onAction }: CartSummaryProps) {
  const items = useCartStore((state) => state.items);
  const premiere = useCartStore((state) => state.selectedPremiere);
  const ticketPrice = useCartStore((state) => state.ticketPrice);
  const productsTotal = useCartStore(selectProductsTotal);
  const total = useCartStore(selectTotal);

  // Para pagar: película elegida, precio de entrada cargado y al menos un producto
  const canContinue = items.length > 0 && premiere !== null && ticketPrice !== null;

  return (
    <Card title="Tu pedido" style={{ position: 'sticky', top: 88 }}>
      {/* 1 entrada por compra */}
      <Flex justify="space-between" gap={16}>
        <Text>1 × Entrada{premiere ? ` — ${premiere.title}` : ''}</Text>
        <Text>{ticketPrice === null ? '—' : formatCurrency(ticketPrice)}</Text>
      </Flex>

      {!premiere && (
        <Alert type="warning" showIcon title="Elige una película en Home para continuar." style={{ marginTop: 12 }} />
      )}

      <Divider style={{ margin: '16px 0' }} />

      {items.length === 0 ? (
        <Text type="secondary">Agrega al menos un producto de dulcería.</Text>
      ) : (
        <Flex vertical gap={8}>
          {items.map((item) => (
            <Flex key={item.productId} justify="space-between" gap={16}>
              <Text>{item.quantity} × {item.name}</Text>
              <Text>{formatCurrency(item.price * item.quantity)}</Text>
            </Flex>
          ))}
          <Flex justify="space-between">
            <Text type="secondary">Subtotal dulcería</Text>
            <Text type="secondary">{formatCurrency(productsTotal)}</Text>
          </Flex>
        </Flex>
      )}

      <Divider style={{ margin: '16px 0' }} />
      <Flex justify="space-between">
        <Text strong style={{ fontSize: 18 }}>Total</Text>
        <Text strong style={{ fontSize: 18 }}>{formatCurrency(total)}</Text>
      </Flex>

      {actionLabel && (
        <Button type="primary" size="large" block style={{ marginTop: 16 }} disabled={!canContinue} onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </Card>
  );
}
