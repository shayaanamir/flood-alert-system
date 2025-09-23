import React from "react";

const Shelter = () => {
  const capacityPercentage = 45;

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
          Central Community Center
        </h3>
        <span
          style={{
            color: "#6b7280",
            fontSize: "13px",
          }}
        >
          ID: SH-001
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
          123 Main St, Rivertown
        </div>
        <div
          style={{
            color: "#6b7280",
          }}
        >
          Zone A
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
          <span style={{ color: "#1f2937" }}>{capacityPercentage}</span>
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
              width: `${capacityPercentage}%`,
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
          <span style={{ fontWeight: "500" }}>Food:</span> Adequate
        </div>
        <div
          style={{
            color: "#1f2937",
          }}
        >
          <span style={{ fontWeight: "500" }}>Medical:</span>
          <span style={{ color: "#f59e0b", marginLeft: "4px" }}>Low</span>
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
        >
          Supply
        </a>
      </div>
    </div>
  );
};

export default Shelter;
