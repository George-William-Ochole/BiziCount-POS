import { useState, useCallback, useEffect } from 'react';

interface Supplier {
  id: string;
  name: string;
  contactPerson?: string;
  phone?: string;
  email?: string;
  category: string;
  status: string;
}

export function useSuppliers() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSuppliers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/suppliers');
      if (!response.ok) throw new Error('Failed to fetch suppliers');
      const data: Supplier[] = await response.json();
      setSuppliers(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createSupplier = useCallback(async (supplierData: any) => {
    try {
      setLoading(true);
      const response = await fetch('/api/suppliers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(supplierData),
      });
      if (!response.ok) throw new Error('Failed to create supplier');
      const data: Supplier = await response.json();
      setSuppliers([...suppliers, data]);
      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [suppliers]);

  const updateSupplier = useCallback(async (id: string, supplierData: any) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/suppliers/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(supplierData),
      });
      if (!response.ok) throw new Error('Failed to update supplier');
      const data: Supplier = await response.json();
      setSuppliers(suppliers.map((s: Supplier) => s.id === id ? data : s));
      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [suppliers]);

  const deleteSupplier = useCallback(async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/suppliers/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete supplier');
      setSuppliers(suppliers.filter((s: Supplier) => s.id !== id));
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [suppliers]);

  useEffect(() => {
    fetchSuppliers();
  }, [fetchSuppliers]);

  return { suppliers, loading, error, createSupplier, updateSupplier, deleteSupplier, fetchSuppliers };
}
