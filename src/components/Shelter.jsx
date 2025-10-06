import React from "react";

const Shelter = (props) => {
  const capacityPercentage = 45;

  const handleDetailsClick = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    props.onDetailsClick();
  };

  const handleSupplyClick = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    props.onSupplyClick();
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
        borderRadius: "0px",
        padding: "16px 20px",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        fontSize: "14px",
        lineHeight: "1.4",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        width: "100%",
      }}
    >
      {/* Left Section - Name and ID */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "200px",
        }}
      >
        <h3
          style={{
            margin: "0 0 4px 0",
            fontSize: "16px",
            fontWeight: "600",
            color: "#1f2937",
          }}
        >
          {props.name}
        </h3>
        <span
          style={{
            color: "#6b7280",
            fontSize: "13px",
          }}
        >
          {props.id}
        </span>
      </div>

      {/* Address and Zone */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "150px",
        }}
      >
        <div
          style={{
            color: "#1f2937",
            marginBottom: "4px",
          }}
        >
          {props.address}
        </div>
        <div
          style={{
            color: "#6b7280",
          }}
        >
          {props.zone}
        </div>
      </div>

      {/* Status */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "120px",
        }}
      >
        <span
          style={{
            backgroundColor: "#dcfce7",
            color: "#166534",
            padding: "4px 12px",
            borderRadius: "12px",
            fontSize: "12px",
            fontWeight: "500",
          }}
        >
          Active
        </span>
      </div>

      {/* Capacity */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "6px",
            fontSize: "14px",
            fontWeight: "500",
          }}
        >
          <span style={{ color: "#1f2937" }}>{props.capacity}</span>
          <span style={{ color: "#6b7280", margin: "0 2px" }}>/</span>
          <span style={{ color: "#6b7280" }}>100</span>
        </div>
        <div
          style={{
            width: "80px",
            height: "6px",
            backgroundColor: "#e5e7eb",
            borderRadius: "3px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${props.capacity}%`,
              height: "100%",
              backgroundColor: "#22c55e",
              borderRadius: "3px",
            }}
          />
        </div>
      </div>

      {/* Resources */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "120px",
        }}
      >
        <div
          style={{
            color: "#1f2937",
            marginBottom: "4px",
          }}
        >
          <span style={{ fontWeight: "500" }}>Food:</span> {props.foodStatus}
        </div>
        <div
          style={{
            color: "#1f2937",
          }}
        >
          <span style={{ fontWeight: "500" }}>Medical:</span>
          <span style={{ color: "#f59e0b", marginLeft: "4px" }}>
            {props.medicalStatus}
          </span>
        </div>
      </div>

      {/* Action Links */}
      <div
        style={{
          display: "flex",
          gap: "16px",
          alignItems: "center",
          width: "120px",
        }}
        onClick={handleDetailsClick}
      >
        <a
          href="#"
          style={{
            color: "#3b82f6",
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: "500",
          }}
        >
          Details
        </a>
        <a
          href="#"
          style={{
            color: "#3b82f6",
            textDecoration: "none",
            fontSize: "14px",
            fontWeight: "500",
          }}
          onClick={handleSupplyClick}
        >
          Supply
        </a>
      </div>
    </div>
  );
};

export default Shelter;
