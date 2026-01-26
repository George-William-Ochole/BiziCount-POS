import { useState, useCallback, useEffect } from 'react';

interface Store {
  id: string;
  name: string;
  location: string;
  managerId?: string;
  phone?: string;
  email?: string;
}

export function useStores() {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchStores = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/stores');
      if (!response.ok) throw new Error('Failed to fetch stores');
      const data = await response.json();
      setStores(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createStore = useCallback(async (storeData: any) => {
    try {
      setLoading(true);
      const response = await fetch('/api/stores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(storeData),
      });
      if (!response.ok) throw new Error('Failed to create store');
      const data: Store = await response.json();
      setStores([...stores, data]);
      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [stores]);

  const updateStore = useCallback(async (id: string, storeData: any) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/stores/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(storeData),
      });
      if (!response.ok) throw new Error('Failed to update store');
      const data: Store = await response.json();
      setStores(stores.map((s: Store) => s.id === id ? data : s));
      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [stores]);

  const deleteStore = useCallback(async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/stores/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete store');
      setStores(stores.filter((s: Store) => s.id !== id));
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [stores]);

  useEffect(() => {
    fetchStores();
  }, [fetchStores]);

  return { stores, loading, error, createStore, updateStore, deleteStore, fetchStores };
}
