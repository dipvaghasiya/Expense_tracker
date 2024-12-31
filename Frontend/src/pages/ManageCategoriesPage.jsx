import React, { useState, useEffect } from "react";
import Navbar from "../components/NavBar";
import CategoryManager from "../components/CategoryManager";
import { getCategories } from "../services/api";

function ManageCategoriesPage() {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto py-6 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Manage Categories
        </h1>
        <CategoryManager
          categories={categories}
          onCategoryChange={fetchCategories}
        />
        {categories.length === 0 ? (
          <p className="text-gray-500">No categories available.</p>
        ) : (
          <ul>
            {categories.map((category) => (
              <li key={category._id} className="mb-2">
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ManageCategoriesPage;
