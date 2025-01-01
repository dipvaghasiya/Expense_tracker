import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { getTransactions } from "../services/api";
import { Button, Box } from "@mui/material";

function GenerateReport({ filters }) {
  const generatePDF = async () => {
    try {
      const response = await getTransactions();
      const transactions = response.data;

      const shouldFilterByDate = filters.dateRange !== "all";

      const filteredTransactions = transactions.filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        const startDate = new Date(filters.startDate);
        const endDate = new Date(filters.endDate);

        const dateMatch = shouldFilterByDate
          ? transactionDate >= startDate && transactionDate <= endDate
          : true;

        const categoryMatch = filters.category
          ? transaction.category?._id === filters.category
          : true;

        const typeMatch = filters.type
          ? transaction.type === filters.type
          : true;

        return dateMatch && categoryMatch && typeMatch;
      });

      const doc = new jsPDF();
      doc.text("Transaction Report", 14, 16);
      doc.setFontSize(12);

      const tableColumn = ["Date", "Description", "Category", "Type", "Amount"];
      const tableRows = [];

      filteredTransactions.forEach((transaction) => {
        const transactionData = [
          new Date(transaction.date).toLocaleDateString(),
          transaction.description || "No description",
          transaction.category?.name || "Uncategorized",
          transaction.type,
          `₹${transaction.amount.toFixed(2)}`.replace(/^\D+/g, ""),
        ];
        tableRows.push(transactionData);
      });

      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 20,
      });

      doc.save("transaction_report.pdf");
    } catch (err) {
      console.error("Error generating PDF:", err);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100%", width: "100%" }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={generatePDF}
        sx={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#4CAF50",
          "&:hover": { backgroundColor: "#45a049" },
        }}
      >
        Generate PDF Report
      </Button>
    </Box>
  );
}

export default GenerateReport;
