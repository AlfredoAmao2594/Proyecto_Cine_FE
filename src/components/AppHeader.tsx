import { Badge, Button, Flex, Layout, Menu, Tag, type MenuProps } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { selectIsAuthenticated, useAuthStore } from '../store/useAuthStore';
import { selectItemCount, useCartStore } from '../store/useCartStore';
import { ROUTES } from '../app/routes';



export default function AppHeader() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const name = useAuthStore((state) => state.name);
  const isAuthenticated = useAuthStore(selectIsAuthenticated);
  const logout = useAuthStore((state) => state.logout);
  const itemCount = useCartStore(selectItemCount);
  const clearCart = useCartStore((state) => state.clearCart);

  const handleLogout = () => {
    logout();
    clearCart();
    navigate(ROUTES.HOME);
  };

  const items: MenuProps['items'] = [
    { key: ROUTES.HOME, label: <Link to={ROUTES.HOME}>Home</Link> },
    {
      key: ROUTES.CANDYSTORE,
      label: (
        <Link to={ROUTES.CANDYSTORE}>
          <Badge count={itemCount} size="small" offset={[10, -2]} color="#e6007e">
            <span style={{ color: 'inherit' }}>Dulcería</span>
          </Badge>
        </Link>
      ),
    },
    { key: ROUTES.LOGIN, label: <Link to={ROUTES.LOGIN}>Login</Link> },
  ];

  return (
    <Layout.Header style={{ position: 'sticky', top: 0, zIndex: 10, display: 'flex', alignItems: 'center', gap: 16 }}>
      <Link to={ROUTES.HOME} style={{ color: '#fff', fontWeight: 700, fontSize: 20, whiteSpace: 'nowrap' }}>
        CineApp
      </Link>

      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={[pathname]}
        items={items}
        style={{ flex: 1, minWidth: 0, justifyContent: 'flex-end' }}
      />

      {isAuthenticated && (
        <Flex align="center" gap={8}>
          <Tag color="magenta">{name}</Tag>
          <Button type="text" icon={<LogoutOutlined />} style={{ color: '#fff' }} onClick={handleLogout}>
            Salir
          </Button>
        </Flex>
      )}
    </Layout.Header>
  );
}