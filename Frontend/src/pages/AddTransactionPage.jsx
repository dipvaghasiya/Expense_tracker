import { useState, useEffect } from "react";
import Navbar from "../components/NavBar";
import TransactionForm from "../components/TransactionForm";
import { getCategories } from "../services/api";
import { Container, Typography, Paper } from "@mui/material";

function AddTransactionPage() {
  const [categories, setCategories] = useState([]);

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

  return (
    <div>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Paper elevation={3} sx={{ padding: 4 }}>
          <Typography
            variant="h4"
            gutterBottom
            color="textPrimary"
            align="center"
          >
            Add Transaction
          </Typography>
          <TransactionForm
            categories={categories}
            onTransactionAdded={() => {}}
          />
        </Paper>
      </Container>
    </div>
  );
}

export default AddTransactionPage;
