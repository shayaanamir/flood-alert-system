import React, { useEffect, useState } from "react";
import "../styles/components/RiskAssessment.css";

const RiskAssessment = ({ weatherData }) => {
  const [riskLevel, setRiskLevel] = useState("Low");
  const [expectedRainfall, setExpectedRainfall] = useState(0);
  const [floodProbability, setFloodProbability] = useState(0);
  const [significantFloodingRisk, setSignificantFloodingRisk] = useState(false);
  const [riskDescription, setRiskDescription] = useState(
    "Low flood risk. Continue to monitor conditions."
  );
  const [riskProgress, setRiskProgress] = useState(30);

  useEffect(() => {
    if (!weatherData) return;
    console.log("DAILY DATA: ", weatherData);

    // Calculate risk level - use correct field names
    const precipitation = weatherData.precipitation || 0;
    const humidity =
      weatherData.relative_humidity_2m || weatherData.humidity || 0;
    const windSpeed = weatherData.wind_speed_10m || weatherData.wind_speed || 0;

    let level = "Low";
    if (precipitation > 10) {
      level = "High";
    } else if (precipitation > 5) {
      level = "Moderate";
    }
    setRiskLevel(level);

    // Calculate expected rainfall
    setExpectedRainfall(precipitation);

    // Calculate flood probability
    const pressure = weatherData.pressure_msl || weatherData.pressure || 1013;
    const precipFactor = Math.min(precipitation * 5, 50);
    const humidityFactor = Math.min((humidity - 50) * 0.8, 30);
    const pressureFactor = pressure < 1000 ? 20 : 0;
    const totalProbability = Math.min(
      Math.round(precipFactor + humidityFactor + pressureFactor),
      100
    );
    setFloodProbability(Math.max(totalProbability, 0));
    setSignificantFloodingRisk(totalProbability > 50);

    // Set risk description
    let description = "Low flood risk. Continue to monitor conditions.";
    if (level === "High") {
      description =
        "High flood risk. Take immediate precautions and stay alert.";
    } else if (level === "Moderate") {
      description =
        "Moderate flood risk. Be prepared to take action if conditions worsen.";
    }
    setRiskDescription(description);

    // Set progress bar
    const progress = level === "High" ? 90 : level === "Moderate" ? 65 : 30;
    setRiskProgress(progress);
  }, [weatherData]);

  return (
    <div className={`risk-assessment-card risk-${riskLevel.toLowerCase()}`}>
      {/* Header */}
      <div className="risk-header">
        <div className="risk-icon-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="36px"
            viewBox="0 -960 960 960"
            width="36px"
            fill="#EFEFEF"
          >
            <path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
          </svg>
        </div>
        <div className="risk-header-content">
          <h2 className="risk-title">{riskLevel} Flood Risk</h2>
          <p className="risk-description">{riskDescription}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="risk-progress-section">
        <div className="risk-progress-bar">
          <div
            className="risk-progress-fill"
            style={{ width: `${riskProgress}%` }}
          ></div>
        </div>

        {/* Risk Level Labels */}
        <div className="risk-level-labels">
          <span>Low</span>
          <span>Moderate</span>
          <span>High</span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="risk-metrics-row">
        {/* Expected Rainfall */}
        <div className="risk-metric-column">
          <div className="metric-label">Expected Rainfall</div>
          <div className="metric-value">
            {expectedRainfall} <span className="metric-unit">mm</span>
          </div>
          <div className="flooding-indicator">
            <div
              className={`checkbox ${significantFloodingRisk ? "checked" : ""}`}
            >
              {significantFloodingRisk && <span>⚠️</span>}
            </div>
            <span>Significant flooding likely</span>
          </div>
        </div>

        {/* Flood Probability */}
        <div className="risk-metric-column probability-column">
          <div className="metric-label">Flood Probability</div>
          <div className="metric-value">
            {floodProbability} <span className="metric-unit">%</span>
          </div>

          {/* Probability Bar */}
          <div className="probability-bar">
            <div
              className="probability-fill"
              style={{ width: `${floodProbability}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskAssessment;
