import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "@/pages/LandingPage";
import Auth from "@/pages/Auth";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import Overview from "@/pages/dashboard/Overview";
import ProfileSetup from "@/pages/dashboard/ProfileSetup";
import Projects from "@/pages/dashboard/Projects";
import ProjectUpload from "@/pages/dashboard/ProjectUpload";
import PublicPortfolio from "@/pages/PublicPortfolio";
import Explorer from "@/pages/Explorer";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/signup" element={<Auth />} />
        <Route path="/u/:username" element={<PublicPortfolio />} />
        <Route path="/explorer" element={<Explorer />} />
        
        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Overview />} />
          <Route path="profile" element={<ProfileSetup />} />
          <Route path="projects" element={<Projects />} />
          <Route path="projects/new" element={<ProjectUpload />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
        
        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
