import React, { useState } from "react";
import "../styles/HomePage.css";
import { Link } from "react-router-dom";
import Header from "./../components/global/Header";
import Footer from "../components/global/Footer";
import FeatureCard from "../components/FeatureCard";
import { useNavigate } from "react-router-dom";
import FaqItem from "../components/FaqItem";

// HomePage Component
const HomePage = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [location, setLocation] = useState("");
  const [openFaqIndex, setOpenFaqIndex] = useState(null); 
  const navigate = useNavigate();

  const handleSubscribe = () => {
    console.log("Subscribing with:", { phoneNumber, location });
  };


// How It Works Steps Data
  const howItWorksSteps = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
        <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q317-217 238.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-78.5 217.5T480-80Z" />
      </svg>
    ),
    title: "Provide Your Details",
    description: "Enter your location and phone number in the form.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
        <path d="M480-320q-33 0-56.5-23.5T400-400q0-33 23.5-56.5T480-480q33 0 56.5 23.5T560-400q0 33-23.5 56.5T480-320ZM280-80q-33 0-56.5-23.5T200-160v-480q0-33 23.5-56.5T280-720h400q33 0 56.5 23.5T760-640v480q0 33-23.5 56.5T680-80H280Zm0-80h400v-480H280v480Z" />
      </svg>
    ),
    title: "We Monitor Conditions",
    description: "Our system analyzes weather forecasts and flood risks 24/7.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
        <path d="M160-200v-60h80v-280q0-83 50-141.5T420-740v-20q0-25 17.5-42.5T480-820q25 0 42.5 17.5T540-760v20q80 17 130 75.5T720-540v280h80v60H160Zm320-300Z" />
      </svg>
    ),
    title: "Receive Instant Alerts",
    description: "You get an immediate SMS notification when a risk is detected.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
        <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
      </svg>
    ),
    title: "Access Safety Info",
    description: "Find nearby emergency shelters and report local flood damage.",
  },
];




// FAQ Data
const handleFaqClick = (index) => {
    // If the clicked item is already open, close it. Otherwise, open it.
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };
const faqs = [
    {
      question: "Is this flood alert service completely free?",
      answer: "Yes, our core SMS alert service is 100% free for all users. Our mission is to ensure public safety, and we believe critical alerts should be accessible to everyone.",
    },
    {
      question: "How accurate is the flood prediction?",
      answer: "We use a combination of real-time data from government weather APIs, meteorological satellites, and local rainfall gauges. While no system is perfect, our models are highly accurate and designed to provide warnings with enough time to prepare.",
    },
    {
      question: "What areas do you currently cover?",
      answer: "Currently, our service covers all major metropolitan areas and surrounding regions. We are rapidly expanding our coverage and you can enter your zip code to see if your specific location is monitored.",
    },
    {
      question: "How do I unsubscribe from the alerts?",
      answer: "You can unsubscribe at any time by replying 'STOP' to any alert message you receive. You will be immediately removed from our notification list with no questions asked.",
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
          
          <h2 className="section-title">
              Simple Steps to Stay Safe & Informed
          </h2>

          {/* Main Content Grid */}
          <div className="main-content">
            {/* Left Column - How It Works */}
            <div className="left-column">
              <section className="how-it-works">
                <div className="how-it-works-card">
                  <div className="form-header">
                    <div className="info-icon">
                      {/* existing SVG */}
                    </div>
                    <h2>How It Works</h2>
                  </div>

                  <div className="steps-list">
                    {howItWorksSteps.map((step, index) => (
                      <div className="step-item-new" key={index}>
                        <div className="step-icon-container">
                          <div className="step-icon">{step.icon}</div>
                        </div>
                        <div className="step-text">
                          <h4>{step.title}</h4>
                          <p>{step.description}</p>
                        </div>
                      </div>
                    ))}
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

              <div className="testimonial-card">
                <p className="testimonial-quote">
                  "This service gave us the warning we needed to prepare for the flash
                  flood. Incredibly grateful for the timely alert."
                </p>
                <p className="testimonial-author">
                    - Sarah J., Austin, TX
                </p>
              </div>
            </div>
          </div>
                      
         
        </div>

      <section className="faq-section">
        <div className="faq-container">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="faq-list">
            {faqs.map((faq, index) => (
              <FaqItem
                key={index}
                faq={faq}
                index={index}
                isOpen={openFaqIndex === index}
                onClick={handleFaqClick}
              />
            ))}
          </div>
        </div>
      </section>
        
        
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
