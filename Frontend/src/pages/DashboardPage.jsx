import React, { useState, useEffect } from "react";
import Navbar from "../components/NavBar";
import SummaryCards from "../components/SummaryCard";
import IncomeExpenseChart from "../components/IncomeExpenseChart";
import CategoryWiseChart from "../components/CategoryWiseChart";
import { useAuth } from "../context/AuthContext";
import { getSummary } from "../services/api";
import { Box, Container, Grid, Typography } from "@mui/material";

function DashboardPage() {
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
  });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchSummary = async () => {
    try {
      const response = await getSummary();
      setSummary(response.data);
    } catch (error) {
      console.error("Error fetching summary:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, [user]);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#f9f9f9",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Navbar />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <Typography variant="h4" color="textSecondary">
            Loading...
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#ffffff",
        paddingBottom: "2rem",
      }}
    >
      <Navbar />

      <Container maxWidth="xl" sx={{ py: 6 }}>
        <Typography
          variant="h3"
          fontWeight="bold"
          color="textPrimary"
          sx={{ mb: 4 }}
        >
          Dashboard
        </Typography>

        <SummaryCards summary={summary} />

        <Grid container spacing={4} sx={{ mt: 6 }}>
          <Grid item xs={12} md={6}>
            <IncomeExpenseChart />
          </Grid>
          <Grid item xs={12} md={6}>
            <CategoryWiseChart />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default DashboardPage;
