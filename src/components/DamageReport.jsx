import React from "react";
import { useEffect } from "react";

const DamageReport = (report) => {
  useEffect(() => {
    console.log(report);
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        borderLeft: "4px solid #ef4444",
        padding: "16px 20px",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        fontSize: "14px",
        lineHeight: "1.4",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        width: "32%",
        marginBottom: "1%",
      }}
    >
      {/* Header Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "12px",
        }}
      >
        <span
          style={{
            backgroundColor: "#fee2e2",
            color: "#dc2626",
            padding: "4px 12px",
            borderRadius: "12px",
            fontSize: "12px",
            fontWeight: "600",
          }}
        >
          {report.report.severity}
        </span>
        <span
          style={{
            color: "#6b7280",
            fontSize: "13px",
          }}
        >
          {report.report.timeAgo}
        </span>
      </div>

      {/* Title */}
      <h3
        style={{
          margin: "0 0 12px 0",
          fontSize: "18px",
          fontWeight: "600",
          color: "#1f2937",
          lineHeight: "1.3",
        }}
      >
        {report.report.title}
      </h3>

      {/* Description */}
      <p
        style={{
          margin: "0 0 16px 0",
          color: "#4b5563",
          fontSize: "14px",
          lineHeight: "1.5",
        }}
      >
        {report.report.description}
      </p>

      {/* Location */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "16px",
          color: "#6b7280",
          fontSize: "13px",
        }}
      >
        <svg
          width="16"
          height="16"
          style={{
            marginRight: "6px",
            fill: "currentColor",
          }}
          viewBox="0 0 16 16"
        >
          <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
        </svg>
        {report.report.location}
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "12px",
          borderTop: "1px solid #f3f4f6",
        }}
      >
        <span
          style={{
            color: "#6b7280",
            fontSize: "13px",
          }}
        >
          {report.report.reportedBy}
        </span>
        <div
          style={{
            display: "flex",
            gap: "12px",
          }}
        >
          <button
            style={{
              backgroundColor: "#dbeafe",
              color: "#1d4ed8",
              border: "none",
              padding: "6px 16px",
              borderRadius: "6px",
              fontSize: "13px",
              fontWeight: "500",
              cursor: "pointer",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#bfdbfe")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#dbeafe")}
            onClick={(e) => {
              e.stopPropagation();
              report.onView();
            }}
          >
            View
          </button>
          <button
            style={{
              backgroundColor: "#dcfce7",
              color: "#166534",
              border: "none",
              padding: "6px 16px",
              borderRadius: "6px",
              fontSize: "13px",
              fontWeight: "500",
              cursor: "pointer",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#bbf7d0")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#dcfce7")}
            onClick={(e) => {
              e.stopPropagation();
              report.onRespond();
            }}
          >
            Respond
          </button>
        </div>
      </div>
    </div>
  );
};

export default DamageReport;
