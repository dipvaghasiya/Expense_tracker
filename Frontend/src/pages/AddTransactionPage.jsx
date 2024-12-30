import React, { useState, useEffect } from 'react';
import Navbar from '../components/NavBar';
import TransactionForm from '../components/TransactionForm';
import { getCategories } from '../services/api';

function AddTransactionPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto py-6 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Add Transaction</h1>
        <TransactionForm categories={categories} onTransactionAdded={() => {}} />
      </div>
    </div>
  );
}

export default AddTransactionPage; 