import React, { useState } from "react";
import "../styles/HomePage.css";
import { Link } from "react-router-dom";
import Header from "./../components/global/Header";
import Footer from "../components/global/Footer";
import FeatureCard from "../components/FeatureCard";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const handleSubscribe = () => {
    console.log("Subscribing with:", { phoneNumber, location });
  };

  const features = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#2563EB"
        >
          <path d="M480-100q-133 0-226.5-92T160-416q0-63 24.5-120.5T254-638l226-222 226 222q45 44 69.5 101.5T800-416q0 132-93.5 224T480-100Z" />
        </svg>
      ),
      title: "Real-time Risk Assessment",
      description:
        "Advanced algorithms analyze weather data to predict flooding in your area",
      className: "risk-assessment",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#2563EB"
        >
          <path d="M480-360q17 0 28.5-11.5T520-400q0-17-11.5-28.5T480-440q-17 0-28.5 11.5T440-400q0 17 11.5 28.5T480-360Zm-40-160h80v-240h-80v240ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z" />
        </svg>
      ),
      title: "SMS Alerts",
      description:
        "Receive timely flood notifications when flood risk increases in your community",
      className: "sms-alerts",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#2563EB"
        >
          <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
        </svg>
      ),
      title: "Shelter Locations",
      description:
        "Find nearby emergency shelters and safe locations during flood events",
      className: "shelter-locations",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#2563EB"
        >
          <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h168q13-36 43.5-58t68.5-22q38 0 68.5 22t43.5 58h168q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm80-80h280v-80H280v80Zm0-160h400v-80H280v80Zm0-160h400v-80H280v80Zm200-190q13 0 21.5-8.5T510-820q0-13-8.5-21.5T480-850q-13 0-21.5 8.5T450-820q0 13 8.5 21.5T480-790ZM200-200v-560 560Z" />
        </svg>
      ),
      title: "Damage Reporting",
      description:
        "Help your community by reporting flood damage and impact data",
      className: "damage-reporting",
    },
  ];

  return (
    <>
    
      <div className="homepage">
        <Header loggedOut={false} />
        <div className="hero-body">
          
          {/* Header Section */}
          <header className="homePage-header">
            <div className="live-status-badge">
            <span className="status-dot"></span>
              Live Monitoring Active
        </div>
            <h1>
                Stay Safe from<br />
            <span className="gradient-text">Floods & Disasters</span>
            </h1>
            <p className="subtitle">
              Real-time weather monitoring and instant SMS alerts to protect you and your loved ones during emergencies
            </p>

            <div className="cta-buttons">
              <button className="btn-primary">Get Started Free</button>
              <button className="btn-secondary">Check Current Risk</button>
            </div>

            <div className="stats-container">
              <div className="stat-card">
                <h3>24/7</h3>
                <p>Active Monitoring</p>
              </div>
              <div className="stat-card">
                <h3>&lt;60s</h3>
                <p>Alert Response Time</p>
              </div>
              <div className="stat-card">
                <h3>100%</h3>
                <p>Coverage Area</p>
              </div>
            </div>
          </header>
          </div>
        <div className="homepage-container">
          

          {/* Main Content Grid */}
          <div className="main-content">
            {/* Left Column - How It Works */}
            <div className="left-column">
              <section className="how-it-works">
                <div className="how-it-works-card">
                  <div className="form-header">
                    <div className="info-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="48px"
                        viewBox="0 -960 960 960"
                        width="48px"
                        fill="#3b82f6"
                      >
                        <path d="M453-280h60v-240h-60v240Zm26.98-314q14.02 0 23.52-9.2T513-626q0-14.45-9.48-24.22-9.48-9.78-23.5-9.78t-23.52 9.78Q447-640.45 447-626q0 13.6 9.48 22.8 9.48 9.2 23.5 9.2Zm.29 514q-82.74 0-155.5-31.5Q252-143 197.5-197.5t-86-127.34Q80-397.68 80-480.5t31.5-155.66Q143-709 197.5-763t127.34-85.5Q397.68-880 480.5-880t155.66 31.5Q709-817 763-763t85.5 127Q880-563 880-480.27q0 82.74-31.5 155.5Q817-252 763-197.68q-54 54.31-127 86Q563-80 480.27-80Zm.23-60Q622-140 721-239.5t99-241Q820-622 721.19-721T480-820q-141 0-240.5 98.81T140-480q0 141 99.5 240.5t241 99.5Zm-.5-340Z" />
                      </svg>
                    </div>
                    <h2>How It Works</h2>
                  </div>

                  <div className="steps-list">
                    <div className="step-item">
                      <div className="step-number">1</div>
                      <p>Enter your location and phone number below</p>
                    </div>
                    <div className="step-item">
                      <div className="step-number">2</div>
                      <p>
                        We monitor rainfall forecasts and flood risks in your
                        area
                      </p>
                    </div>
                    <div className="step-item">
                      <div className="step-number">3</div>
                      <p>Receive SMS alerts when there's a flood risk</p>
                    </div>
                    <div className="step-item">
                      <div className="step-number">4</div>
                      <p>Access shelter information and report flood damage</p>
                    </div>
                  </div>
                </div>

                <div className="stay-informed-card">
                  <div className="card-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="40px"
                      viewBox="0 0 24 24"
                      width="40px"
                      fill="#EFEFEF"
                    >
                      <path d="M0 0h24v24H0V0z" fill="none" />
                      <path d="M15.5 1h-8C6.12 1 5 2.12 5 3.5v17C5 21.88 6.12 23 7.5 23h8c1.38 0 2.5-1.12 2.5-2.5v-17C18 2.12 16.88 1 15.5 1zm-4 21c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4.5-4H7V4h9v14z" />
                    </svg>
                  </div>
                  <h3>Stay Informed</h3>
                  <p>
                    Our system monitors rainfall patterns and sends alerts
                    before flooding occurs, giving you precious time to prepare.
                  </p>
                  <button className="check-risk-btn" onClick={() => {navigate("/view-risk")}}>
                    Check Current Risk
                  </button>
                </div>
              </section>
            </div>

            {/* Right Column - Alert Signup Form */}
            <div className="right-column">
              <section className="alert-signup">
                <div className="form-header">
                  <div className="bell-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="48px"
                      viewBox="0 -960 960 960"
                      width="48px"
                      fill="#3b82f6"
                    >
                      <path d="M120-566q0-90 40-165t107-125l36 48q-56 42-89.5 104.5T180-566h-60Zm660 0q0-75-33.5-137.5T657-808l36-48q67 50 107 125t40 165h-60ZM160-200v-60h80v-304q0-84 49.5-150.5T420-798v-22q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v22q81 17 130.5 83.5T720-564v304h80v60H160Zm320-302Zm0 422q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM300-260h360v-304q0-75-52.5-127.5T480-744q-75 0-127.5 52.5T300-564v304Z" />
                    </svg>
                  </div>
                  <h2>Get Flood Alerts</h2>
                  <p>
                    Stay informed with real-time alerts about flood risks in
                    your area. We'll only notify you when it matters.
                  </p>
                </div>

                <div className="signup-form">
                  <div className="input-group">
                    <label htmlFor="phoneInput">Phone Number</label>
                    <input
                      id="phoneInput"
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <div className="input-group">
                    <label htmlFor="locationInput">Location</label>
                    <input
                      id="locationInput"
                      type="text"
                      placeholder="City, State or Zip Code"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="form-input"
                    />
                  </div>

                  <button
                    className="subscribe-button"
                    onClick={handleSubscribe}
                  >
                    Subscribe to Alerts
                  </button>

                  <p className="terms-text">
                    Standard Message and data rates may apply. You can
                    unsubscribe at any time.
                  </p>
                </div>
              </section>
            </div>
          </div>

          {/* Bottom Features Section */}
          <div className="features-grid">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                className={feature.className}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
