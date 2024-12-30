import React, { useState, useEffect } from 'react';
import Navbar from '../components/NavBar';
import CategoryManager from '../components/CategoryManager';
import { getCategories } from '../services/api';

function ManageCategoriesPage() {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto py-6 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Manage Categories</h1>
        <CategoryManager categories={categories} onCategoryChange={fetchCategories} />
      </div>
    </div>
  );
}

export default ManageCategoriesPage; 