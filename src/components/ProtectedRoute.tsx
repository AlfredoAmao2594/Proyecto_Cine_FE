import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { selectIsAuthenticated, useAuthStore } from '../store/useAuthStore';
import { selectItemCount, useCartStore } from '../store/useCartStore';
import { ROUTES } from '../app/routes';



interface ProtectedRouteProps {
  children: ReactNode;
  /** Si es true, además exige película elegida y productos en el carrito (pantalla Pago). */
  requireCart?: boolean;
}

export default function ProtectedRoute({ children, requireCart = false }: ProtectedRouteProps) {
  const isAuthenticated = useAuthStore(selectIsAuthenticated);
  const itemCount = useCartStore(selectItemCount);
  const hasPremiere = useCartStore((state) => state.selectedPremiere !== null);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace state={{ from: location.pathname }} />;
  }
  if (requireCart && (itemCount === 0 || !hasPremiere)) {
    return <Navigate to={ROUTES.CANDYSTORE} replace />;
  }
  return children;
}