import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../services/api";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Alert,
  Grid,
} from "@mui/material";

function LoginPage() {
  const [formData, setFormData] = useState({
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
      const response = await loginUser(formData);
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
        {/* Title */}
        <Typography
          component="h1"
          variant="h4"
          align="center"
          fontWeight="bold"
          gutterBottom
          sx={{ color: "#034d21" }}
        >
          Sign in to your account
        </Typography>

        {/* Error Message */}
        {error && (
          <Alert severity="error" sx={{ mb: 2, textAlign: "center" }}>
            {error}
          </Alert>
        )}

        {/* Form */}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
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
            Sign in
          </Button>

          {/* Redirect to Register */}
          <Grid container justifyContent="center" sx={{ mt: 3 }}>
            <Typography variant="body2">
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                style={{ color: "#034d21", fontWeight: "bold" }}
              >
                Register here
              </Link>
            </Typography>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}

export default LoginPage;
