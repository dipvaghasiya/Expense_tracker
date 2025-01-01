import { useState } from "react";
import { addCategory, updateCategory, deleteCategory } from "../services/api";
import {
  TextField,
  Button,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import { Edit, Delete, Save } from "@mui/icons-material";

function CategoryManager({ categories, onCategoryChange }) {
  const [newCategory, setNewCategory] = useState("");
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState("");
  const [error, setError] = useState("");

  const handleAddCategory = async () => {
    if (!newCategory) return;
    try {
      await addCategory({ name: newCategory });
      setNewCategory("");
      onCategoryChange(); // Notify parent component
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
    }
  };

  const handleEditCategory = async (categoryId) => {
    if (!editCategoryName) return;
    try {
      await updateCategory(categoryId, { name: editCategoryName });
      setEditCategoryId(null);
      setEditCategoryName("");
      onCategoryChange(); // Notify parent component
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await deleteCategory(categoryId);
      onCategoryChange(); // Notify parent component
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
    }
  };

  return (
    <Paper sx={{ p: 3, backgroundColor: "#ffffff" }}>
      <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
        Manage Categories
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <div className="mb-4">
        <TextField
          label="New Category"
          variant="outlined"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <Button
          onClick={handleAddCategory}
          variant="contained"
          sx={{
            width: "100%",
            backgroundColor: "#4CAF50", // Green color
            "&:hover": { backgroundColor: "#45a049" }, // Darker green on hover
          }}
        >
          Add Category
        </Button>
      </div>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li
            key={category._id}
            className="flex justify-between items-center bg-white p-2 rounded-md shadow"
          >
            {editCategoryId === category._id ? (
              <TextField
                label="Edit Category"
                variant="outlined"
                value={editCategoryName}
                onChange={(e) => setEditCategoryName(e.target.value)}
                sx={{ flex: 1, mr: 2 }}
              />
            ) : (
              <Typography variant="body1">{category.name}</Typography>
            )}
            <div>
              {editCategoryId === category._id ? (
                <IconButton
                  onClick={() => handleEditCategory(category._id)}
                  color="success"
                  sx={{ mr: 1 }}
                >
                  <Save />
                </IconButton>
              ) : (
                <IconButton
                  onClick={() => {
                    setEditCategoryId(category._id);
                    setEditCategoryName(category.name);
                  }}
                  color="warning"
                  sx={{ mr: 1 }}
                >
                  <Edit />
                </IconButton>
              )}
              <IconButton
                onClick={() => handleDeleteCategory(category._id)}
                color="error"
              >
                <Delete />
              </IconButton>
            </div>
          </li>
        ))}
      </ul>
    </Paper>
  );
}

export default CategoryManager;
