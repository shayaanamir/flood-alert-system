import React, { useState } from "react";
import {
  Cloud,
  CloudRain,
  Sun,
  CloudDrizzle,
  Wind,
  Droplets,
  Eye,
  X,
  Calendar,
} from "lucide-react";

const WeatherIcon = ({ type, size = 40 }) => {
  const iconProps = { size, strokeWidth: 2 };

  switch (type) {
    case "rain":
      return <CloudRain {...iconProps} className="text-blue-600" />;
    case "drizzle":
      return <CloudDrizzle {...iconProps} className="text-blue-500" />;
    case "cloud":
      return <Cloud {...iconProps} className="text-gray-500" />;
    case "sun":
      return <Sun {...iconProps} className="text-yellow-500" />;
    default:
      return <Cloud {...iconProps} className="text-gray-400" />;
  }
};

export default function HourlyPopup({ data, onClose }) {
  if (!data) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        style={{
          position: "fixed",
          inset: "0",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(4px)",
          zIndex: 1000,
          transition: "opacity 0.3s",
        }}
        onClick={onClose}
      />

      {/* Popup */}
      <div
        style={{
          position: "fixed",
          inset: "0",
          zIndex: 1001,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px",
        }}
      >
        <div
          style={{
            background: "white",
            borderRadius: "24px",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            maxWidth: "672px",
            width: "100%",
            maxHeight: "90vh",
            overflow: "hidden",
            animation: "slideUp 0.3s ease-out",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "linear-gradient(to bottom right, #2563eb, #4f46e5)",
              padding: "24px",
              position: "relative",
            }}
          >
            <button
              onClick={onClose}
              style={{
                position: "absolute",
                top: "16px",
                right: "16px",
                padding: "8px",
                background: "rgba(255, 255, 255, 0.2)",
                borderRadius: "12px",
                border: "none",
                cursor: "pointer",
                backdropFilter: "blur(4px)",
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

            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div
                style={{
                  background: "rgba(255, 255, 255, 0.2)",
                  backdropFilter: "blur(8px)",
                  padding: "16px",
                  borderRadius: "16px",
                }}
              >
                <WeatherIcon type={data.icon} size={48} />
              </div>

              <div style={{ color: "white" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    marginBottom: "4px",
                  }}
                >
                  <h2
                    style={{ fontSize: "30px", fontWeight: "bold", margin: 0 }}
                  >
                    {data.day}
                  </h2>
                  <span style={{ color: "#bfdbfe", fontSize: "18px" }}>
                    {data.date}
                  </span>
                </div>
                <p
                  style={{
                    color: "#bfdbfe",
                    fontSize: "18px",
                    margin: "0 0 12px 0",
                  }}
                >
                  {data.condition}
                </p>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "16px" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      background: "rgba(255, 255, 255, 0.2)",
                      backdropFilter: "blur(8px)",
                      padding: "8px 16px",
                      borderRadius: "12px",
                    }}
                  >
                    <Droplets size={20} />
                    <span style={{ fontWeight: "600", fontSize: "20px" }}>
                      {data.rainfall}mm
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      background: "rgba(255, 255, 255, 0.2)",
                      backdropFilter: "blur(8px)",
                      padding: "8px 16px",
                      borderRadius: "12px",
                    }}
                  >
                    <span style={{ fontWeight: "600", fontSize: "20px" }}>
                      {data.temp}°C
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div
            style={{
              padding: "24px",
              overflowY: "auto",
              maxHeight: "calc(90vh - 200px)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "16px",
                color: "#4b5563",
              }}
            >
              <Calendar size={20} />
              <h3 style={{ fontSize: "18px", fontWeight: "600", margin: 0 }}>
                Hourly Breakdown
              </h3>
            </div>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {data.hourly.map((hour, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "16px",
                    background: "linear-gradient(to right, #f9fafb, #eff6ff)",
                    borderRadius: "16px",
                    border: "1px solid #e5e7eb",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#bfdbfe";
                    e.currentTarget.style.boxShadow =
                      "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#e5e7eb";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      flex: 1,
                    }}
                  >
                    <div
                      style={{
                        width: "64px",
                        fontSize: "16px",
                        fontWeight: "600",
                        color: "#374151",
                        background: "white",
                        padding: "8px 12px",
                        borderRadius: "12px",
                        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                      }}
                    >
                      {hour.time}
                    </div>
                    <div
                      style={{
                        background: "white",
                        padding: "8px",
                        borderRadius: "12px",
                        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                      }}
                    >
                      <WeatherIcon type={hour.icon} size={28} />
                    </div>
                    <span
                      style={{
                        fontSize: "16px",
                        fontWeight: "500",
                        color: "#374151",
                      }}
                    >
                      {hour.condition}
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "24px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        background: "#dbeafe",
                        padding: "8px 16px",
                        borderRadius: "12px",
                      }}
                    >
                      <Droplets size={18} style={{ color: "#2563eb" }} />
                      <span
                        style={{
                          fontSize: "16px",
                          fontWeight: "bold",
                          color: "#1d4ed8",
                          minWidth: "40px",
                          textAlign: "right",
                        }}
                      >
                        {hour.rainfall}mm
                      </span>
                    </div>

                    <div
                      style={{
                        background: "white",
                        padding: "8px 16px",
                        borderRadius: "12px",
                        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                        minWidth: "60px",
                        textAlign: "center",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "16px",
                          fontWeight: "bold",
                          color: "#1f2937",
                        }}
                      >
                        {hour.temp}°C
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: "24px",
                padding: "16px",
                background: "linear-gradient(to right, #eff6ff, #eef2ff)",
                borderRadius: "16px",
                border: "1px solid #bfdbfe",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                }}
              >
                <Wind
                  style={{ color: "#2563eb", marginTop: "2px" }}
                  size={22}
                />
                <div>
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#1e3a8a",
                      margin: "0 0 4px 0",
                    }}
                  >
                    Weather Insight
                  </p>
                  <p style={{ fontSize: "14px", color: "#1e40af", margin: 0 }}>
                    {data.rainfall > 40
                      ? "Heavy rainfall expected. Plan indoor activities and stay safe."
                      : data.rainfall > 20
                      ? "Moderate rainfall likely. Carry an umbrella when going out."
                      : "Light rainfall possible. Weather conditions are favorable."}
                  </p>
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
