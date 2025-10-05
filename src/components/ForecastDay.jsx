import { useEffect } from "react";
import "../styles/AdminDashboard.css";
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
        <div className="dashboard-default dashboard-forecast-icon">
          <WeatherIcon type={data.data.icon} size={24} />
        </div>
        <div className="dashboard-default dashboard-forecast-text">
          <span style={{ fontWeight: "500", fontSize: "0.9rem", padding: "0" }}>
            {data.data.day}
          </span>
          <span style={{ fontWeight: "300", fontSize: "0.8rem", padding: "0" }}>
            {data.data.condition}
          </span>
        </div>
        <div className="dashboard-default dashboard-forecast-extras">
          <span style={{ fontWeight: "500", fontSize: "1rem" }}>
            {data.data.rainfall}mm
          </span>
          <span style={{ fontWeight: "300", fontSize: "0.9rem" }}>
            {data.data.temp}°C
          </span>
        </div>
      </div>
    </>
  );
}
