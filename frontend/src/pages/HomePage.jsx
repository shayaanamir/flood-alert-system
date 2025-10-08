import React, { useState, useEffect } from "react";
import "../styles/HomePage.css";
import Header from "./../components/global/Header";
import Footer from "../components/global/Footer";
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// ---- Helper Components for Icons ----
const WarningIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-120h80v-240h-80v240ZM80-120v-720q0-33 23.5-56.5T160-920h640q33 0 56.5 23.5T880-840v720q0 33-23.5 56.5T800-80H160q-33 0-56.5-23.5T80-120Z"/></svg>
);
const BellIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M160-200v-60h80v-280q0-83 50-141.5T420-740v-20q0-25 17.5-42.5T480-820q25 0 42.5 17.5T540-760v20q80 17 130 75.5T720-540v280h80v60H160Zm320-300Z"/></svg>
);
const ShelterIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Z"/></svg>
);
const RainfallIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-100q-133 0-226.5-92T160-416q0-63 24.5-120.5T254-638l226-222 226 222q45 44 69.5 101.5T800-416q0 132-93.5 224T480-100Z"/></svg>
);

// Mumbai flood-prone areas
const floodAreas = [
  { id: 1, name: "Worli", lat: 19.0176, lng: 72.8146, risk: "high" },
  { id: 2, name: "Bandra", lat: 19.0596, lng: 72.8295, risk: "moderate" },
  { id: 3, name: "Andheri", lat: 19.1136, lng: 72.8697, risk: "moderate" },
  { id: 4, name: "Dadar", lat: 19.0178, lng: 72.8478, risk: "high" },
  { id: 5, name: "Kurla", lat: 19.0728, lng: 72.8826, risk: "critical" },
];

const FloodRiskMap = ({ weatherData }) => {
  const getRiskColor = (risk) => {
    switch (risk) {
      case "critical": return "#dc2626";
      case "high": return "#ea580c";
      case "moderate": return "#f59e0b";
      default: return "#3b82f6";
    }
  };

  const getRiskRadius = (risk) => {
    switch (risk) {
      case "critical": return 2000;
      case "high": return 1500;
      case "moderate": return 1000;
      default: return 500;
    }
  };

  return (
    <MapContainer 
      center={[19.0760, 72.8777]} 
      zoom={11} 
      className="map-placeholder"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      {floodAreas.map((area) => (
        <React.Fragment key={area.id}>
          <Circle
            center={[area.lat, area.lng]}
            radius={getRiskRadius(area.risk)}
            pathOptions={{
              color: getRiskColor(area.risk),
              fillColor: getRiskColor(area.risk),
              fillOpacity: 0.2,
            }}
          />
          <Marker position={[area.lat, area.lng]}>
            <Popup>
              <div className="map-popup">
                <strong>{area.name}</strong>
                <br />
                <span className={`risk-${area.risk}`}>
                  {area.risk} Risk
                </span>
              </div>
            </Popup>
          </Marker>
        </React.Fragment>
      ))}
    </MapContainer>
  );
};

