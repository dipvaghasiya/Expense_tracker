import React, { useState, useEffect } from "react";
import Navbar from "../components/NavBar";
import TransactionList from "../components/TransactionList";
import { getCategories } from "../services/api";
import GenerateReport from "../components/GenerateReport";
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  TextField,
  Button,
} from "@mui/material";

function TransactionHistoryPage() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    dateRange: "all",
    startDate: "",
    endDate: "",
    category: "",
    type: "",
  });

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
  }, []);

  const handleTransactionChange = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const calculateDateRange = (range) => {
    const now = new Date();
    let startDate = new Date();
    switch (range) {
      case "lastWeek":
        startDate.setDate(now.getDate() - 7);
        break;
      case "lastMonth":
        startDate.setMonth(now.getMonth() - 1);
        break;
      case "lastYear":
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        startDate = "";
    }
    return startDate;
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto py-6 px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Transaction History
        </h1>

        <div className="mb-4">
          <GenerateReport filters={filters} />
        </div>

        {/* Use Material UI Grid layout to organize the form */}
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Date Range</InputLabel>
              <Select
                name="dateRange"
                value={filters.dateRange}
                onChange={(e) => {
                  const range = e.target.value;
                  setFilters({
                    ...filters,
                    dateRange: range,
                    startDate:
                      range !== "custom" ? calculateDateRange(range) : "",
                    endDate: range !== "custom" ? new Date() : "",
                  });
                }}
              >
                <MenuItem value="all">All Time</MenuItem>
                <MenuItem value="lastWeek">Last Week</MenuItem>
                <MenuItem value="lastMonth">Last Month</MenuItem>
                <MenuItem value="lastYear">Last Year</MenuItem>
                <MenuItem value="custom">Custom Range</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {filters.dateRange === "custom" && (
            <>
              <Grid item xs={12} md={3}>
                <TextField
                  label="Start Date"
                  type="date"
                  name="startDate"
                  value={filters.startDate}
                  onChange={handleFilterChange}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField
                  label="End Date"
                  type="date"
                  name="endDate"
                  value={filters.endDate}
                  onChange={handleFilterChange}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </>
          )}

          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
              >
                <MenuItem value="">All Categories</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category._id} value={category._id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                name="type"
                value={filters.type}
                onChange={handleFilterChange}
              >
                <MenuItem value="">All Types</MenuItem>
                <MenuItem value="income">Income</MenuItem>
                <MenuItem value="expense">Expense</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <div className="mt-4">
          <TransactionList
            refreshTrigger={refreshTrigger}
            onTransactionChange={handleTransactionChange}
            filters={filters}
          />
        </div>
      </div>
    </div>
  );
}

export default TransactionHistoryPage;
