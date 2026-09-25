import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import ProtectedRoute from "./ProtectedRoute";

import Login from "../pages/Login";
import Register from "../pages/Register";

import Dashboard from "../pages/Dashboard/Dashboard";
import Planner from "../pages/Planner/Planner";
import Analytics from "../pages/Analytics/Analytics";
import Calendar from "../pages/Calendar/Calendar";
import Profile from "../pages/Profile/Profile";
import Settings from "../pages/Settings/Settings";
import HelpSupport from "../pages/HelpSupport/HelpSupport";

import { useAuth } from "../context/AuthContext";

const PublicHomeRedirect = () => {
  const {
    isAuthenticated,
    loading,
  } = useAuth();

  if (loading) {
    return null;
  }

  return (
    <Navigate
      to={
        isAuthenticated
          ? "/dashboard"
          : "/login"
      }
      replace
    />
  );
};

const AppRoutes = () => {
  return (
    <Routes>

      {/* ==========================================
          ROOT
      ========================================== */}

      <Route
        path="/"
        element={<PublicHomeRedirect />}
      />

      {/* ==========================================
          PUBLIC AUTHENTICATION ROUTES
      ========================================== */}

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      {/* ==========================================
          PROTECTED APPLICATION
      ========================================== */}

      <Route element={<ProtectedRoute />}>

        <Route element={<MainLayout />}>

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/planner"
            element={<Planner />}
          />

          <Route
            path="/analytics"
            element={<Analytics />}
          />

          <Route
            path="/calendar"
            element={<Calendar />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route
            path="/settings"
            element={<Settings />}
          />

          <Route
            path="/help-support"
            element={<HelpSupport />}
          />

        </Route>

      </Route>

      {/* ==========================================
          UNKNOWN URL
      ========================================== */}

      <Route
        path="*"
        element={
          <PublicHomeRedirect />
        }
      />

    </Routes>
  );
};

export default AppRoutes;