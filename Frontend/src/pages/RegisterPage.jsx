import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { registerUser } from "../services/api";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Alert,
  Grid,
} from "@mui/material";

function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData);
      login(response.data);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.error || "An error occurred");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #d9f99d, #a5f3fc)",
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: 3,
          p: 4,
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          align="center"
          fontWeight="bold"
          gutterBottom
          sx={{ color: "#034d21" }}
        >
          Create your account
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2, textAlign: "center" }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Full Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={formData.name}
            onChange={handleChange}
            variant="outlined"
            InputProps={{
              sx: { borderRadius: 2 },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
            InputProps={{
              sx: { borderRadius: 2 },
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            variant="outlined"
            InputProps={{
              sx: { borderRadius: 2 },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 2,
              py: 1.5,
              background: "#034d21",
              "&:hover": { background: "#056636" },
            }}
          >
            Register
          </Button>

          <Grid container justifyContent="center" sx={{ mt: 3 }}>
            <Typography variant="body2">
              Already have an account?{" "}
              <Link
                to="/login"
                style={{ color: "#034d21", fontWeight: "bold" }}
              >
                Log in
              </Link>
            </Typography>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default RegisterPage;
