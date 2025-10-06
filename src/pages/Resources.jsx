import("../styles/Resources.css");
import AddressTableRow from "../components/AddressTableRow";
import Header from "../components/global/Header";
import ReportsManagement from "./ReportsManagement";
import ShelterManagement from "./ShelterManagement";
import { useState, useEffect } from "react";

export default function Resources() {
  const [view, setView] = useState("reports");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const setViewToShelter = () => {
    setView("shelter");
  };

  const setViewToReports = () => {
    setView("reports");
  };

  return (
    <>
      <div className="reports-default reports-body">
        <Header isAdmin={true} />
        <div className="reports-default reports-main-container">
          <div
            className={`reports-default reports-panel ${
              isCollapsed ? "collapsed" : ""
            }`}
          >
            <button
              className="reports-default collapse-btn"
              onClick={toggleCollapse}
            >
              {isCollapsed ? "→" : "←"}
            </button>

            {/* {!isCollapsed && ( */}
            <>
              <span>Admin Panel</span>
              <div
                className={`reports-default reports-panel-option ${
                  view == "reports" ? "selected-option" : ""
                }`}
                onClick={setViewToReports}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-journal-text"
                  viewBox="0 0 16 16"
                >
                  <path d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5" />
                  <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2" />
                  <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z" />
                </svg>
                {!isCollapsed && "Reports Management"}
              </div>
              <div
                className={`reports-default reports-panel-option ${
                  view == "shelter" ? "selected-option" : ""
                }`}
                onClick={setViewToShelter}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-house-door"
                  viewBox="0 0 16 16"
                >
                  <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z" />
                </svg>
                {!isCollapsed && "Shelter Management"}
              </div>
            </>
            {/* )} */}
          </div>

          <div
            className={`reports-default reports-content ${
              isCollapsed ? "expanded" : ""
            }`}
          >
            <div className="reports-default reports-header">
              <span>
                {view == "reports"
                  ? "Damage Reports Management"
                  : "Shelter Reports Management"}
              </span>
            </div>
            <div className="reports-default reports-content-body">
              {view == "reports" ? (
                <ReportsManagement />
              ) : (
                <ShelterManagement />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
