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
        <Header loggedOut={true} />
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
          <section className="features-section">
            <div className="feature-card">
              <div className="feature-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="48px"
                  viewBox="0 -960 960 960"
                  width="48px"
                  fill="#3b82f6"
                >
                  <path d="m40-120 440-760 440 760H40Zm138-80h604L480-720 178-200Zm302-40q17 0 28.5-11.5T520-280q0-17-11.5-28.5T480-320q-17 0-28.5 11.5T440-280q0 17 11.5 28.5T480-240Zm-40-120h80v-200h-80v200Zm40-100Z" />
                </svg>
              </div>
              <h3>View Risk</h3>
              <p>
                Check real-time flood risk levels based on current weather
                forecasts for your location.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="48px"
                  viewBox="0 0 24 24"
                  width="48px"
                  fill="#3b82f6"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.92 16.21 7 11.85 7 9z" />
                  <circle cx="12" cy="9" r="2.5" />
                </svg>
              </div>
              <h3>Find Shelters</h3>
              <p>
                Locate nearby emergency shelters and evacuation routes in case
                of flooding.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  enable-background="new 0 0 20 20"
                  height="48px"
                  viewBox="0 0 20 20"
                  width="48px"
                  fill="#3b82f6"
                >
                  <g>
                    <rect fill="none" height="20" width="20" x="0" />
                  </g>
                  <g>
                    <g>
                      <path d="M12.67,16.5c-0.96,0-1.13-0.8-2.66-0.8c-1.56,0-1.68,0.8-2.67,0.8c-1,0-1.1-0.8-2.66-0.8c-1.56,0-1.68,0.8-2.67,0.8V18 c1.56,0,1.68-0.8,2.67-0.8c1,0,1.1,0.8,2.66,0.8c1.56,0,1.68-0.8,2.67-0.8c0.96,0,1.13,0.8,2.66,0.8c1.55,0,1.68-0.8,2.66-0.8 c0.96,0,1.13,0.8,2.66,0.8v-1.5c-1,0-1.1-0.8-2.66-0.8C13.77,15.7,13.67,16.5,12.67,16.5z" />
                      <path d="M17.44,13.39L15.62,6.6l1.28,0.51l0.56-1.39L8.17,2L2,9.87l1.18,0.93l0.85-1.08l0.8,3c-0.06,0-0.1-0.01-0.16-0.01 c-1.56,0-1.68,0.8-2.67,0.8V15c1.56,0,1.68-0.8,2.67-0.8c1,0,1.1,0.8,2.66,0.8c1.56,0,1.68-0.8,2.67-0.8c0.96,0,1.13,0.8,2.66,0.8 c1.55,0,1.68-0.8,2.66-0.8c0.96,0,1.13,0.8,2.66,0.8v-1.5C17.78,13.5,17.6,13.46,17.44,13.39z M6.54,13.28L5.19,8.24l3.47-4.42 l5.22,2.1l1.83,6.82c-1.42-0.14-1.87,0.41-2.41,0.65l-1.24-4.65L8.18,9.76l0.83,3.09c-0.69,0.23-0.96,0.65-1.67,0.65 C7,13.5,6.76,13.4,6.54,13.28z" />
                    </g>
                  </g>
                </svg>
              </div>
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
