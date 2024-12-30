import React, { useState, useEffect } from "react";
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../services/api";

function CategoryManager({ refreshTrigger }) {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [editCategory, setEditCategory] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, [refreshTrigger]);

  const handleAddCategory = async () => {
    if (!newCategory) return;
    try {
      const response = await addCategory({ name: newCategory });
      setCategories([...categories, response.data]);
      setNewCategory("");
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
    }
  };

  const handleEditCategory = async (category) => {
    if (!editCategory) return;
    try {
      const response = await updateCategory(category._id, {
        name: editCategory,
      });
      setCategories(
        categories.map((cat) =>
          cat._id === category._id ? response.data : cat
        )
      );
      setEditCategory(null);
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await deleteCategory(categoryId);
      setCategories(categories.filter((cat) => cat._id !== categoryId));
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Manage Categories</h2>
      {error && <div className="text-red-500">{error}</div>}
      <div className="mb-4">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="New category"
          className="border border-gray-300 rounded-md p-2 mr-2"
        />
        <button
          onClick={handleAddCategory}
          className="bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700"
        >
          Add
        </button>
      </div>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li
            key={category._id}
            className="flex justify-between items-center bg-white p-2 rounded-md shadow"
          >
            {editCategory === category._id ? (
              <input
                type="text"
                defaultValue={category.name}
                onChange={(e) => setEditCategory(e.target.value)}
                className="border border-gray-300 rounded-md p-2"
              />
            ) : (
              <span>{category.name}</span>
            )}
            <div>
              {editCategory === category._id ? (
                <button
                  onClick={() => handleEditCategory(category)}
                  className="bg-green-600 text-white py-1 px-3 rounded-md shadow-sm hover:bg-green-700 mr-2"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => setEditCategory(category._id)}
                  className="bg-yellow-600 text-white py-1 px-3 rounded-md shadow-sm hover:bg-yellow-700 mr-2"
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => handleDeleteCategory(category._id)}
                className="bg-red-600 text-white py-1 px-3 rounded-md shadow-sm hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryManager;
