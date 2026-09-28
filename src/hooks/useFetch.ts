import { useCallback, useEffect, useState } from 'react';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  reload: () => Promise<void>;
}

/**
 * Patrón cargando → datos | error → reintentar.
 * @param fetcher función async que devuelve los datos (ej. getPremieres).
 *        Debe ser estable: pásale una función importada, no una flecha nueva en cada render.
 */
export default function useFetch<T>(fetcher: () => Promise<T>): FetchState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setData(await fetcher());
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error inesperado');
    } finally {
      setLoading(false);
    }
  }, [fetcher]);

  useEffect(() => {
    void load();
  }, [load]);

  return { data, loading, error, reload: load };
}
