import React from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { Assessment, Category, MonetizationOn } from "@mui/icons-material";

function HomePage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        bgcolor: "background.paper",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, #d9f99d, #a5f3fc)",
          zIndex: -1,
        }}
      />

      <Box
        sx={{
          maxWidth: "lg",
          mx: "auto",
          px: 2,
          textAlign: "center",
          py: 6,
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          fontWeight="bold"
          gutterBottom
          sx={{ color: "#034d21" }}
        >
          Welcome to Expense Manager
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          paragraph
          sx={{ color: "#0f5132" }}
        >
          Track your expenses, manage your categories, and gain insights into
          your financial habits.
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 4 }}>
          <Button
            component={Link}
            to="/register"
            variant="contained"
            sx={{
              px: 4,
              background: "#034d21",
              color: "white",
              "&:hover": { background: "#056636" },
            }}
            size="large"
          >
            Get Started
          </Button>
          <Button
            component={Link}
            to="/login"
            variant="outlined"
            sx={{
              px: 4,
              borderColor: "#034d21",
              color: "#034d21",
              "&:hover": { borderColor: "#056636", background: "#effbf4" },
            }}
            size="large"
          >
            Log In
          </Button>
        </Box>
      </Box>

      <Box sx={{ mt: 8, px: 2 }}>
        <Grid container spacing={4}>
          {/* Feature 1 */}
          <Grid item xs={12} md={4}>
            <Card
              sx={{
                textAlign: "center",
                p: 2,
                background: "#effbf4",
                boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
              }}
            >
              <CardContent>
                <MonetizationOn sx={{ fontSize: 50, color: "#10b981" }} />
                <Typography variant="h5" fontWeight="bold" sx={{ mt: 2 }}>
                  Track Expenses
                </Typography>
                <Typography color="text.secondary" sx={{ mt: 1 }}>
                  Easily track your income and expenses to stay on top of your
                  finances.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              sx={{
                textAlign: "center",
                p: 2,
                background: "#effbf4",
                boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
              }}
            >
              <CardContent>
                <Category sx={{ fontSize: 50, color: "#3b82f6" }} />
                <Typography variant="h5" fontWeight="bold" sx={{ mt: 2 }}>
                  Manage Categories
                </Typography>
                <Typography color="text.secondary" sx={{ mt: 1 }}>
                  Organize your transactions by categories for better insights.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card
              sx={{
                textAlign: "center",
                p: 2,
                background: "#effbf4",
                boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
              }}
            >
              <CardContent>
                <Assessment sx={{ fontSize: 50, color: "#0ea5e9" }} />
                <Typography variant="h5" fontWeight="bold" sx={{ mt: 2 }}>
                  View Reports
                </Typography>
                <Typography color="text.secondary" sx={{ mt: 1 }}>
                  Generate reports to analyze your spending patterns over time.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default HomePage;
