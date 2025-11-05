import React, { useState, useEffect } from "react";
import "../styles/HomePage.css";

// Global Components
import Header from "../components/global/Header";
import Footer from "../components/global/Footer";

// Icon Components
import { WarningIcon, BellIcon, ShelterIcon, RainfallIcon } from '../components/icons';

// Dashboard Components
import SummaryCard from "../components/homePage_dashboard/SummaryCard";
import FloodRiskMap from "../components/homePage_dashboard/FloodRiskMap";
import WeatherSummary from "../components/homePage_dashboard/WeatherSummary";
import CommunityReports from "../components/homePage_dashboard/CommunityReports";
import RainfallChart from "../components/homePage_dashboard/RainfallChart";
import RecentAlerts from "../components/homePage_dashboard/RecentAlerts";

const HomePage = () => {
    const [activeLayer, setActiveLayer] = useState("Rainfall");
    const [weatherData, setWeatherData] = useState(null);
    const [alertStats, setAlertStats] = useState(null);
    const [recentAlerts, setRecentAlerts] = useState([]);
    

    // Fetch weather data
    useEffect(() => {
        const lat = 19.0760;
        const lon = 72.8777;
        
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,precipitation,wind_speed_10m,relative_humidity_2m&timezone=auto`)
            .then(res => res.json())
            .then(data => {
                setWeatherData({
                    temperature: data.current.temperature_2m,
                    precipitation: data.current.precipitation,
                    windSpeed: data.current.wind_speed_10m,
                    humidity: data.current.relative_humidity_2m,
                });
            })
            .catch(err => console.error('Error fetching weather:', err));
    }, []);

    // Fetch alert statistics
    useEffect(() => {
        fetch('http://localhost:5000/alerts/stats')
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setAlertStats(data.data);
                }
            })
            .catch(err => console.error('Error fetching alert stats:', err));
    }, []);

    // Fetch recent alerts
    useEffect(() => {
        fetch('http://localhost:5000/alerts/recent')
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setRecentAlerts(data.data);
                }
            })
            .catch(err => console.error('Error fetching recent alerts:', err));
    }, []);

    const summaryCardData = [
    { 
        id: 1, 
        icon: <WarningIcon />, 
        title: "Current Risk Level", 
        value: weatherData ? (weatherData.precipitation > 10 ? "High" : weatherData.precipitation > 5 ? "Medium" : "Low") : "...", 
        subtitle: "Based on live data", 
        customClass: "risk-level" 
    },
    { 
        id: 2, 
        icon: <BellIcon />, 
        title: "Active Alerts", 
        value: alertStats ? alertStats.total.toString() : "...", 
        subtitle: alertStats ? `${alertStats.critical} critical, ${alertStats.moderate} moderate` : "Loading...", 
        customClass: "active-alerts" 
    },
    { 
        id: 3, 
        icon: <ShelterIcon />, 
        title: "Nearby Shelters", 
        value: "12", 
        subtitle: "Available within 5km", 
        customClass: "nearby-shelters" 
    },
    { 
        id: 4, 
        icon: <RainfallIcon />, 
        title: "Rainfall (Now)", 
        value: weatherData ? `${weatherData.precipitation}mm` : "...", 
        subtitle: "Real-time data", 
        customClass: "rainfall-total" 
    },
];
    const mapLayers = ["Rainfall", "Road Closures", "Shelters"];

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
                                        <button 
                                            key={layer} 
                                            className={`toggle-btn ${activeLayer === layer ? "active" : ""}`} 
                                            onClick={() => setActiveLayer(layer)}
                                        >
                                            {layer}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <FloodRiskMap />
                        </div>

                        <div className="right-section-container">
                            <WeatherSummary weatherData={weatherData} />
                            <CommunityReports />
                        </div>
                        
                        <div className="dashboard-card rainfall-trends-card">
                            <h3 className="card-title">Rainfall Trends</h3>
                            <RainfallChart />
                        </div>
                        
                        <RecentAlerts alerts={recentAlerts} />
                    </div>
                </main>
            </div>
            <Footer />
        </>
    );
};

export default HomePage;