import React, { useState, useEffect } from 'react';
import Navbar from '../components/NavBar';
import SummaryCards from '../components/SummaryCard';
import IncomeExpenseChart from '../components/IncomeExpenseChart';
import CategoryWiseChart from '../components/CategoryWiseChart';
import { useAuth } from '../context/AuthContext';
import { getSummary } from '../services/api';

function DashboardPage() {
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0
  });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchSummary = async () => {
    try {
      const response = await getSummary();
      setSummary(response.data);
    } catch (error) {
      console.error('Error fetching summary:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, [user]);

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

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <IncomeExpenseChart />
          <CategoryWiseChart />
        </div>
      </main>
    </div>
  );
}

export default DashboardPage;
