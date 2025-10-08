import data from "../data_temp/sampleData.json";
import React, { useEffect, useState } from "react";
import {
  Cloud,
  CloudDrizzle,
  CloudRain,
  Sun,
  CloudSnow,
  Zap,
  CloudFog,
  Droplets,
  Calendar,
  Wind,
  Thermometer,
  Gauge,
} from "lucide-react";
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

export default function CurrentInfo(props) {
  return (
    <div className="weather-detail-card">
      <div className="weather-detail-icon">
        {props.label == "wind_speed_10m" ? (
          <Wind />
        ) : props.label == "pressure_msl" ? (
          <Gauge />
        ) : props.label == "temperature_2m" ? (
          <Thermometer />
        ) : props.label == "relative_humidity_2m" ? (
          <Droplets />
        ) : props.label == "precipitation" ? (
          <CloudRain />
        ) : props.label == "weather_code" ? (
          <WeatherIcon type={getWeatherDescription(props.value)} />
        ) : (
          ""
        )}
      </div>
      <div className="weather-detail-info">
        <p>
          {props.label == "wind_speed_10m"
            ? "Wind Speed"
            : props.label == "pressure_msl"
            ? " Pressure"
            : props.label == "temperature_2m"
            ? "Temperature"
            : props.label == "relative_humidity_2m"
            ? "Humidity"
            : props.label == "precipitation"
            ? "Precipitation"
            : props.label == "weather_code"
            ? "Current Weather"
            : ""}
        </p>
        <p>
          {props.label == "weather_code"
            ? getWeatherDescription(props.value)
            : props.value}
          {props.label == "wind_speed_10m"
            ? " km/hr"
            : props.label == "pressure_msl"
            ? " hPa"
            : props.label == "temperature_2m"
            ? "°C"
            : props.label == "relative_humidity_2m"
            ? "%"
            : props.label == "precipitation"
            ? " mm"
            : props.label == "weather_code"
            ? ""
            : ""}
        </p>
      </div>
    </div>
  );
}
