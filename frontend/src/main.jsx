import React from "react";
import ReactDOM from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";

import App from "./App";

import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { TaskProvider } from "./context/TaskContext";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <CssBaseline />

        <AuthProvider>
          <TaskProvider>
            <App />
          </TaskProvider>
        </AuthProvider>

      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);