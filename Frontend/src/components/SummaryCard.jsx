function SummaryCards({ summary }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-green-100 p-6 rounded-lg shadow">
        <h3 className="text-green-800 text-lg font-semibold">Total Income</h3>
        <p className="text-2xl font-bold text-green-600">
          ₹{summary.totalIncome || 0}
        </p>
      </div>
      
      <div className="bg-red-100 p-6 rounded-lg shadow">
        <h3 className="text-red-800 text-lg font-semibold">Total Expenses</h3>
        <p className="text-2xl font-bold text-red-600">
          ₹{summary.totalExpense || 0}
        </p>
      </div>
      
      <div className="bg-blue-100 p-6 rounded-lg shadow">
        <h3 className="text-blue-800 text-lg font-semibold">Balance</h3>
        <p className="text-2xl font-bold text-blue-600">
          ₹{(summary.totalIncome - summary.totalExpense) || 0}
        </p>
      </div>
    </div>
  );
}

export default SummaryCards;