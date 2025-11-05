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

// Sample shelter data

// Status badge component
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

// Details Modal
export default function ShelterDetails({ shelter, onClose }) {
  if (!shelter) return null;

  const capacityPercentage =
    (shelter.capacity.current / shelter.capacity.max) * 100;

  useEffect(() => {
    console.log("indicidual dfada", shelter);
  });

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
            maxWidth: "1000px",
            width: "100%",
            maxHeight: "100vh",
            overflow: "hidden",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            animation: "slideUp 0.3s ease-out",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)",
              padding: "24px 32px",
              color: "white",
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
                <Home size={28} />
                <h2 style={{ fontSize: "26px", fontWeight: "bold", margin: 0 }}>
                  {shelter.name}
                </h2>
              </div>
              <p style={{ margin: "4px 0", opacity: 0.9, fontSize: "15px" }}>
                ID: {shelter.id}
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginTop: "8px",
                }}
              >
                <MapPin size={16} />
                <span style={{ fontSize: "14px" }}>{shelter.address}</span>
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
          <div style={{ overflowY: "auto", maxHeight: "calc(90vh - 120px)" }}>
            {/* Stats Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "16px",
                padding: "24px 32px",
                background: "#f9fafb",
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              <div
                style={{
                  background: "white",
                  padding: "16px",
                  borderRadius: "12px",
                  border: "1px solid #e5e7eb",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "8px",
                    color: "#6b7280",
                    fontSize: "13px",
                  }}
                >
                  <Users size={16} />
                  <span>Occupancy</span>
                </div>
                <div
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#1f2937",
                  }}
                >
                  {capacityPercentage}
                </div>
                <div
                  style={{
                    width: "100%",
                    height: "6px",
                    background: "#e5e7eb",
                    borderRadius: "3px",
                    marginTop: "12px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${capacityPercentage}%`,
                      height: "100%",
                      background:
                        capacityPercentage > 80
                          ? "#ef4444"
                          : capacityPercentage > 60
                          ? "#f59e0b"
                          : "#10b981",
                      borderRadius: "3px",
                      transition: "width 0.3s",
                    }}
                  />
                </div>
              </div>

              <div
                style={{
                  background: "white",
                  padding: "16px",
                  borderRadius: "12px",
                  border: "1px solid #e5e7eb",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "8px",
                    color: "#6b7280",
                    fontSize: "13px",
                  }}
                >
                  <Activity size={16} />
                  <span>Status</span>
                </div>
                <StatusBadge status={shelter.status} />
                <div
                  style={{
                    marginTop: "8px",
                    fontSize: "13px",
                    color: "#6b7280",
                  }}
                >
                  Zone:{" "}
                  <span style={{ fontWeight: "600", color: "#374151" }}>
                    {shelter.zone}
                  </span>
                </div>
              </div>

              <div
                style={{
                  background: "white",
                  padding: "16px",
                  borderRadius: "12px",
                  border: "1px solid #e5e7eb",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    marginBottom: "8px",
                    color: "#6b7280",
                    fontSize: "13px",
                  }}
                >
                  <Clock size={16} />
                  <span>Opened</span>
                </div>
                <div
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#1f2937",
                  }}
                >
                  {new Date(shelter.openedDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "#6b7280",
                    marginTop: "4px",
                  }}
                >
                  {Math.floor(
                    (new Date() - new Date(shelter.openedDate)) /
                      (1000 * 60 * 60 * 24)
                  )}{" "}
                  days active
                </div>
              </div>
            </div>

            <div style={{ padding: "24px 32px" }}>
              {/* Demographics */}
              <div style={{ marginBottom: "32px" }}>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    color: "#1f2937",
                    marginBottom: "16px",
                  }}
                >
                  Demographics
                </h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "16px",
                  }}
                >
                  {[
                    {
                      label: "Adults",
                      value: shelter.demographics.adults,
                      color: "#3b82f6",
                    },
                    {
                      label: "Children",
                      value: shelter.demographics.children,
                      color: "#10b981",
                    },
                    {
                      label: "Seniors",
                      value: shelter.demographics.seniors,
                      color: "#8b5cf6",
                    },
                  ].map((demo, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: "#f9fafb",
                        padding: "16px",
                        borderRadius: "12px",
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "28px",
                          fontWeight: "bold",
                          color: demo.color,
                        }}
                      >
                        {demo.value}
                      </div>
                      <div
                        style={{
                          fontSize: "14px",
                          color: "#6b7280",
                          marginTop: "4px",
                        }}
                      >
                        {demo.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resources */}
              <div style={{ marginBottom: "32px" }}>
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
                  <Package size={20} />
                  Resources & Supplies
                </h3>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "16px",
                  }}
                >
                  {Object.entries(shelter.resources).map(([key, resource]) => (
                    <div
                      key={key}
                      style={{
                        background: "#f9fafb",
                        padding: "16px",
                        borderRadius: "12px",
                        border: "1px solid #e5e7eb",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          marginBottom: "8px",
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
                          {key}
                        </span>
                        <ResourceStatus status={resource.status} />
                      </div>
                      <div
                        style={{
                          fontSize: "20px",
                          fontWeight: "bold",
                          color: "#1f2937",
                        }}
                      >
                        {resource.quantity} {resource.unit}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div style={{ marginBottom: "32px" }}>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    color: "#1f2937",
                    marginBottom: "16px",
                  }}
                >
                  Contact Information
                </h3>
                <div
                  style={{
                    background: "#f9fafb",
                    padding: "20px",
                    borderRadius: "12px",
                  }}
                >
                  <div style={{ marginBottom: "12px" }}>
                    <span style={{ fontSize: "14px", color: "#6b7280" }}>
                      Manager:
                    </span>
                    <div
                      style={{
                        fontSize: "16px",
                        fontWeight: "600",
                        color: "#1f2937",
                        marginTop: "4px",
                      }}
                    >
                      {shelter.contact.manager}
                    </div>
                  </div>
                  <div
                    style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <Phone size={16} style={{ color: "#3b82f6" }} />
                      <span style={{ fontSize: "14px", color: "#374151" }}>
                        {shelter.contact.phone}
                      </span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <Mail size={16} style={{ color: "#3b82f6" }} />
                      <span style={{ fontSize: "14px", color: "#374151" }}>
                        {shelter.contact.email}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Facilities */}
              <div style={{ marginBottom: "32px" }}>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    color: "#1f2937",
                    marginBottom: "16px",
                  }}
                >
                  Facilities
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {shelter.facilities.map((facility, idx) => (
                    <span
                      key={idx}
                      style={{
                        background: "#eff6ff",
                        color: "#1e40af",
                        padding: "8px 16px",
                        borderRadius: "8px",
                        fontSize: "14px",
                        fontWeight: "500",
                        border: "1px solid #bfdbfe",
                      }}
                    >
                      {facility}
                    </span>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <h3
                  style={{
                    fontSize: "18px",
                    fontWeight: "700",
                    color: "#1f2937",
                    marginBottom: "16px",
                  }}
                >
                  Notes & Updates
                </h3>
                <div
                  style={{
                    background: "#fef3c7",
                    padding: "16px",
                    borderRadius: "12px",
                    border: "1px solid #fcd34d",
                  }}
                >
                  <div style={{ display: "flex", gap: "12px" }}>
                    <AlertCircle
                      style={{
                        color: "#d97706",
                        flexShrink: 0,
                        marginTop: "2px",
                      }}
                      size={20}
                    />
                    <div>
                      <p
                        style={{
                          margin: 0,
                          fontSize: "14px",
                          color: "#78350f",
                          lineHeight: "1.6",
                        }}
                      >
                        {shelter.notes}
                      </p>
                      <p
                        style={{
                          margin: "8px 0 0 0",
                          fontSize: "12px",
                          color: "#92400e",
                        }}
                      >
                        Last updated:{" "}
                        {new Date(shelter.lastUpdated).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
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
