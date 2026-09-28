import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from './app/routes';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './page/HomePage';
import LoginPage from './page/LoginPage';
import CandyStorePage from './page/CandyStorePage';
import PaymentPage from './page/PaymentPage';


export default function AppRouter() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route
        path={ROUTES.CANDYSTORE}
        element={<ProtectedRoute><CandyStorePage /></ProtectedRoute>}
      />
      <Route
        path={ROUTES.PAYMENT}
        element={<ProtectedRoute requireCart><PaymentPage /></ProtectedRoute>}
      />
      <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
    </Routes>
  );
}