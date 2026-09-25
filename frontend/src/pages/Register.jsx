import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
  InputAdornment,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";

const API_BASE_URL =
  "http://localhost:8080/api/auth";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      username: "",
      email: "",
      password: "",
    });

  const [showPassword, setShowPassword] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // ==========================================
  // HANDLE CHANGE
  // ==========================================

  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ==========================================
  // HANDLE SUBMIT
  // ==========================================

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/register`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            username:
              formData.username.trim(),

            email:
              formData.email.trim(),

            password:
              formData.password,
          }),
        }
      );

      if (!response.ok) {
        let message =
          "Registration failed.";

        try {
          const errorData =
            await response.json();

          message =
            errorData.message ||
            errorData.error ||
            message;
        } catch {
          // Keep default message
        }

        throw new Error(message);
      }

      setSuccess(
        "Account created successfully. Redirecting to login..."
      );

      setFormData({
        username: "",
        email: "",
        password: "",
      });

      setTimeout(() => {
        navigate("/login", {
          replace: true,
        });
      }, 1500);

    } catch (err) {
      setError(
        err.message ||
          "Unable to create your account."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",

        backgroundColor:
          "background.default",

        display: "flex",

        alignItems: "stretch",
      }}
    >
      <Container
        maxWidth={false}
        disableGutters
        sx={{
          display: "flex",

          minHeight: "100vh",
        }}
      >
        {/* ==========================================
            LEFT BRAND SECTION
        ========================================== */}

        <Box
          sx={{
            display: {
              xs: "none",
              md: "flex",
            },

            width: "50%",

            minHeight: "100vh",

            p: {
              md: 6,
              lg: 8,
            },

            background:
              "linear-gradient(135deg, #4f46e5 0%, #4338ca 50%, #312e81 100%)",

            color: "#ffffff",

            flexDirection: "column",

            justifyContent: "space-between",
          }}
        >
          <Box>
            {/* BRAND */}

            <Box
              sx={{
                display: "flex",

                alignItems: "center",

                gap: 1.5,

                mb: 8,
              }}
            >
              <Box
                sx={{
                  width: 42,
                  height: 42,

                  borderRadius: 1.5,

                  backgroundColor:
                    "rgba(255,255,255,0.16)",

                  display: "flex",

                  alignItems: "center",

                  justifyContent: "center",

                  border:
                    "1px solid rgba(255,255,255,0.2)",
                }}
              >
                <TaskAltOutlinedIcon />
              </Box>

              <Typography
                sx={{
                  fontSize: 20,

                  fontWeight: 700,

                  letterSpacing:
                    "-0.02em",
                }}
              >
                Productivity Tracker
              </Typography>
            </Box>

            <Typography
              component="h1"
              sx={{
                fontSize: {
                  md: 38,
                  lg: 48,
                },

                fontWeight: 800,

                lineHeight: 1.1,

                letterSpacing:
                  "-0.04em",

                maxWidth: 560,
              }}
            >
              Build better habits.
              <br />
              Plan your day.
              <br />
              Make progress.
            </Typography>

            <Typography
              sx={{
                mt: 3,

                maxWidth: 500,

                fontSize: 15,

                lineHeight: 1.7,

                color:
                  "rgba(255,255,255,0.75)",
              }}
            >
              Create your workspace and
              start managing your tasks
              with a simple, focused
              productivity system.
            </Typography>

            {/* FEATURES */}

            <Box
              sx={{
                mt: 5,

                display: "flex",

                flexDirection: "column",

                gap: 2,
              }}
            >
              <FeatureItem>
                Organize tasks by priority
              </FeatureItem>

              <FeatureItem>
                Track your daily progress
              </FeatureItem>

              <FeatureItem>
                Keep your work in one place
              </FeatureItem>
            </Box>
          </Box>

          <Typography
            sx={{
              fontSize: 12,

              color:
                "rgba(255,255,255,0.55)",
            }}
          >
            © {new Date().getFullYear()} Productivity
            Tracker
          </Typography>
        </Box>

        {/* ==========================================
            RIGHT REGISTER SECTION
        ========================================== */}

        <Box
          sx={{
            flex: 1,

            minHeight: "100vh",

            display: "flex",

            alignItems: "center",

            justifyContent: "center",

            p: {
              xs: 2,
              sm: 4,
              md: 6,
            },
          }}
        >
          <Box
            sx={{
              width: "100%",

              maxWidth: 430,
            }}
          >
            {/* MOBILE BRAND */}

            <Box
              sx={{
                display: {
                  xs: "flex",
                  md: "none",
                },

                alignItems: "center",

                justifyContent:
                  "center",

                gap: 1,

                mb: 5,
              }}
            >
              <TaskAltOutlinedIcon
                color="primary"
              />

              <Typography
                fontWeight={700}
              >
                Productivity Tracker
              </Typography>
            </Box>

            <Paper
              elevation={0}
              sx={{
                p: {
                  xs: 2.5,
                  sm: 4,
                },

                border:
                  "1px solid",

                borderColor:
                  "divider",

                borderRadius: 2,

                backgroundColor:
                  "background.paper",
              }}
            >
              <Typography
                component="h2"
                sx={{
                  fontSize: 28,

                  fontWeight: 750,

                  letterSpacing:
                    "-0.03em",
                }}
              >
                Create your account
              </Typography>

              <Typography
                sx={{
                  mt: 1,

                  mb: 3.5,

                  fontSize: 13,

                  color:
                    "text.secondary",

                  lineHeight: 1.6,
                }}
              >
                Start organizing your work
                and make every day more
                productive.
              </Typography>

              {error && (
                <Alert
                  severity="error"
                  sx={{
                    mb: 2.5,
                    fontSize: 13,
                  }}
                >
                  {error}
                </Alert>
              )}

              {success && (
                <Alert
                  severity="success"
                  sx={{
                    mb: 2.5,
                    fontSize: 13,
                  }}
                >
                  {success}
                </Alert>
              )}

              <Box
                component="form"
                onSubmit={handleSubmit}
              >
                <TextField
                  fullWidth
                  required
                  label="Username"
                  name="username"
                  value={
                    formData.username
                  }
                  onChange={
                    handleChange
                  }
                  autoComplete="username"
                  margin="normal"
                  inputProps={{
                    minLength: 3,
                    maxLength: 50,
                  }}
                />

                <TextField
                  fullWidth
                  required
                  type="email"
                  label="Email address"
                  name="email"
                  value={
                    formData.email
                  }
                  onChange={
                    handleChange
                  }
                  autoComplete="email"
                  margin="normal"
                />

                <TextField
                  fullWidth
                  required
                  label="Password"
                  name="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  value={
                    formData.password
                  }
                  onChange={
                    handleChange
                  }
                  autoComplete="new-password"
                  margin="normal"
                  helperText="Minimum 8 characters"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          edge="end"
                          onClick={() =>
                            setShowPassword(
                              (previous) =>
                                !previous
                            )
                          }
                          aria-label={
                            showPassword
                              ? "Hide password"
                              : "Show password"
                          }
                        >
                          {showPassword ? (
                            <VisibilityOffOutlinedIcon />
                          ) : (
                            <VisibilityOutlinedIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{
                    mt: 3,

                    py: 1.35,

                    borderRadius: 1.5,

                    fontWeight: 700,

                    textTransform:
                      "none",
                  }}
                >
                  {loading
                    ? "Creating account..."
                    : "Create Account"}
                </Button>
              </Box>

              <Divider
                sx={{
                  my: 3,
                }}
              >
                <Typography
                  sx={{
                    fontSize: 11,

                    color:
                      "text.secondary",
                  }}
                >
                  ALREADY HAVE AN ACCOUNT?
                </Typography>
              </Divider>

              <Button
                fullWidth
                component={Link}
                to="/login"
                variant="outlined"
                size="large"
                sx={{
                  py: 1.25,

                  borderRadius: 1.5,

                  textTransform:
                    "none",

                  fontWeight: 600,
                }}
              >
                Sign in
              </Button>
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

const FeatureItem = ({
  children,
}) => {
  return (
    <Box
      sx={{
        display: "flex",

        alignItems: "center",

        gap: 1.25,
      }}
    >
      <CheckCircleOutlineOutlinedIcon
        sx={{
          fontSize: 19,

          color: "#a5b4fc",
        }}
      />

      <Typography
        sx={{
          fontSize: 13,

          color:
            "rgba(255,255,255,0.82)",
        }}
      >
        {children}
      </Typography>
    </Box>
  );
};

export default Register;