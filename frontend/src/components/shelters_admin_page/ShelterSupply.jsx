import { useState, useEffect } from "react";
import {
  Search,
  Filter,
  MapPin,
  Users,
  Package,
  AlertCircle,
  TrendingUp,
  Phone,
  Mail,
  Clock,
  Calendar,
  X,
  Plus,
  Minus,
  CheckCircle,
  AlertTriangle,
  Activity,
  Home,
} from "lucide-react";

const StatusBadge = ({ status }) => {
  const styles = {
    Active: { bg: "#d1fae5", color: "#065f46", text: "Active" },
    "Near Capacity": { bg: "#fed7aa", color: "#92400e", text: "Near Capacity" },
    Full: { bg: "#fecaca", color: "#991b1b", text: "Full" },
    Inactive: { bg: "#e5e7eb", color: "#374151", text: "Inactive" },
  };

  const style = styles[status] || styles["Active"];

  return (
    <span
      style={{
        display: "inline-block",
        padding: "6px 14px",
        borderRadius: "20px",
        fontSize: "13px",
        fontWeight: "600",
        background: style.bg,
        color: style.color,
      }}
    >
      {style.text}
    </span>
  );
};

// Resource status component
const ResourceStatus = ({ status }) => {
  const styles = {
    Good: { color: "#16a34a", text: "Good" },
    Adequate: { color: "#2563eb", text: "Adequate" },
    Low: { color: "#ea580c", text: "Low" },
    Critical: { color: "#dc2626", text: "Critical" },
  };

  const style = styles[status] || styles["Adequate"];

  return (
    <span style={{ color: style.color, fontWeight: "600" }}>{style.text}</span>
  );
};

export default function ShelterSupply({ shelter, onClose }) {
  if (!shelter) return null;

  const [supplies, setSupplies] = useState({
    food: 0,
    medical: 0,
    water: 0,
    blankets: 0,
  });

  const handleIncrement = (item) => {
    setSupplies((prev) => ({ ...prev, [item]: prev[item] + 1 }));
  };

  const handleDecrement = (item) => {
    setSupplies((prev) => ({ ...prev, [item]: Math.max(0, prev[item] - 1) }));
  };

  const handleSubmit = () => {
    alert(
      `Supply request submitted for ${shelter.name}:\n` +
        Object.entries(supplies)
          .filter(([_, qty]) => qty > 0)
          .map(([item, qty]) => `${item}: ${qty} units`)
          .join("\n")
    );
    onClose();
  };

  const totalItems = Object.values(supplies).reduce((a, b) => a + b, 0);

  return (
    <>
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(4px)",
          zIndex: 1000,
        }}
        onClick={onClose}
      />

      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1001,
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
            maxWidth: "600px",
            maxHeight: "90vh",
            width: "100%",
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
              borderRadius: "20px 20px 0 0",
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
                  <Package size={28} />
                  <h2
                    style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}
                  >
                    Request Supplies
                  </h2>
                </div>
                <p style={{ margin: 0, opacity: 0.9, fontSize: "14px" }}>
                  {shelter.name}
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
              maxHeight: "calc(90vh - 120px)",
            }}
          >
            <div style={{ marginBottom: "24px" }}>
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "16px",
                }}
              >
                Current Stock Levels
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "12px",
                }}
              >
                {Object.entries(shelter.resources).map(([key, resource]) => (
                  <div
                    key={key}
                    style={{
                      background: "#f9fafb",
                      padding: "12px",
                      borderRadius: "8px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "14px",
                        color: "#6b7280",
                        textTransform: "capitalize",
                      }}
                    >
                      {key}
                    </span>
                    <div style={{ textAlign: "right" }}>
                      <div
                        style={{
                          fontSize: "16px",
                          fontWeight: "600",
                          color: "#1f2937",
                        }}
                      >
                        {resource.quantity} {resource.unit}
                      </div>
                      <ResourceStatus status={resource.status} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: "24px" }}>
              <h3
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  color: "#374151",
                  marginBottom: "16px",
                }}
              >
                Request Quantities
              </h3>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                {Object.keys(shelter.resources).map((item) => (
                  <div
                    key={item}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "16px",
                      background: "#f9fafb",
                      borderRadius: "12px",
                      border: "1px solid #e5e7eb",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "15px",
                        fontWeight: "600",
                        color: "#374151",
                        textTransform: "capitalize",
                      }}
                    >
                      {item}
                    </span>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                      }}
                    >
                      <button
                        onClick={() => handleDecrement(item)}
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "8px",
                          border: "1px solid #e5e7eb",
                          background: "white",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) =>
                          (e.target.style.background = "#f3f4f6")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.background = "white")
                        }
                      >
                        <Minus size={18} style={{ color: "#6b7280" }} />
                      </button>
                      <span
                        style={{
                          fontSize: "18px",
                          fontWeight: "700",
                          color: "#1f2937",
                          minWidth: "40px",
                          textAlign: "center",
                        }}
                      >
                        {supplies[item]}
                      </span>
                      <button
                        onClick={() => handleIncrement(item)}
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "8px",
                          border: "1px solid #e5e7eb",
                          background: "white",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "all 0.2s",
                        }}
                        onMouseEnter={(e) =>
                          (e.target.style.background = "#f3f4f6")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.background = "white")
                        }
                      >
                        <Plus size={18} style={{ color: "#6b7280" }} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {totalItems > 0 && (
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
                      Total Items: {totalItems} units
                    </div>
                    <div
                      style={{
                        fontSize: "13px",
                        color: "#047857",
                        marginTop: "2px",
                      }}
                    >
                      Your request will be processed within 24 hours
                    </div>
                  </div>
                </div>
              </div>
            )}

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
                disabled={totalItems === 0}
                style={{
                  flex: 1,
                  padding: "14px",
                  borderRadius: "10px",
                  border: "none",
                  background:
                    totalItems > 0
                      ? "linear-gradient(135deg, #16a34a 0%, #22c55e 100%)"
                      : "#e5e7eb",
                  fontSize: "15px",
                  fontWeight: "600",
                  color: "white",
                  cursor: totalItems > 0 ? "pointer" : "not-allowed",
                  transition: "all 0.2s",
                  opacity: totalItems > 0 ? 1 : 0.6,
                }}
                onMouseEnter={(e) => {
                  if (totalItems > 0)
                    e.target.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  if (totalItems > 0)
                    e.target.style.transform = "translateY(0)";
                }}
              >
                Submit Request
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
