import React, { useState } from 'react';
import { addCategory, updateCategory, deleteCategory } from '../services/api';

function CategoryManager({ categories, onCategoryChange }) {
  const [newCategory, setNewCategory] = useState('');
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState('');
  const [error, setError] = useState('');

  const handleAddCategory = async () => {
    if (!newCategory) return;
    try {
      await addCategory({ name: newCategory });
      setNewCategory('');
      onCategoryChange(); // Notify parent component
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    }
  };

  const handleEditCategory = async (categoryId) => {
    if (!editCategoryName) return;
    try {
      await updateCategory(categoryId, { name: editCategoryName });
      setEditCategoryId(null);
      setEditCategoryName('');
      onCategoryChange(); // Notify parent component
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await deleteCategory(categoryId);
      onCategoryChange(); // Notify parent component
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred');
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
          <li key={category._id} className="flex justify-between items-center bg-white p-2 rounded-md shadow">
            {editCategoryId === category._id ? (
              <input
                type="text"
                value={editCategoryName}
                onChange={(e) => setEditCategoryName(e.target.value)}
                className="border border-gray-300 rounded-md p-2"
              />
            ) : (
              <span>{category.name}</span>
            )}
            <div>
              {editCategoryId === category._id ? (
                <button
                  onClick={() => handleEditCategory(category._id)}
                  className="bg-green-600 text-white py-1 px-3 rounded-md shadow-sm hover:bg-green-700 mr-2"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={() => {
                    setEditCategoryId(category._id);
                    setEditCategoryName(category.name);
                  }}
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
