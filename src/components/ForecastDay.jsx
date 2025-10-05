import { useEffect } from "react";
import "../styles/AdminDashboard.css";

export default function ForecastDay(data) {
  useEffect(() => {
    console.log(data);
  }, []);
  return (
    <>
      <div
        className="dashboard-default dashboard-forecast-day"
        onClick={data.onClick}
      >
        <div className="dashboard-default dashboard-forecast-icon"></div>
        <div className="dashboard-default dashboard-forecast-text">
          <span style={{ fontWeight: "500", fontSize: "1.1rem" }}>
            {data.data.day}
          </span>
          <span style={{ fontWeight: "300" }}>{data.data.condition}</span>
        </div>
        <div className="dashboard-default dashboard-forecast-extras">
          <span style={{ fontWeight: "500", fontSize: "1.1rem" }}>
            {data.data.rainfall}mm
          </span>
          <span style={{ fontWeight: "300" }}>{data.data.temp}°C</span>
        </div>
      </div>
    </>
  );
}
