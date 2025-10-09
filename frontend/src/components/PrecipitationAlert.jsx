import { useState } from "react";

function PrecipitationAlert({ dailyData }) {
  const [isVisible, setIsVisible] = useState(true);

  // Filter out days with precipitationSum >= 10
  const alertDays = dailyData?.filter((day) => day.precipitationSum >= 10);

  // Don't render if no alerts or if closed
  if (!alertDays?.length || !isVisible) return null;

  return (
    <div className="alert-container">
      <div className="alert-box">
        <button
          className="alert-close-btn"
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

        <div className="alert-header">
          <div className="alert-icon">
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
          <h3 className="alert-title">High Precipitation Alert</h3>
        </div>

        <p className="alert-message">
          Heavy rainfall detected on the following days. Please take necessary
          precautions.
        </p>

        <ul className="alert-list">
          {dailyData.map((day, index) => (
            <li key={index} className="alert-list-item">
              <span className="alert-date">
                {new Date(day.time).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </span>
              <span className="alert-precipitation">
                {day.precipitationSum.toFixed(1)} mm
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default PrecipitationAlert;
