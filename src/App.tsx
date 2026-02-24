import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "@/pages/LandingPage";
import Auth from "@/pages/Auth";
import ForgotPassword from "@/pages/ForgotPassword";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import Overview from "@/pages/dashboard/Overview";
import ProfileSetup from "@/pages/dashboard/ProfileSetup";
import Projects from "@/pages/dashboard/Projects";
import ProjectUpload from "@/pages/dashboard/ProjectUpload";
import Stats from "@/pages/dashboard/Stats";
import Settings from "@/pages/dashboard/Settings";
import PublicPortfolio from "@/pages/PublicPortfolio";
import ProjectDetails from "@/pages/ProjectDetails";
import Explorer from "@/pages/Explorer";

// Admin Imports
import AdminLogin from "@/pages/admin/AdminLogin";
import { AdminLayout } from "@/components/layout/AdminLayout";
import AdminOverview from "@/pages/admin/Overview";
import AdminUsers from "@/pages/admin/Users";
import AdminProjects from "@/pages/admin/Projects";
import AdminPayments from "@/pages/admin/Payments";
import AdminSettings from "@/pages/admin/Settings";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/signup" element={<Auth />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/u/:username" element={<PublicPortfolio />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
        <Route path="/explorer" element={<Explorer />} />
        
        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Overview />} />
          <Route path="profile" element={<ProfileSetup />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/new" element={<ProjectUpload />} />
          <Route path="projects/edit/:id" element={<ProjectUpload />} />
          <Route path="stats" element={<Stats />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/overview" replace />} />
          <Route path="overview" element={<AdminOverview />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="payments" element={<AdminPayments />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
