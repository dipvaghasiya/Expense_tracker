import { useState, useEffect } from "react";
import { getTransactions } from "../services/api";

function TransactionList({ refreshTrigger }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await getTransactions();
        setTransactions(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTransactions();
  }, [refreshTrigger]);

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
                {transaction.type === "income" ? "+" : "-"}$
                {Math.abs(transaction.amount).toFixed(2)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TransactionList;
