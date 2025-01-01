import { useState } from "react";
import { addCategory } from "../services/api";
import PropTypes from "prop-types";
import { useAuth } from "../context/AuthContext";

function CategoryForm({ onCategoryAdded }) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const { fetchCategories } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addCategory({ name });
      setName("");
      fetchCategories();
      onCategoryAdded();
    } catch (err) {
      setError(err.response?.data?.error || "Failed to add category");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-500">{error}</div>}
      <div className="flex gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter category name"
          className="flex-1 border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
          required
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add
        </button>
      </div>
    </form>
  );
}

CategoryForm.propTypes = {
  onCategoryAdded: PropTypes.func.isRequired,
};

export default CategoryForm;
