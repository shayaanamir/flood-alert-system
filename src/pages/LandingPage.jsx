import React from "react";
import "../styles/LandingPage.css";

import Header from "../components/global/Header";
import Footer from "../components/global/Footer";
import FeatureCard from "../components/FeatureCard";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
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
    <div className="landing-page">
      <Header loggedOut={true} />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Stay Safe From Floods</h1>
          <p className="hero-subtitle">
            Real-time flood risk alerts and resources to keep you and your
            community protected
          </p>
          <div className="hero-buttons">
            <button
              className="btn btn-primary"
              onClick={() =>
                navigate("/login", { state: { isSignUpPage: true } })
              }
            >
              Sign Up for Alerts
            </button>
            <button
              className="btn btn-secondary"
              onClick={() =>
                navigate("/login", { state: { isSignUpPage: false } })
              }
            >
              Login
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">How FloodAlert Protects You</h2>

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
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <h2 className="cta-title">Ready to stay protected?</h2>
          <p className="cta-subtitle">
            Join thousands of users who rely on FloodAlert for critical flood
            warnings and resources.
          </p>
          <button
            className="btn btn-primary btn-large"
            onClick={() =>
              navigate("/login", { state: { isSignUpPage: true } })
            }
          >
            Get Started Now
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
