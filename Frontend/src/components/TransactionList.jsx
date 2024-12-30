import React, { useEffect, useState } from 'react';
import { getTransactions, deleteTransaction } from '../services/api';

function TransactionList({ refreshTrigger, onTransactionChange, filters }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await getTransactions();
        let filteredTransactions = response.data;

        if (filters.dateRange !== 'all') {
          const startDate = new Date(filters.startDate);
          const endDate = new Date(filters.endDate);
          filteredTransactions = filteredTransactions.filter(
            (transaction) => {
              const transactionDate = new Date(transaction.date);
              return transactionDate >= startDate && transactionDate <= endDate;
            }
          );
        }

        if (filters.category) {
          filteredTransactions = filteredTransactions.filter(
            (transaction) => transaction.category._id === filters.category
          );
        }

        if (filters.type) {
          filteredTransactions = filteredTransactions.filter(
            (transaction) => transaction.type === filters.type
          );
        }

        setTransactions(filteredTransactions);
      } catch (err) {
        console.error('Error fetching transactions:', err);
      }
    };

    fetchTransactions();
  }, [refreshTrigger, filters]);

  const handleDeleteTransaction = async (transactionId) => {
    try {
      await deleteTransaction(transactionId);
      onTransactionChange(); // Notify parent component to refresh
    } catch (err) {
      console.error('Error deleting transaction:', err);
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction._id}
            className="border p-4 rounded-lg shadow-sm"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">
                  {transaction.description || 'No description'}
                </p>
                <p className="text-sm text-gray-500">
                  Category: {transaction.category?.name || 'Uncategorized'}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(transaction.date).toLocaleDateString()}
                </p>
              </div>
              <div
                className={`font-semibold ${
                  transaction.type === 'income'
                    ? 'text-green-600'
                    : 'text-red-600'
                }`}
              >
                {transaction.type === 'income' ? '+' : '-'}₹
                {Math.abs(transaction.amount).toFixed(2)}
              </div>
              <button
                onClick={() => handleDeleteTransaction(transaction._id)}
                className="bg-red-600 text-white py-1 px-3 rounded-md shadow-sm hover:bg-red-700 mt-2"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TransactionList;
