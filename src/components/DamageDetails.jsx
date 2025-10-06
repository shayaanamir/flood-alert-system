import React, { useState } from "react";
import {
  Search,
  RefreshCw,
  MapPin,
  Clock,
  User,
  X,
  Camera,
  AlertTriangle,
  CheckCircle,
  Send,
  Upload,
} from "lucide-react";

// Severity badge component
const SeverityBadge = ({ severity }) => {
  const styles = {
    Critical: { bg: "#fee2e2", color: "#991b1b", border: "#fecaca" },
    High: { bg: "#fed7aa", color: "#9a3412", border: "#fdba74" },
    Medium: { bg: "#fef3c7", color: "#92400e", border: "#fde68a" },
    Low: { bg: "#dbeafe", color: "#1e40af", border: "#bfdbfe" },
  };

  const style = styles[severity] || styles["Medium"];

  return (
    <span
      style={{
        display: "inline-block",
        padding: "6px 14px",
        borderRadius: "6px",
        fontSize: "12px",
        fontWeight: "600",
        background: style.bg,
        color: style.color,
        border: `1px solid ${style.border}`,
      }}
    >
      {severity}
    </span>
  );
};

// Status badge component
const StatusBadge = ({ status }) => {
  const styles = {
    Pending: { bg: "#fef3c7", color: "#92400e", icon: <Clock size={14} /> },
    "In Progress": {
      bg: "#dbeafe",
      color: "#1e40af",
      icon: <RefreshCw size={14} />,
    },
    Resolved: {
      bg: "#d1fae5",
      color: "#065f46",
      icon: <CheckCircle size={14} />,
    },
  };

  const style = styles[status] || styles["Pending"];

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "6px 12px",
        borderRadius: "6px",
        fontSize: "13px",
        fontWeight: "600",
        background: style.bg,
        color: style.color,
      }}
    >
      {style.icon}
      {status}
    </span>
  );
};

