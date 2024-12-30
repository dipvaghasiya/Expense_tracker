import React from 'react';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { getTransactions } from '../services/api';

function GenerateReport({ filters }) {
  const generatePDF = async () => {
    try {
      const response = await getTransactions();
      const transactions = response.data;

      // Filter transactions based on the date range
      const filteredTransactions = transactions.filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        const startDate = new Date(filters.startDate);
        const endDate = new Date(filters.endDate);
        return transactionDate >= startDate && transactionDate <= endDate;
      });

      const doc = new jsPDF();
      doc.text('Transaction Report', 14, 16);
      doc.setFontSize(12);

      const tableColumn = ['Date', 'Description', 'Category', 'Type', 'Amount'];
      const tableRows = [];

      filteredTransactions.forEach((transaction) => {
        const transactionData = [
          new Date(transaction.date).toLocaleDateString(),
          transaction.description || 'No description',
          transaction.category?.name || 'Uncategorized',
          transaction.type,
          `₹${transaction.amount.toFixed(2)}`.replace(/^\D+/g, ''),
        ];
        tableRows.push(transactionData);
      });

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 20,
      });

      doc.save('transaction_report.pdf');
    } catch (err) {
      console.error('Error generating PDF:', err);
    }
  };

  return (
    <button
      onClick={generatePDF}
      className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-indigo-700"
    >
      Generate PDF Report
    </button>
  );
}

export default GenerateReport; 