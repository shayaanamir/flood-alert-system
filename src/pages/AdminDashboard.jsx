import React, { useEffect, useState } from "react";
import "../styles/AdminDashboard.css";
import { Link } from "react-router-dom";
import Header from "./../components/global/Header";
import QuickViews from "../components/QuickViews";
import ForecastDay from "../components/ForecastDay";
import Shelter from "../components/Shelter";
import DamageReport from "../components/DamageReport";
import RainHotspotMap from "../components/RainHotspotMap";
import HourlyForecast from "../components/HourlyForecast";
import data from "../data_temp/sampleData.json";
import ShelterDetails from "../components/ShelterDetails";
import ShelterSupply from "../components/ShelterSupply";
import DamageDetails from "../components/DamageDetails";
import DamageRespond from "../components/DamageRespond";
import ShelterManagement from "./ShelterManagement";
import ReportsManagement from "./Resources";
import {
  Cloud,
  CloudRain,
  CloudDrizzle,
  Wind,
  Droplets,
  Eye,
  Gauge,
  Sun,
  Moon,
} from "lucide-react";

export default function AdminDashboard(props) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const weatherDetails = [
    { label: "Feels Like", value: "22°C", icon: Gauge },
    { label: "Humidity", value: "85%", icon: Droplets },
    { label: "Wind Speed", value: "12 km/h", icon: Wind },
    { label: "Visibility", value: "8 km", icon: Eye },
    { label: "Pressure", value: "1013 hPa", icon: Gauge },
    { label: "UV Index", value: "3 Moderate", icon: Sun },
  ];

  const [selectedDay, setSelectedDay] = useState(null);

  return (
    <>
      <Header isAdmin={true} />
      <div className="dashboard-default dashboard-body">
        <div className="dashboard-default dashboard-header">
          <div className="dashboard-default dashboard-header-title">
            <span
              style={{ fontWeight: "600", fontSize: "1.4rem", color: "white" }}
            >
              Emergency Flood Management
            </span>
            <span
              style={{ fontWeight: "300", fontSize: "0.9rem", color: "white" }}
            >
              Last Updated: {time.toLocaleTimeString()}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                fill="currentColor"
                class="bi bi-geo-alt"
                viewBox="0 0 16 16"
              >
                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
              </svg>{" "}
              Mumbai
            </span>
          </div>
          <div className="dashboard-default dashboard-header-buttons">
            <button
              className="dashboard-default dashboard-header-button"
              style={{ backgroundColor: "#EAB308" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-bell"
                viewBox="0 0 16 16"
              >
                <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
              </svg>
              Send Alerts
            </button>
            <button className=" dashboard-default dashboard-header-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-arrow-clockwise"
                viewBox="0 0 16 16"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"
                />
                <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
              </svg>
              Refresh Data
            </button>
          </div>
        </div>

        <div className="dashboard-default dashboard-quick-actions">
          <QuickViews
            info1="Total Rainfall"
            info2="22.6 mm"
            status="Low"
            info3="Week: 166.1 mm"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-cloud-rain"
                viewBox="0 0 16 16"
              >
                <path d="M4.158 12.025a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317m3 0a.5.5 0 0 1 .316.633l-1 3a.5.5 0 0 1-.948-.316l1-3a.5.5 0 0 1 .632-.317m3 0a.5.5 0 0 1 .316.633l-.5 1.5a.5.5 0 0 1-.948-.316l.5-1.5a.5.5 0 0 1 .632-.317m3 0a.5.5 0 0 1 .316.633l-1 3a.5.5 0 1 1-.948-.316l1-3a.5.5 0 0 1 .632-.317m.247-6.998a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 11H13a3 3 0 0 0 .405-5.973M8.5 2a4 4 0 0 1 3.976 3.555.5.5 0 0 0 .5.445H13a2 2 0 0 1 0 4H3.5a2.5 2.5 0 1 1 .605-4.926.5.5 0 0 0 .596-.329A4 4 0 0 1 8.5 2" />
              </svg>
            }
            popupText="This indicates the current likelihood of flooding in the area based on recent rainfall and terrain data."
          />
          <QuickViews
            info1="Current Risk Level"
            info2="Low"
            status="Low"
            info3="45% probability"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-exclamation-diamond"
                viewBox="0 0 16 16"
              >
                <path d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.48 1.48 0 0 1 0-2.098zm1.4.7a.495.495 0 0 0-.7 0L1.134 7.65a.495.495 0 0 0 0 .7l6.516 6.516a.495.495 0 0 0 .7 0l6.516-6.516a.495.495 0 0 0 0-.7L8.35 1.134z" />
                <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
              </svg>
            }
          />
          <QuickViews
            info1="People in Shelters"
            info2="247"
            info3="43% of capacity"
            status="Medium"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-houses"
                viewBox="0 0 16 16"
              >
                <path d="M5.793 1a1 1 0 0 1 1.414 0l.647.646a.5.5 0 1 1-.708.708L6.5 1.707 2 6.207V12.5a.5.5 0 0 0 .5.5.5.5 0 0 1 0 1A1.5 1.5 0 0 1 1 12.5V7.207l-.146.147a.5.5 0 0 1-.708-.708zm3 1a1 1 0 0 1 1.414 0L12 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l1.854 1.853a.5.5 0 0 1-.708.708L15 8.207V13.5a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 4 13.5V8.207l-.146.147a.5.5 0 1 1-.708-.708zm.707.707L5 7.207V13.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5V7.207z" />
              </svg>
            }
          />
          <QuickViews
            info1="Damage Reports"
            info2="28"
            info3="12 critical"
            status="High"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-lightning"
                viewBox="0 0 16 16"
              >
                <path d="M5.52.359A.5.5 0 0 1 6 0h4a.5.5 0 0 1 .474.658L8.694 6H12.5a.5.5 0 0 1 .395.807l-7 9a.5.5 0 0 1-.873-.454L6.823 9.5H3.5a.5.5 0 0 1-.48-.641zM6.374 1 4.168 8.5H7.5a.5.5 0 0 1 .478.647L6.78 13.04 11.478 7H8a.5.5 0 0 1-.474-.658L9.306 1z" />
              </svg>
            }
          />
        </div>

        <div className="dashboard-default dashboard-map-forecast">
          <div className="dashboard-default dashboard-map">
            <div className="dashboard-default dashboard-map-header">
              <div className="dashboard-default dasboard-map-title">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25"
                  height="25"
                  fill="#2563EB"
                  class="bi bi-map"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M15.817.113A.5.5 0 0 1 16 .5v14a.5.5 0 0 1-.402.49l-5 1a.5.5 0 0 1-.196 0L5.5 15.01l-4.902.98A.5.5 0 0 1 0 15.5v-14a.5.5 0 0 1 .402-.49l5-1a.5.5 0 0 1 .196 0L10.5.99l4.902-.98a.5.5 0 0 1 .415.103M10 1.91l-4-.8v12.98l4 .8zm1 12.98 4-.8V1.11l-4 .8zm-6-.8V1.11l-4 .8v12.98z"
                  />
                </svg>
                Flood Risk Map
              </div>
              <div className="dashboard-default dasboard-map-icons">
                <div className="dashboard-default dasboard-map-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    fill="#2B3035"
                    class="bi bi-info"
                    viewBox="0 0 16 16"
                  >
                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                  </svg>
                </div>
                <div className="dashboard-default dasboard-map-icon-hidden">
                  Click on any point on the map to show its weather condition.
                </div>
              </div>
            </div>
            <div className="dashboard-default dashboard-map-body">
              <RainHotspotMap />
            </div>
          </div>

          <div className="dashboard-default dashboard-forecast">
            <div className="dashboard-default dashboard-forecast-header">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-bar-chart-fill"
                viewBox="0 0 16 16"
              >
                <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1z" />
              </svg>
              Weather Forecast
            </div>
            <div className="dashboard-default dashboard-forecast-body">
              {data.weatherData.map((day, index) => (
                <ForecastDay
                  key={index}
                  data={day}
                  onClick={() => setSelectedDay(day)}
                />
              ))}
            </div>
            <div className="dashboard-default dashboard-forecast-graph">
              <div className="dashboard-default weather-details">
                <h3>Weather Details</h3>
                <div className="weather-details-grid">
                  {weatherDetails.map((detail, idx) => {
                    const Icon = detail.icon;
                    return (
                      <div key={idx} className="weather-detail-card">
                        <div className="weather-detail-icon">
                          <Icon />
                        </div>
                        <div className="weather-detail-info">
                          <p>{detail.label}</p>
                          <p>{detail.value}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <HourlyForecast
          data={selectedDay}
          onClose={() => setSelectedDay(null)}
        />
      </div>
    </>
  );
}
