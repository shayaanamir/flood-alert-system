import "../../styles/AdminDashboard.css";
import { useState, useEffect } from "react";

export default function QuickViews(props) {
  const [showPopup, setShowPopup] = useState(false);

  const alterPopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <>
      <div
        className={`dashboard-default dashboard-quick-action ${
          props.status === "High"
            ? "dashboard-quick-action-high"
            : props.status === "Medium"
            ? "dashboard-quick-action-medium"
            : "dashboard-quick-action-low"
        }`}
        style={props.style}
      >
        <div className="dashboard-default dashboard-quick-action-info">
          <span className="info-1">{props.info1}</span>
          <span
            className={`info-2 ${
              props.status === "High"
                ? "high"
                : props.status === "Medium"
                ? "medium"
                : "low"
            }`}
          >
            {props.info2}
          </span>
          <span className="info-3">{props.info3}</span>
        </div>
        <div className="dashboard-default dashboard-quick-action-icon-div">
          <div
            className={`dashboard-default dashboard-quick-action-icon ${
              props.status === "High"
                ? "high"
                : props.status === "Medium"
                ? "medium"
                : "low"
            }`}
          >
            {props.icon}
          </div>
          <div
            className="dashboard-default dashboard-i-button"
            onClick={alterPopup}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              fill="#2B3035"
              class="bi bi-info"
              viewBox="0 0 16 16"
            >
              <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
            </svg>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="popup-overlay" onClick={alterPopup}>
          <div
            className="popup-content"
            onClick={(e) => e.stopPropagation()} // prevent overlay click from closing
          >
            <h3>{props.info1}</h3>
            <p>{props.popupText || "No additional information available."}</p>
            <button className="close-btn" onClick={alterPopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