const RainfallChart = ({ hourlyData }) => {
  if (!hourlyData || hourlyData.length === 0) {
    return <div className="chart-loading">Loading rainfall data...</div>;
  }

  const maxValue = Math.max(...hourlyData.map(d => d.value), 10);
  const chartHeight = 200;
  const chartWidth = 500;
  const padding = { top: 20, right: 20, bottom: 40, left: 50 };
  
  const xScale = (index) => padding.left + (index / (hourlyData.length - 1)) * (chartWidth - padding.left - padding.right);
  const yScale = (value) => chartHeight - padding.bottom - ((value / maxValue) * (chartHeight - padding.top - padding.bottom));
  
  const points = hourlyData.map((d, i) => ({
    x: xScale(i),
    y: yScale(d.value),
    ...d,
  }));
  
  const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  
  return (
    <svg width="100%" height={chartHeight} viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="rainfall-chart">
      {[0, 1, 2, 3, 4].map((i) => {
        const y = chartHeight - padding.bottom - (i * (chartHeight - padding.top - padding.bottom) / 4);
        const value = Math.round((maxValue / 4) * i);
        return (
          <g key={i}>
            <line x1={padding.left} y1={y} x2={chartWidth - padding.right} y2={y} stroke="#e2e8f0" strokeWidth="1" />
            <text x={padding.left - 10} y={y + 4} textAnchor="end" fontSize="11" fill="#94a3b8">{value}</text>
          </g>
        );
      })}
      
      {points.map((p, i) => (
        <text key={i} x={p.x} y={chartHeight - padding.bottom + 20} textAnchor="middle" fontSize="11" fill="#64748b">{p.time}</text>
      ))}
      
      <text x={padding.left - 35} y={chartHeight / 2} textAnchor="middle" fontSize="12" fill="#64748b" transform={`rotate(-90, ${padding.left - 35}, ${chartHeight / 2})`}>mm/h</text>
      
      <defs>
        <linearGradient id="rainfallGradient" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      
      <path d={`${pathData} L ${points[points.length - 1].x} ${chartHeight - padding.bottom} L ${points[0].x} ${chartHeight - padding.bottom} Z`} fill="url(#rainfallGradient)" />
      <path d={pathData} fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={4} fill="white" stroke="#3b82f6" strokeWidth="2" />
      ))}
    </svg>
  );
};

const SummaryCard = ({ icon, title, value, subtitle, customClass }) => (
    <div className={`dashboard-card summary-card ${customClass}`}>
      <div className="card-header">
        {icon}
        <span>{title}</span>
      </div>
      <div className="card-body">
        <p className={`${customClass}-value`}>{value}</p>
        <small>{subtitle}</small>
      </div>
    </div>
  );