// View Details Modal
export default function DamageDetails({ report, onClose, onRespond }) {
  if (!report) return null;

  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <>
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(4px)",
          zIndex: 50,
        }}
        onClick={onClose}
      />

      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 51,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <div
          style={{
            background: "white",
            borderRadius: "20px",
            maxWidth: "1000px",
            width: "100%",
            maxHeight: "90vh",
            overflow: "hidden",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            animation: "slideUp 0.3s ease-out",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "linear-gradient(135deg, #dc2626 0%, #ef4444 100%)",
              padding: "24px 32px",
              color: "white",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <div style={{ flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "8px",
                }}
              >
                <AlertTriangle size={28} />
                <h2 style={{ fontSize: "26px", fontWeight: "bold", margin: 0 }}>
                  {report.title}
                </h2>
              </div>
              <p style={{ margin: "4px 0", opacity: 0.9, fontSize: "14px" }}>
                Report ID: {report.id}
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                  marginTop: "12px",
                }}
              >
                <SeverityBadge severity={report.severity} />
                <StatusBadge status={report.status} />
              </div>
            </div>
            <button
              onClick={onClose}
              style={{
                background: "rgba(255, 255, 255, 0.2)",
                border: "none",
                borderRadius: "10px",
                padding: "8px",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.target.style.background = "rgba(255, 255, 255, 0.3)")
              }
              onMouseLeave={(e) =>
                (e.target.style.background = "rgba(255, 255, 255, 0.2)")
              }
            >
              <X style={{ color: "white" }} size={24} />
            </button>
          </div>

          {/* Content */}
          <div style={{ overflowY: "auto", maxHeight: "calc(90vh - 200px)" }}>
            {/* Image Gallery */}
            <div
              style={{
                padding: "24px 32px",
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              <h3
                style={{
                  fontSize: "18px",
                  fontWeight: "700",
                  color: "#1f2937",
                  marginBottom: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Camera size={20} />
                Damage Photos ({report.images.length})
              </h3>

              {/* Main Image */}
              <div
                style={{
                  width: "100%",
                  height: "400px",
                  borderRadius: "12px",
                  overflow: "hidden",
                  marginBottom: "16px",
                  background: "#f3f4f6",
                }}
              >
                <img
                  src={report.images[selectedImage]}
                  alt="Damage"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>

              {/* Thumbnails */}
              <div style={{ display: "flex", gap: "12px", overflowX: "auto" }}>
                {report.images.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    style={{
                      width: "100px",
                      height: "80px",
                      borderRadius: "8px",
                      overflow: "hidden",
                      cursor: "pointer",
                      border:
                        selectedImage === idx
                          ? "3px solid #3b82f6"
                          : "2px solid #e5e7eb",
                      transition: "all 0.2s",
                      flexShrink: 0,
                    }}
                    onMouseEnter={(e) => {
                      if (selectedImage !== idx)
                        e.currentTarget.style.borderColor = "#9ca3af";
                    }}
                    onMouseLeave={(e) => {
                      if (selectedImage !== idx)
                        e.currentTarget.style.borderColor = "#e5e7eb";
                    }}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Report Details */}
            <div style={{ padding: "24px 32px" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "24px",
                  marginBottom: "24px",
                }}
              >
                <div>
                  <h4
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#6b7280",
                      marginBottom: "8px",
                    }}
                  >
                    Location
                  </h4>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      color: "#1f2937",
                    }}
                  >
                    <MapPin size={18} style={{ color: "#3b82f6" }} />
                    <span style={{ fontSize: "15px", fontWeight: "500" }}>
                      {report.location}
                    </span>
                  </div>
                </div>

                <div>
                  <h4
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#6b7280",
                      marginBottom: "8px",
                    }}
                  >
                    Reported By
                  </h4>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      color: "#1f2937",
                    }}
                  >
                    <User size={18} style={{ color: "#3b82f6" }} />
                    <span style={{ fontSize: "15px", fontWeight: "500" }}>
                      {report.reportedBy}
                    </span>
                  </div>
                </div>

                <div>
                  <h4
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#6b7280",
                      marginBottom: "8px",
                    }}
                  >
                    Time Reported
                  </h4>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      color: "#1f2937",
                    }}
                  >
                    <Clock size={18} style={{ color: "#3b82f6" }} />
                    <span style={{ fontSize: "15px", fontWeight: "500" }}>
                      {report.timestamp}
                    </span>
                  </div>
                </div>

                <div>
                  <h4
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#6b7280",
                      marginBottom: "8px",
                    }}
                  >
                    Priority Level
                  </h4>
                  <div
                    style={{
                      fontSize: "15px",
                      fontWeight: "600",
                      color: "#dc2626",
                    }}
                  >
                    Priority {report.priority}
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: "24px" }}>
                <h4
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#6b7280",
                    marginBottom: "8px",
                  }}
                >
                  Description
                </h4>
                <p
                  style={{
                    fontSize: "15px",
                    color: "#374151",
                    lineHeight: "1.6",
                    margin: 0,
                  }}
                >
                  {report.description}
                </p>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "16px",
                  marginBottom: "24px",
                }}
              >
                <div
                  style={{
                    background: "#f9fafb",
                    padding: "16px",
                    borderRadius: "12px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "24px",
                      fontWeight: "bold",
                      color: "#dc2626",
                    }}
                  >
                    {report.affectedPeople}
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      color: "#6b7280",
                      marginTop: "4px",
                    }}
                  >
                    People Affected
                  </div>
                </div>
                <div
                  style={{
                    background: "#f9fafb",
                    padding: "16px",
                    borderRadius: "12px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "24px",
                      fontWeight: "bold",
                      color: "#f59e0b",
                    }}
                  >
                    {report.estimatedCost}
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      color: "#6b7280",
                      marginTop: "4px",
                    }}
                  >
                    Est. Damage Cost
                  </div>
                </div>
                <div
                  style={{
                    background: "#f9fafb",
                    padding: "16px",
                    borderRadius: "12px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "24px",
                      fontWeight: "bold",
                      color: "#3b82f6",
                    }}
                  >
                    {report.images.length}
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      color: "#6b7280",
                      marginTop: "4px",
                    }}
                  >
                    Photos Attached
                  </div>
                </div>
              </div>

              <div
                style={{
                  background: "#eff6ff",
                  padding: "16px",
                  borderRadius: "12px",
                  border: "1px solid #bfdbfe",
                }}
              >
                <h4
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#1e40af",
                    marginBottom: "8px",
                  }}
                >
                  Contact Information
                </h4>
                <div
                  style={{
                    display: "flex",
                    gap: "24px",
                    fontSize: "14px",
                    color: "#1e40af",
                  }}
                >
                  <span>📞 {report.contact.phone}</span>
                  <span>✉️ {report.contact.email}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div
              style={{
                padding: "24px 32px",
                borderTop: "1px solid #e5e7eb",
                display: "flex",
                gap: "12px",
              }}
            >
              <button
                onClick={onClose}
                style={{
                  flex: 1,
                  padding: "14px",
                  borderRadius: "10px",
                  border: "1px solid #e5e7eb",
                  background: "white",
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "#374151",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => (e.target.style.background = "#f9fafb")}
                onMouseLeave={(e) => (e.target.style.background = "white")}
              >
                Close
              </button>
              <button
                onClick={() => {
                  onClose();
                  onRespond();
                }}
                style={{
                  flex: 1,
                  padding: "14px",
                  borderRadius: "10px",
                  border: "none",
                  background:
                    "linear-gradient(135deg, #16a34a 0%, #22c55e 100%)",
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "white",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.transform = "translateY(-2px)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.transform = "translateY(0)")
                }
              >
                <Send size={18} />
                Respond to Report
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </>
  );
}
