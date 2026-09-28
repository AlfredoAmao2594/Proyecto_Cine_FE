import { useState } from 'react';
import { App, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { loginGuest } from '../api/authApi';
import { ROUTES } from '../app/routes';



interface LocationState {
  from?: string;
}

export default function GuestLoginButton() {
  const [loading, setLoading] = useState(false);
  const loginSuccess = useAuthStore((state) => state.loginSuccess);
  const navigate = useNavigate();
  const location = useLocation();
  const { message } = App.useApp();

  const handleClick = async () => {
    setLoading(true);
    try {
      const session = await loginGuest();
      loginSuccess(session);
      const from = (location.state as LocationState | null)?.from;
      navigate(from ?? ROUTES.CANDYSTORE, { replace: true });
    } catch (error) {
      message.error(error instanceof Error ? error.message : 'No se pudo ingresar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button type="primary" size="large" block icon={<UserOutlined />} loading={loading} onClick={handleClick}>
      Invitado
    </Button>
  );
}