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

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
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
      const response = await API.post("/auth/signup", form);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      navigate("/social");
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Unable to create account"
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
            Create Account
          </Typography>

          <Typography
            color="text.secondary"
            textAlign="center"
            mb={3}
          >
            Join the social community
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
              label="Username"
              name="username"
              value={form.username}
              onChange={handleChange}
              margin="normal"
              required
            />

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
              {loading ? "Creating..." : "Sign Up"}
            </Button>
          </Box>

          <Typography
            textAlign="center"
            mt={3}
          >
            Already have an account?{" "}
            <Link to="/login">
              Login
            </Link>
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default Signup;