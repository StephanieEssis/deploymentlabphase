import { useState, useEffect, useRef } from 'react';

const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const useApiCache = (key, apiCall, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      // Annuler la requête précédente si elle existe
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Créer un nouveau contrôleur d'annulation
      abortControllerRef.current = new AbortController();

      try {
        setLoading(true);
        setError(null);

        // Vérifier le cache
        const cachedData = cache.get(key);
        if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
          setData(cachedData.data);
          setLoading(false);
          return;
        }

        // Faire l'appel API
        const result = await apiCall(abortControllerRef.current.signal);
        
        // Mettre en cache
        cache.set(key, {
          data: result,
          timestamp: Date.now()
        });

        setData(result);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err);
          console.error('Erreur API:', err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, dependencies);

  const invalidateCache = () => {
    cache.delete(key);
  };

  return { data, loading, error, invalidateCache };
}; 