import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Dashboard from "../pages/Dashboard/Dashboard";
import Planner from "../pages/Planner/Planner";
import Analytics from "../pages/Analytics/Analytics";
import Calendar from "../pages/Calendar/Calendar";
import Profile from "../pages/Profile/Profile";
import Settings from "../pages/Settings/Settings";
import HelpSupport from "../pages/HelpSupport/HelpSupport";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Dashboard />} />

        <Route path="/planner" element={<Planner />} />

        <Route path="/analytics" element={<Analytics />} />

        <Route path="/calendar" element={<Calendar />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/settings" element={<Settings />} />

        <Route path="/help-support" element={<HelpSupport />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
