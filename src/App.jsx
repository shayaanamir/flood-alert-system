import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import ReportDmg from "./pages/ReportDmg";
import ViewRisk from "./pages/ViewRisk";
import Shelters from "./pages/Shelters";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/report-dmg" element={<ReportDmg />} />
        <Route path ="/shelters" element={<Shelters />} />
        <Route path="/view-risk" element={<ViewRisk />} />
\      </Routes>
    </Router>
  );
}

export default App;
