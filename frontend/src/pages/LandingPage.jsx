import React, { useState, useEffect, useRef } from "react";
import "../styles/LandingPage.css";
import FaqItem from "../components/FaqItem";
import Navbar from "../components/Navbar";
import Footer from "../components/global/Footer";
import FeatureCard from "../components/FeatureCard";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const observerRef = useRef(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(null); 

  useEffect(() => {
    // Intersection Observer for scroll animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    // Observe all animatable elements
    const elements = document.querySelectorAll(
      '.feature-card, .timeline-step, .stat-card, .resource-card, .section-header, .cta-content, .faq-item'
    );
    
    elements.forEach((el) => {
      el.classList.add('fade-in-scroll');
      observerRef.current.observe(el);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);
  
  const features = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="currentColor"
        >
          <path d="M480-100q-133 0-226.5-92T160-416q0-63 24.5-120.5T254-638l226-222 226 222q45 44 69.5 101.5T800-416q0 132-93.5 224T480-100Z" />
        </svg>
      ),
      title: "Real-time Risk Assessment",
      description:
        "Advanced algorithms analyze weather data to predict flooding in your area, giving you early warnings when you need them most.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="currentColor"
        >
          <path d="M480-360q17 0 28.5-11.5T520-400q0-17-11.5-28.5T480-440q-17 0-28.5 11.5T440-400q0 17 11.5 28.5T480-360Zm-40-160h80v-240h-80v240ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z" />
        </svg>
      ),
      title: "SMS Alerts",
      description:
        "Receive timely flood notifications when flood risk increases in your community, ensuring you're always informed.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="currentColor"
        >
          <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
        </svg>
      ),
      title: "Shelter Locations",
      description:
        "Find nearby emergency shelters and safe locations during flood events with our interactive map and directions.",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="currentColor"
        >
          <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h168q13-36 43.5-58t68.5-22q38 0 68.5 22t43.5 58h168q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm80-80h280v-80H280v80Zm0-160h400v-80H280v80Zm0-160h400v-80H280v80Zm200-190q13 0 21.5-8.5T510-820q0-13-8.5-21.5T480-850q-13 0-21.5 8.5T450-820q0 13 8.5 21.5T480-790ZM200-200v-560 560Z" />
        </svg>
      ),
      title: "Damage Reporting",
      description:
        "Help your community by reporting flood damage and impact data through our easy-to-use reporting system.",
    },
  ];

  const howItWorksSteps = [
    {
      number: "01",
      title: "Sign Up & Set Location",
      description: "Create your account and add your location to start receiving personalized flood alerts for your area."
    },
    {
      number: "02",
      title: "We Monitor Weather",
      description: "Our system continuously analyzes real-time weather data, river levels, and rainfall patterns."
    },
    {
      number: "03",
      title: "Receive Instant Alerts",
      description: "Get SMS notifications when flood risk increases, giving you time to prepare and stay safe."
    },
    {
      number: "04",
      title: "Take Action",
      description: "Access shelter locations, safety resources, and report damage to help your community."
    }
  ];

  const impactStats = [
    {
      number: "50K+",
      label: "Active Users Protected"
    },
    {
      number: "1.2M",
      label: "Alerts Sent"
    },
    {
      number: "98%",
      label: "Alert Accuracy"
    },
    {
      number: "500+",
      label: "Communities Served"
    }
  ];

  const safetyResources = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#2563EB">
          <path d="m438-338 226-226-57-57-169 169-84-84-57 57 141 141Zm42 258q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Zm0-84q104-33 172-132t68-220v-189l-240-90-240 90v189q0 121 68 220t172 132Zm0-316Z"/>
        </svg>
      ),
      title: "Emergency Preparedness",
      description: "Learn how to create an emergency kit, develop evacuation plans, and prepare your home for floods.",
      link: "#"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#2563EB">
          <path d="M440-280h80v-240h-80v240Zm40-320q17 0 28.5-11.5T520-640q0-17-11.5-28.5T480-680q-17 0-28.5 11.5T440-640q0 17 11.5 28.5T480-600Zm0 520q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
        </svg>
      ),
      title: "During a Flood",
      description: "Critical safety tips for what to do when flooding occurs, including evacuation procedures and staying safe.",
      link: "#"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#2563EB">
          <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/>
        </svg>
      ),
      title: "After the Flood",
      description: "Steps for returning home safely, documenting damage, and beginning the recovery process.",
      link: "#"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#2563EB">
          <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z"/>
        </svg>
      ),
      title: "Contact Emergency Services",
      description: "Quick access to emergency contacts, local authorities, and disaster relief organizations.",
      link: "#"
    }
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
    <div className="landing-page">
      <Navbar />

      {/* Hero Section */}
      <section id="hero" className="hero">
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
      <section id="features" className="features">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">How FloodAlert Protects You</h2>
          </div>

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

      {/* How It Works Section - Timeline */}
      <section id="how-it-works" className="how-it-works">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">
              Get protected in four simple steps
            </p>
          </div>

          <div className="timeline-container">
            <div className="timeline-line"></div>
            
            {howItWorksSteps.map((step, index) => (
              <div key={index} className="timeline-step">
                <div className="step-content">
                  <div className="step-number">{step.number}</div>
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-description">{step.description}</p>
                </div>
                <div className="timeline-dot"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="impact">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Impact</h2>
            <p className="section-subtitle">
              Making a difference in communities across the nation
            </p>
          </div>

          <div className="impact-stats">
            {impactStats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Resources Section - Bento Grid */}
      <section id="safety-resources" className="safety-resources">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Flood Safety Resources</h2>
            <p className="section-subtitle">
              Essential information to keep you prepared and safe
            </p>
          </div>

          <div className="resources-bento">
            {safetyResources.map((resource, index) => (
              <div key={index} className="resource-card">
                <div className="resource-icon">{resource.icon}</div>
                <h3 className="resource-title">{resource.title}</h3>
                <p className="resource-description">{resource.description}</p>
                <a href={resource.link} className="resource-link">
                  Learn More →
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq-section" className="faq-section">
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

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
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
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;