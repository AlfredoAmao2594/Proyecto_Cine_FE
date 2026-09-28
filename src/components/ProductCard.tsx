import { Card, Flex, Tag, Typography } from 'antd';

import QuantitySelector from './QuantitySelector';
import type { Product } from '../types/api';
import { MAX_QUANTITY, selectQuantityOf, useCartStore } from '../store/useCartStore';
import ImageWithFallback from './ImageWithFallback';
import { formatCurrency } from '../utils/formatCurrency';


const { Text, Paragraph } = Typography;

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const quantity = useCartStore(selectQuantityOf(product.id));
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <Card styles={{ body: { padding: 0 } }} style={{ height: '100%', overflow: 'hidden' }}>
      <Flex style={{ height: '100%' }}>
        <div style={{ width: 110, flexShrink: 0 }}>
          <ImageWithFallback src={product.imageUrl} alt={product.name} style={{ height: '100%' }} />
        </div>
        <Flex vertical style={{ padding: 16, flex: 1 }}>
          <Tag style={{ alignSelf: 'flex-start' }}>{product.category}</Tag>
          <Text strong style={{ marginTop: 8 }}>{product.name}</Text>
          <Paragraph type="secondary" style={{ flex: 1, marginBottom: 8 }}>{product.description}</Paragraph>
          <Flex justify="space-between" align="center">
            <Text strong style={{ fontSize: 18 }}>{formatCurrency(product.price)}</Text>
            <QuantitySelector
              value={quantity}
              max={MAX_QUANTITY}
              label={product.name}
              onIncrement={() => addItem(product)}
              onDecrement={() => removeItem(product.id)}
            />
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}