const HomePage = () => {
    const [activeLayer, setActiveLayer] = useState("Rainfall");
    const [weatherData, setWeatherData] = useState(null);
    const [hourlyData, setHourlyData] = useState([]);
  
    useEffect(() => {
      const lat = 19.0760;
      const lon = 72.8777;
      
      fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,precipitation,wind_speed_10m,relative_humidity_2m&hourly=precipitation&timezone=auto&forecast_days=1`)
        .then(res => res.json())
        .then(data => {
          setWeatherData({
            temperature: data.current.temperature_2m,
            precipitation: data.current.precipitation,
            windSpeed: data.current.wind_speed_10m,
            humidity: data.current.relative_humidity_2m,
          });
  
          const now = new Date();
          const currentHour = now.getHours();
          const relevantHours = data.hourly.time.map((time, idx) => ({
              time: new Date(time),
              value: data.hourly.precipitation[idx] || 0
          })).filter(item => {
              const itemHour = item.time.getHours();
              // Get current hour and the next 6 hours
              return itemHour >= currentHour && itemHour <= currentHour + 6;
          });

          const formattedHours = relevantHours.map((item, idx) => ({
              time: idx === 0 ? 'Now' : `${item.time.getHours()}:00`,
              value: item.value
          }));

          setHourlyData(formattedHours.slice(0, 7));
        })
        .catch(err => console.error('Error fetching weather:', err));
    }, []);

  const summaryCardData = [
    { id: 1, icon: <WarningIcon />, title: "Current Risk Level", value: weatherData ? (weatherData.precipitation > 10 ? "High" : weatherData.precipitation > 5 ? "Medium" : "Low") : "...", subtitle: "Based on live data", customClass: "risk-level" },
    { id: 2, icon: <BellIcon />, title: "Active Alerts", value: "7", subtitle: "3 critical, 4 moderate", customClass: "active-alerts" },
    { id: 3, icon: <ShelterIcon />, title: "Nearby Shelters", value: "12", subtitle: "Available within 5km", customClass: "nearby-shelters" },
    { id: 4, icon: <RainfallIcon />, title: "Rainfall (Now)", value: weatherData ? `${weatherData.precipitation}mm` : "...", subtitle: "Real-time data", customClass: "rainfall-total" },
  ];

  const mapLayers = ["Rainfall", "Road Closures", "Shelters"];

  const communityReports = [
    { id: 1, avatar: "https://i.pravatar.cc/150?img=1", text: "Water level rising near Main St.", time: "5 min ago" },
    { id: 2, avatar: "https://i.pravatar.cc/150?img=2", text: "Road blocked at 5th Avenue", time: "12 min ago" },
    { id: 3, avatar: "https://i.pravatar.cc/150?img=3", text: "Heavy rainfall in Worli area", time: "25 min ago" },
    { id: 4, avatar: "https://i.pravatar.cc/150?img=4", text: "Power outage at Bandra West", time: "1 hour ago" },
  ];
  
  const recentAlerts = [
    { id: 1, location: "Downtown Area", severity: "critical", time: "2:30 PM", status: "active" },
    { id: 2, location: "Riverside District", severity: "moderate", time: "1:45 PM", status: "resolved" },
    { id: 3, location: "Industrial Zone", severity: "moderate", time: "12:20 PM", status: "active" },
    { id: 4, location: "West Suburbs", severity: "moderate", time: "11:55 AM", status: "resolved" },
  ];

  return (
    <>
      <div className="homepage">
        <Header loggedOut={false} />
        <main className="dashboard-container">
          <div className="summary-cards-grid">
            {summaryCardData.map((card) => (
              <SummaryCard key={card.id} {...card} />
            ))}
          </div>

          <div className="main-dashboard-grid">
            <div className="dashboard-card map-card">
              <div className="card-header-alt">
                <h3>Real-time Flood Risk Map</h3>
                <div className="map-toggles">
                  {mapLayers.map((layer) => (
                    <button key={layer} className={`toggle-btn ${activeLayer === layer ? "active" : ""}`} onClick={() => setActiveLayer(layer)}>
                      {layer}
                    </button>
                  ))}
                </div>
              </div>
              <FloodRiskMap weatherData={weatherData} />
            </div>

            <div className="right-section-container">
              <div className="dashboard-card weather-summary-card">
                <h3 className="card-title">Weather Summary</h3>
                <ul className="weather-list">
                  <li><span>Temperature</span> <strong>{weatherData ? `${weatherData.temperature}°C` : "..."}</strong></li>
                  <li><span>Rainfall</span> <strong>{weatherData ? `${weatherData.precipitation}mm/h` : "..."}</strong></li>
                  <li><span>Wind Speed</span> <strong>{weatherData ? `${weatherData.windSpeed} km/h` : "..."}</strong></li>
                  <li><span>Humidity</span> <strong>{weatherData ? `${weatherData.humidity}%` : "..."}</strong></li>
                </ul>
                
              </div>

              <div className="dashboard-card community-report-card-compact">
                <h3 className="card-title">Community Reports</h3>
                <div className="community-reports-compact">
                  {communityReports.map((report) => (
                    <div className="report-item-compact" key={report.id}>
                      <div className="user-avatar-compact"><img src={report.avatar} alt="User" /></div>
                      <div className="report-content-compact">
                        <p className="report-text-compact">{report.text}</p>
                        <span className="report-time-compact">{report.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="dashboard-card rainfall-trends-card">
              <h3 className="card-title">Rainfall Trends</h3>
              <RainfallChart hourlyData={hourlyData} />
            </div>

            <div className="dashboard-card recent-alerts-card">
              <h3 className="card-title">Recent Alerts</h3>
              <table className="alerts-table">
                <thead>
                  <tr>
                    <th>Location</th>
                    <th>Severity</th>
                    <th>Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentAlerts.map((alert) => (
                    <tr key={alert.id}>
                      <td>{alert.location}</td>
                      <td><span className={`status-badge ${alert.severity}`}>{alert.severity}</span></td>
                      <td>{alert.time}</td>
                      <td><span className={`status-badge ${alert.status}`}>{alert.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
