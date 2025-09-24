import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import AdminDashboard from "./pages/AdminDashboard";
import LandingPage from "./pages/LandingPage";
import ReportDmg from "./pages/ReportDmg";
import ReportsManagement from "./pages/ReportsManagement";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/report-dmg" element={<ReportDmg />} />
        <Route path="/reports-management" element={<ReportsManagement />} />
      </Routes>
    </Router>
  );
}

export default App;
