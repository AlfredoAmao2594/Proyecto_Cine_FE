import { Button, Space, Typography } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';

interface QuantitySelectorProps {
  value: number;
  max: number;
  label: string;
  onIncrement: () => void;
  onDecrement: () => void;
}


export default function QuantitySelector({ value, max, label, onIncrement, onDecrement }: QuantitySelectorProps) {
  return (
    <Space>
      <Button
        shape="circle"
        icon={<MinusOutlined />}
        aria-label={`Quitar ${label}`}
        disabled={value === 0}
        onClick={onDecrement}
      />
      <Typography.Text strong style={{ minWidth: 20, display: 'inline-block', textAlign: 'center' }}>
        {value}
      </Typography.Text>
      <Button
        shape="circle"
        type="primary"
        icon={<PlusOutlined />}
        aria-label={`Agregar ${label}`}
        disabled={value >= max}
        onClick={onIncrement}
      />
    </Space>
  );
}