import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Alert,
} from "@mui/material";

import API from "../services/api";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await API.post("/auth/login", form);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      navigate("/social");
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={4}
          sx={{
            width: "100%",
            padding: 4,
            borderRadius: 3,
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            textAlign="center"
            mb={1}
          >
            Welcome Back
          </Typography>

          <Typography
            color="text.secondary"
            textAlign="center"
            mb={3}
          >
            Login to your account
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit}
          >
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              margin="normal"
              required
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              margin="normal"
              required
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                mt: 3,
                py: 1.5,
                borderRadius: 2,
              }}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </Box>

          <Typography
            textAlign="center"
            mt={3}
          >
            Don't have an account?{" "}
            <Link to="/signup">
              Sign Up
            </Link>
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default Login;