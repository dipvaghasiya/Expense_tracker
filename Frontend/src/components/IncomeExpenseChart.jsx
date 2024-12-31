import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { getTransactions } from '../services/api';

// Register the necessary components
ChartJS.register(ArcElement, Tooltip, Legend);

function IncomeExpenseChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTransactions();
        const transactions = response.data;

        const incomeTotal = transactions
          .filter((transaction) => transaction.type === 'income')
          .reduce((sum, transaction) => sum + transaction.amount, 0);

        const expenseTotal = transactions
          .filter((transaction) => transaction.type === 'expense')
          .reduce((sum, transaction) => sum + transaction.amount, 0);

        if (incomeTotal > 0 || expenseTotal > 0) {
          setChartData({
            labels: ['Income', 'Expenses'],
            datasets: [
              {
                data: [incomeTotal, expenseTotal],
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
                borderWidth: 1,
              },
            ],
          });
        } else {
          setChartData(null);
        }
      } catch (err) {
        console.error('Error fetching transactions:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow h-full">
      <h2 className="text-xl font-semibold mb-4">Income vs Expenses</h2>
      <div className="relative w-full h-64 md:h-96">
        {chartData ? (
          <Pie data={chartData} options={{ maintainAspectRatio: false }} />
        ) : (
          <p className="text-gray-500">No data available for the chart.</p>
        )}
      </div>
    </div>
  );
}

export default IncomeExpenseChart; 