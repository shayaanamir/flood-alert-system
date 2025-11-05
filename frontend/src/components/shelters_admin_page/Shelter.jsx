import React, { useEffect } from "react";
import "../../styles/ShelterManagement.css";

const Shelter = (props) => {
  const handleDetailsClick = (e) => {
    e.stopPropagation();
    props.onDetailsClick();
  };

  const handleSupplyClick = (e) => {
    e.stopPropagation();
    props.onSupplyClick();
  };

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "good":
        return "status-good";
      case "adequate":
        return "status-adequate";
      case "low":
        return "status-low";
      case "critical":
        return "status-critical";
      case "empty":
        return "status-empty";
      default:
        return "";
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "#16a34a"; // green
      case "full":
        return "#dc2626"; // red
      case "standby":
        return "#f59e0b"; // amber / yellow
      default:
        return "#6b7280"; // gray
    }
  };

  return (
    <div className="shelter-card-individual">
      <div className="shelter-left">
        <h3 className="shelter-name">{props.name}</h3>
        <span className="shelter-id">ID: {props.id}</span>
      </div>

      <div className="shelter-address-zone">
        <div className="shelter-address">{props.address}</div>
        <div className="shelter-zone">Zone: {props.zone}</div>
      </div>

      <div className="shelter-status">
        <span className={`shelter-status-badge ${props.status.toLowerCase()}`}>
          {props.status}
        </span>
      </div>

      <div className="shelter-capacity">
        <div className="shelter-capacity-text">
          <span>{props.capacity.toFixed(2)}</span>
          <span className="shelter-capacity-divider">/</span>
          <span>100</span>
        </div>
        <div className="shelter-progress-bar">
          <div
            className="shelter-progress-fill"
            style={{ width: `${Math.round(props.capacity, 2)}%` }}
          />
        </div>
      </div>

      <div className="shelter-resources">
        <div className="shelter-resource">
          <span>Food:</span>
          <span className={getStatusClass(props.foodStatus)}>
            {" "}
            {props.foodStatus}
          </span>
        </div>
        <div className="shelter-resource">
          <span>Medical:</span>
          <span className={getStatusClass(props.medicalStatus)}>
            {" "}
            {props.medicalStatus}
          </span>
        </div>
      </div>

      <div className="shelter-actions">
        <a href="#" onClick={handleDetailsClick}>
          Details
        </a>
        <a href="#" onClick={handleSupplyClick}>
          Supply
        </a>
      </div>
    </div>
  );
};

export default Shelter;
