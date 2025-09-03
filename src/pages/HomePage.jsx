import React, { useState } from "react";
import "../styles/HomePage.css";
import { Link } from "react-router-dom";
import Header from "./../components/global/Header";

const HomePage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");

  const handleSubscribe = () => {
    // Handle subscription logic here
    console.log("Subscribing with:", { phoneNumber, location });
  };

  const handleCheckRisk = () => {
    // Handle check current risk logic
    console.log("Checking current risk...");
  };

  return (
    <>
      <div className="homepage">
        <Header />
        <div className="container">
          {/* Header Section */}
          <header className="homePage-header">
            <h1>Stay Safe from Floods with Real-Time Alerts</h1>
            <p className="subtitle">
              FloodAlert uses real-time weather data to predict flood risks and
              sends SMS alerts to keep you and your loved ones safe during
              emergencies.
            </p>
          </header>

          {/* Main Content Grid */}
          <div className="main-content">
            {/* Left Column - How It Works */}
            <div className="left-column">
              <section className="how-it-works">
                <div className="how-it-works-card">
                  <div className="form-header">
                    <div className="info-icon">ℹ️</div>
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
                  <div className="card-icon">📱</div>
                  <h3>Stay Informed</h3>
                  <p>
                    Our system monitors rainfall patterns and sends alerts
                    before flooding occurs, giving you precious time to prepare.
                  </p>
                  <button className="check-risk-btn" onClick={handleCheckRisk}>
                    Check Current Risk
                  </button>
                </div>
              </section>
            </div>

            {/* Right Column - Alert Signup Form */}
            <div className="right-column">
              <section className="alert-signup">
                <div className="form-header">
                  <div className="bell-icon">🔔</div>
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
                    👤 Subscribe to Alerts
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
          <section className="features-section">
            <div className="feature-card">
              <div className="feature-icon">⚠️</div>
              <h3>View Risk</h3>
              <p>
                Check real-time flood risk levels based on current weather
                forecasts for your location.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📍</div>
              <h3>Find Shelters</h3>
              <p>
                Locate nearby emergency shelters and evacuation routes in case
                of flooding.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Report Damage</h3>
              <p>
                Upload images and information about flood damage to help with
                assessment and recovery.
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default HomePage;
