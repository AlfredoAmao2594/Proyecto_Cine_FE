import { Alert, Button, Card, Divider, Flex, Tag, Typography } from 'antd';
import { GoogleOutlined } from '@ant-design/icons';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { selectIsAuthenticated, useAuthStore } from '../store/useAuthStore';
import { useCartStore } from '../store/useCartStore';
import { ROUTES } from '../app/routes';
import GuestLoginButton from '../components/GuestLoginButton';


export default function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isAuthenticated = useAuthStore(selectIsAuthenticated);
  const name = useAuthStore((state) => state.name);
  const premiere = useCartStore((state) => state.selectedPremiere);

  return (
    <Card style={{ maxWidth: 440, margin: '0 auto' }}>
      <Typography.Title level={3} style={{ marginTop: 0 }}>Iniciar sesión</Typography.Title>

      {premiere && <Tag color="blue" style={{ marginBottom: 16 }}>Película: {premiere.title}</Tag>}

      {searchParams.get('expired') && (
        <Alert type="warning" showIcon title="Tu sesión expiró. Vuelve a ingresar." style={{ marginBottom: 16 }} />
      )}

      {isAuthenticated ? (
        <Flex vertical gap={16}>
          <Alert type="success" showIcon title={`Ingresaste como ${name}.`} />
          <Button type="primary" size="large" onClick={() => navigate(ROUTES.CANDYSTORE)}>
            Continuar a Dulcería
          </Button>
        </Flex>
      ) : (
        <Flex vertical>
          <Button size="large" block icon={<GoogleOutlined />} disabled>
            Google (próximamente)
          </Button>
          <Divider plain>o</Divider>
          <GuestLoginButton />
        </Flex>
      )}
    </Card>
  );
}