import { useState, useCallback, useEffect } from 'react';

interface Transaction {
  id: string;
  transactionNumber: string;
  storeId: string;
  userId: string;
  customerId?: string;
  totalAmount: number;
  payment: string;
  status: string;
}

export function useTransactions(storeId?: string) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const url = storeId ? `/api/transactions?storeId=${storeId}` : '/api/transactions';
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch transactions');
      const data: Transaction[] = await response.json();
      setTransactions(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [storeId]);

  const createTransaction = useCallback(async (transactionData: any) => {
    try {
      setLoading(true);
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transactionData),
      });
      if (!response.ok) throw new Error('Failed to create transaction');
      const data = await response.json();
      setTransactions([data, ...transactions]);
      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [transactions]);

  const voidTransaction = useCallback(async (id: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/transactions/${id}?action=void`, {
        method: 'POST',
      });
      if (!response.ok) throw new Error('Failed to void transaction');
      const data: Transaction = await response.json();
      setTransactions(transactions.map((t: Transaction) => t.id === id ? data : t));
      return data;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [transactions]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  return { transactions, loading, error, createTransaction, voidTransaction, fetchTransactions };
}
