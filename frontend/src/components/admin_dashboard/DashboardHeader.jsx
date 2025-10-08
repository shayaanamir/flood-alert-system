// components/dashboard/DashboardHeader.jsx
import React from "react";

export const DashboardHeader = ({
  time,
  location,
  onRefresh,
  onSendAlerts,
}) => {
  return (
    <div className="dashboard-default dashboard-header">
      <div className="dashboard-default dashboard-header-title">
        <span style={{ fontWeight: "600", fontSize: "1.4rem", color: "white" }}>
          Emergency Flood Management
        </span>
        <span
          style={{
            fontWeight: "300",
            fontSize: "0.9rem",
            color: "white",
            textTransform: "capitalize",
          }}
        >
          Last Updated: {time.toLocaleTimeString()}
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            fill="currentColor"
            className="bi bi-geo-alt"
            viewBox="0 0 16 16"
          >
            <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
            <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
          </svg>{" "}
          {location || "Mumbai"}
        </span>
      </div>

      <div className="dashboard-default dashboard-header-buttons">
        <button
          className="dashboard-default dashboard-header-button"
          style={{ backgroundColor: "#EAB308" }}
          onClick={onSendAlerts}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-bell"
            viewBox="0 0 16 16"
          >
            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
          </svg>
          Send Alerts
        </button>

        <button
          className="dashboard-default dashboard-header-button"
          onClick={onRefresh}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-clockwise"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"
            />
            <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
          </svg>
          Refresh Data
        </button>
      </div>
    </div>
  );
};
