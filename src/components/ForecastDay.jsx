import "../styles/AdminDashboard.css";

export default function ForecastDay(props) {
  return (
    <>
      <div className="dashboard-default dashboard-forecast-day">
        <div className="dashboard-default dashboard-forecast-icon"></div>
        <div className="dashboard-default dashboard-forecast-text">
          <span style={{ fontWeight: "500", fontSize: "1.1rem" }}>Today</span>
          <span style={{ fontWeight: "300" }}>Heavy Rain</span>
        </div>
        <div className="dashboard-default dashboard-forecast-extras">
          <span style={{ fontWeight: "500", fontSize: "1.1rem" }}>45mm</span>
          <span style={{ fontWeight: "300" }}>24°C</span>
        </div>
      </div>
    </>
  );
}
