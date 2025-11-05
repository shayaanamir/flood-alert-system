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

// Respond Modal
export default function DamageRespond({ report, onClose }) {
  if (!report) return null;

  const [responseData, setResponseData] = useState({
    status: "In Progress",
    assignedTeam: "",
    estimatedTime: "",
    notes: "",
  });

  const handleSubmit = () => {
    alert(
      `Response submitted for ${report.title}\n\nStatus: ${responseData.status}\nAssigned Team: ${responseData.assignedTeam}\nNotes: ${responseData.notes}`
    );
    onClose();
  };

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
            maxWidth: "700px",
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
              background: "linear-gradient(135deg, #16a34a 0%, #22c55e 100%)",
              padding: "24px 32px",
              color: "white",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "8px",
                  }}
                >
                  <Send size={28} />
                  <h2
                    style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}
                  >
                    Respond to Report
                  </h2>
                </div>
                <p style={{ margin: 0, opacity: 0.9, fontSize: "14px" }}>
                  {report.title}
                </p>
              </div>
              <button
                onClick={onClose}
                style={{
                  background: "rgba(255, 255, 255, 0.2)",
                  border: "none",
                  borderRadius: "10px",
                  padding: "8px",
                  cursor: "pointer",
                }}
              >
                <X style={{ color: "white" }} size={24} />
              </button>
            </div>
          </div>

          {/* Content */}
          <div
            style={{
              padding: "32px",
              overflowY: "auto",
              maxHeight: "calc(90vh - 180px)",
            }}
          >
            <div style={{ marginBottom: "24px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "8px",
                }}
              >
                Update Status
              </label>
              <select
                value={responseData.status}
                onChange={(e) =>
                  setResponseData({ ...responseData, status: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid #e5e7eb",
                  fontSize: "15px",
                  outline: "none",
                }}
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "8px",
                }}
              >
                Assign Response Team
              </label>
              <input
                type="text"
                value={responseData.assignedTeam}
                onChange={(e) =>
                  setResponseData({
                    ...responseData,
                    assignedTeam: e.target.value,
                  })
                }
                placeholder="e.g., Emergency Response Team A"
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid #e5e7eb",
                  fontSize: "15px",
                  outline: "none",
                }}
              />
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "8px",
                }}
              >
                Estimated Response Time
              </label>
              <input
                type="text"
                value={responseData.estimatedTime}
                onChange={(e) =>
                  setResponseData({
                    ...responseData,
                    estimatedTime: e.target.value,
                  })
                }
                placeholder="e.g., 2 hours"
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid #e5e7eb",
                  fontSize: "15px",
                  outline: "none",
                }}
              />
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "8px",
                }}
              >
                Response Notes
              </label>
              <textarea
                value={responseData.notes}
                onChange={(e) =>
                  setResponseData({ ...responseData, notes: e.target.value })
                }
                placeholder="Enter detailed response plan and actions taken..."
                rows="5"
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "10px",
                  border: "1px solid #e5e7eb",
                  fontSize: "15px",
                  outline: "none",
                  resize: "vertical",
                  fontFamily: "inherit",
                }}
              />
            </div>

            <div
              style={{
                background: "#ecfdf5",
                padding: "16px",
                borderRadius: "12px",
                border: "1px solid #6ee7b7",
                marginBottom: "24px",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <CheckCircle style={{ color: "#059669" }} size={20} />
                <div>
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#065f46",
                    }}
                  >
                    Quick Response Tips
                  </div>
                  <div
                    style={{
                      fontSize: "13px",
                      color: "#047857",
                      marginTop: "4px",
                    }}
                  >
                    Prioritize life safety, assess immediate dangers, coordinate
                    with emergency services
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
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
                Cancel
              </button>
              <button
                onClick={handleSubmit}
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
                }}
                onMouseEnter={(e) =>
                  (e.target.style.transform = "translateY(-2px)")
                }
                onMouseLeave={(e) =>
                  (e.target.style.transform = "translateY(0)")
                }
              >
                Submit Response
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
