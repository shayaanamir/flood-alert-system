import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import AdminDashboard from "./pages/AdminDashboard";
import LandingPage from "./pages/LandingPage";
import ReportDmg from "./pages/ReportDmg";
import Resources from "./pages/Resources";
import ViewRisk from "./pages/ViewRisk";
import Shelters from "./pages/Shelters";
import ShelterManagement from "./pages/ShelterManagement";
import AboutPage from "./pages/about";
import HelpGuidelinesPage from "./pages/HelpGuidelines";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/report-dmg" element={<ReportDmg />} />
        <Route path="/reports-management" element={<Resources />} />
        <Route path="/shelters" element={<Shelters />} />
        <Route path="/view-risk" element={<ViewRisk />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/help-guidelines" element={<HelpGuidelinesPage />} />
      </Routes>
    </Router>
  );
}

export default App;
