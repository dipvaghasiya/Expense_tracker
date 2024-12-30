import { useState, useEffect } from "react";
import Navbar from "../components/NavBar";
import SummaryCards from "../components/SummaryCard";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import CategoryManager from "../components/CategoryManager";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

function DashboardPage() {
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
  });
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const { user } = useAuth();

  const fetchSummary = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/transactions/summary",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setSummary(response.data);
    } catch (error) {
      console.error("Error fetching summary:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, [user, refreshTrigger]);

  const handleTransactionAdded = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <div className="text-xl">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="max-w-7xl mx-auto py-6 px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>

        <SummaryCards summary={summary} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Add Transaction</h2>
            <TransactionForm onTransactionAdded={handleTransactionAdded} />
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <TransactionList refreshTrigger={refreshTrigger} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow mt-6">
          <CategoryManager refreshTrigger={refreshTrigger} />
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;
