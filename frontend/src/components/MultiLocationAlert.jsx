// components/MultiLocationAlert.jsx
import { useState } from "react";

function MultiLocationAlert({ alerts, loading }) {
  const [isVisible, setIsVisible] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState(null);

  // Don't render if no alerts, loading, or if closed
  if (loading || !alerts?.length || !isVisible) return null;

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="multi-alert-container">
      <div className="multi-alert-box">
        <button
          className="multi-alert-close-btn"
          onClick={() => setIsVisible(false)}
          aria-label="Close alert"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="multi-alert-header">
          <div className="multi-alert-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>
          <div>
            <h3 className="multi-alert-title">Regional Flood Alerts</h3>
            <p className="multi-alert-subtitle">
              {alerts.length} location{alerts.length > 1 ? "s" : ""} with heavy
              rainfall
            </p>
          </div>
        </div>

        <div className="multi-alert-locations">
          {alerts.map((alert, index) => (
            <div key={index} className="location-card">
              <div
                className="location-card-header"
                onClick={() => toggleExpand(index)}
              >
                <div className="location-info">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span className="location-name">{alert.location}</span>
                </div>
                <div className="location-stats">
                  <span className="max-precipitation">
                    Max: {alert.maxPrecipitation.toFixed(1)} mm
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`expand-icon ${
                      expandedIndex === index ? "expanded" : ""
                    }`}
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </div>
              </div>

              {expandedIndex === index && (
                <div className="location-card-details">
                  <div className="coordinates">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="2" y1="12" x2="22" y2="12"></line>
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                    </svg>
                    <span>
                      {alert.coordinates.lat}, {alert.coordinates.lon}
                    </span>
                  </div>
                  <div className="alert-days">
                    <p className="days-label">Alert Days:</p>
                    {alert.alertDays.map((day, dayIndex) => (
                      <div key={dayIndex} className="day-item">
                        <span className="day-date">
                          {new Date(day.time).toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        <span className="day-precipitation">
                          {day.precipitationSum.toFixed(1)} mm
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="multi-alert-footer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
          <span>Monitoring 7 locations across the region</span>
        </div>
      </div>
    </div>
  );
}

export default MultiLocationAlert;
