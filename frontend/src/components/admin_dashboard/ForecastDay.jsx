import { useEffect } from "react";
import "../../styles/AdminDashboard.css";
import {
  Cloud,
  CloudDrizzle,
  CloudRain,
  Sun,
  CloudSnow,
  Zap,
  CloudFog,
} from "lucide-react";

import data from "../../data_temp/sampleData.json";

const WeatherIcon = ({ type, size = 40 }) => {
  const iconProps = { size, strokeWidth: 2 };

  switch (type) {
    // Clear / Sun
    case "Clear sky":
    case "Mainly clear":
      return <Sun {...iconProps} className="text-yellow-500" />;

    // Cloudy
    case "Partly cloudy":
    case "Overcast":
      return <Cloud {...iconProps} className="text-gray-500" />;

    // Drizzle
    case "Drizzle: Light":
    case "Drizzle: Moderate":
    case "Drizzle: Dense":
    case "Freezing Drizzle: Light":
    case "Freezing Drizzle: Dense":
      return <CloudDrizzle {...iconProps} className="text-blue-500" />;

    // Rain
    case "Rain: Slight":
    case "Rain: Moderate":
    case "Rain: Heavy":
    case "Freezing Rain: Light":
    case "Freezing Rain: Heavy":
    case "Rain showers: Slight":
    case "Rain showers: Moderate":
    case "Rain showers: Violent":
      return <CloudRain {...iconProps} className="text-blue-600" />;

    // Snow
    case "Snow fall: Slight":
    case "Snow fall: Moderate":
    case "Snow fall: Heavy":
    case "Snow grains":
    case "Snow showers: Slight":
    case "Snow showers: Heavy":
      return <CloudSnow {...iconProps} className="text-blue-300" />;

    // Fog
    case "Fog":
    case "Depositing rime fog":
      return <CloudFog {...iconProps} className="text-gray-400" />;

    // Thunderstorm
    case "Thunderstorm: Slight or moderate":
    case "Thunderstorm with slight hail":
    case "Thunderstorm with heavy hail":
      return <Zap {...iconProps} className="text-yellow-600" />;

    // Default fallback
    default:
      return <Cloud {...iconProps} className="text-gray-400" />;
  }
};

export const getWeatherDescription = (code) => {
  return data.weatherCodeData[code] || "Unknown weather condition";
};

export default function ForecastDay(data) {
  useEffect(() => {
    console.log("Anything?", data);
  }, []);
  return (
    <>
      <div
        className="dashboard-default dashboard-forecast-day"
        onClick={data.onClick}
      >
        <div className="dashboard-default dashboard-forecast-icon">
          <WeatherIcon
            type={getWeatherDescription(data.data.weatherCode)}
            size={24}
          />
        </div>
        <div className="dashboard-default dashboard-forecast-text">
          <span style={{ fontWeight: "500", fontSize: "0.9rem", padding: "0" }}>
            {data.data.time}
          </span>
          <span style={{ fontWeight: "300", fontSize: "0.8rem", padding: "0" }}>
            {getWeatherDescription(data.data.weatherCode)}
          </span>
        </div>
        <div className="dashboard-default dashboard-forecast-extras">
          <span style={{ fontWeight: "500", fontSize: "1rem" }}>
            {data.data.precipitationSum}mm
          </span>
          <span style={{ fontWeight: "300", fontSize: "0.9rem" }}>
            {data.data.tempMax}°C / {data.data.tempMin}°C
          </span>
        </div>
      </div>
    </>
  );
}
