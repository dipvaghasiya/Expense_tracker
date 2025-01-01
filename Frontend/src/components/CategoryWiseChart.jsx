import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { getTransactions } from "../services/api";

ChartJS.register(ArcElement, Tooltip, Legend);

function CategoryWiseChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTransactions();
        const transactions = response.data;

        const categoryTotals = transactions.reduce((acc, transaction) => {
          const categoryName = transaction.category?.name || "Uncategorized";
          if (!acc[categoryName]) {
            acc[categoryName] = 0;
          }
          acc[categoryName] += transaction.amount;
          return acc;
        }, {});

        const labels = Object.keys(categoryTotals);
        const data = Object.values(categoryTotals);

        setChartData({
          labels,
          datasets: [
            {
              data,
              backgroundColor: labels.map(
                (_, index) => `hsl(${(index * 360) / labels.length}, 70%, 50%)`
              ),
              borderColor: labels.map(
                (_, index) => `hsl(${(index * 360) / labels.length}, 70%, 40%)`
              ),
              borderWidth: 1,
            },
          ],
        });
      } catch (err) {
        console.error("Error fetching transactions:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow h-full">
      <h2 className="text-xl font-semibold mb-4">Transactions by Category</h2>
      <div className="relative w-full h-64 md:h-96">
        {chartData && chartData.datasets[0].data.length > 0 ? (
          <Pie data={chartData} options={{ maintainAspectRatio: false }} />
        ) : (
          <p className="text-gray-500">No data available for the chart.</p>
        )}
      </div>
    </div>
  );
}

export default CategoryWiseChart;
