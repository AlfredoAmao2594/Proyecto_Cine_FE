import useFetch from '../hooks/useFetch';
import { Col, Row, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../api/candyApi';
import ErrorMessage from '../components/ErrorMessageProps';
import Loader from '../components/Loader';
import ProductCard from '../components/ProductCard';
import CartSummary from '../components/CartSummary';
import { ROUTES } from '../app/routes';
import useTicketPrice from '../store/useTicketPrice';


export default function CandyStorePage() {
  const navigate = useNavigate();
  const { data: products, loading, error, reload } = useFetch(getProducts);
  useTicketPrice();

  if (loading) return <Loader text="Cargando dulcería..." />;
  if (error) return <ErrorMessage message={error} onRetry={reload} />;

  return (
    <>
      <Typography.Title level={2}>Dulcería</Typography.Title>
      <Row gutter={[24, 24]} align="top">
        <Col xs={24} md={16}>
          <Row gutter={[16, 16]}>
            {(products ?? []).map((product) => (
              <Col key={product.id} xs={24} sm={12}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </Col>
        <Col xs={24} md={8}>
          <CartSummary actionLabel="Continuar" onAction={() => navigate(ROUTES.PAYMENT)} />
        </Col>
      </Row>
    </>
  );
}
