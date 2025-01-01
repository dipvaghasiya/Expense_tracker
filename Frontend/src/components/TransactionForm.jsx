import { useState } from "react";
import { addTransaction } from "../services/api";
import {
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Alert,
} from "@mui/material";

function TransactionForm({ categories, onTransactionAdded }) {
  const [formData, setFormData] = useState({
    amount: "",
    type: "expense",
    category: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addTransaction(formData);
      onTransactionAdded(); // Notify parent component
      setFormData({
        amount: "",
        type: "expense",
        category: "",
        description: "",
        date: new Date().toISOString().split("T")[0],
      });
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-lg shadow-lg"
    >
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        label="Amount"
        type="number"
        name="amount"
        value={formData.amount}
        onChange={handleChange}
        required
        fullWidth
        variant="outlined"
        margin="normal"
      />
      <FormControl fullWidth margin="normal" variant="outlined">
        <InputLabel>Type</InputLabel>
        <Select
          name="type"
          value={formData.type}
          onChange={handleChange}
          label="Type"
        >
          <MenuItem value="income">Income</MenuItem>
          <MenuItem value="expense">Expense</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal" variant="outlined">
        <InputLabel>Category</InputLabel>
        <Select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          label="Category"
        >
          <MenuItem value="">Select a category</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category._id} value={category._id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        fullWidth
        variant="outlined"
        margin="normal"
      />
      <TextField
        label="Date"
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
        fullWidth
        variant="outlined"
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        sx={{
          mt: 2,
          py: 1.5,
          backgroundColor: "#4caf50",
          "&:hover": {
            backgroundColor: "#388e3c",
          },
        }}
      >
        Add Transaction
      </Button>
    </form>
  );
}

export default TransactionForm;
