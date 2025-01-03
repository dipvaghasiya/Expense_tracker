import React, { useEffect, useState } from "react";
import { getTransactions, deleteTransaction } from "../services/api";
import { FaSortUp, FaSortDown } from "react-icons/fa";
import Pagination from "./Pagination";

function TransactionList({ refreshTrigger, onTransactionChange, filters }) {
  const [transactions, setTransactions] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 5;

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await getTransactions();
        let filteredTransactions = response.data;

        if (filters.dateRange !== "all") {
          const startDate = new Date(filters.startDate);
          const endDate = new Date(filters.endDate);
          filteredTransactions = filteredTransactions.filter((transaction) => {
            const transactionDate = new Date(transaction.date);
            return transactionDate >= startDate && transactionDate <= endDate;
          });
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

        filteredTransactions.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
        });

        setTransactions(filteredTransactions);
      } catch (err) {
        console.error("Error fetching transactions:", err);
      }
    };

    fetchTransactions();
  }, [refreshTrigger, filters, sortOrder]);

  const handleDeleteTransaction = async (transactionId) => {
    try {
      await deleteTransaction(transactionId);
      onTransactionChange();
    } catch (err) {
      console.error("Error deleting transaction:", err);
    }
  };

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  const totalPages = Math.ceil(transactions.length / transactionsPerPage);

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        Recent Transactions
        <button
          onClick={toggleSortOrder}
          className="ml-2 text-gray-600 hover:text-gray-800"
        >
          {sortOrder === "asc" ? <FaSortUp /> : <FaSortDown />}
        </button>
      </h2>

      {currentTransactions.length === 0 ? (
        <p className="text-gray-500">No transactions available.</p>
      ) : (
        <div className="space-y-4">
          {currentTransactions.map((transaction) => (
            <div
              key={transaction._id}
              className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-900">
                    {transaction.description || "No description"}
                  </p>
                  <p className="text-sm text-gray-500">
                    Category: {transaction.category?.name || "Uncategorized"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(transaction.date).toLocaleDateString()}
                  </p>
                </div>
                <div
                  className={`font-semibold ${
                    transaction.type === "income"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {transaction.type === "income" ? "+" : "-"}₹
                  {Math.abs(transaction.amount).toFixed(2)}
                </div>
                <button
                  onClick={() => handleDeleteTransaction(transaction._id)}
                  className="bg-red-600 text-white py-1 px-3 rounded-md shadow-sm hover:bg-red-700 mt-2 transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default TransactionList;
