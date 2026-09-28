import { Flex, Spin, Typography } from 'antd';

interface LoaderProps {
  text?: string;
}

export default function Loader({ text = 'Cargando...' }: LoaderProps) {
  return (
    <Flex vertical align="center" gap={16} style={{ padding: '64px 0' }}>
      <Spin size="large" />
      <Typography.Text type="secondary">{text}</Typography.Text>
    </Flex>
  );
}