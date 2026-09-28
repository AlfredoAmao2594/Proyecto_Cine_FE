import useFetch from '../hooks/useFetch';
import { Flex, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';
import type { Premiere } from '../types/api';
import { ROUTES } from '../app/routes';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessageProps';
import PremiereItem from '../components/PremiereItem';
import { getPremieres } from '../api/premieresApi';



export default function HomePage() {
  const navigate = useNavigate();
  const selectPremiere = useCartStore((state) => state.selectPremiere);
  const { data: premieres, loading, error, reload } = useFetch(getPremieres);

  const handleSelect = (premiere: Premiere) => {
    selectPremiere({ id: premiere.id, title: premiere.title });
    navigate(ROUTES.LOGIN);
  };

  if (loading) return <Loader text="Cargando estrenos..." />;
  if (error) return <ErrorMessage message={error} onRetry={reload} />;

  return (
    <>
      <Typography.Title level={2}>Estrenos</Typography.Title>
      <Flex vertical gap={24}>
        {(premieres ?? []).map((premiere: Premiere) => (
          <PremiereItem key={premiere.id} premiere={premiere} onSelect={handleSelect} />
        ))}
      </Flex>
    </>
  );
}
