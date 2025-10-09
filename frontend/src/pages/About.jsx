import React from 'react';
import Header from '../components/global/Header';
import Footer from '../components/global/Footer';
import '../styles/components/about.css';

const AboutPage = () => {
  const features = [
    {
      icon: '🌊',
      title: 'Real-Time Monitoring',
      description: 'Live tracking of water levels, rainfall, and weather conditions across multiple locations with instant updates.',
    },
    {
      icon: '⚠️',
      title: 'Early Warning Alerts',
      description: 'Automated SMS and push notifications sent directly to your phone when flood risks are detected in your area.',
    },
    {
      icon: '📍',
      title: 'Interactive Maps',
      description: 'Visual flood risk maps showing affected areas, road closures, and safe evacuation routes in real-time.',
    },
    {
      icon: '🏠',
      title: 'Shelter Locator',
      description: 'Find nearby emergency shelters with real-time availability, amenities, and contact information.',
    },
    {
      icon: '👥',
      title: 'Community Reports',
      description: 'Crowdsourced updates from local residents providing on-ground flood conditions and hazards.',
    },
    {
      icon: '📊',
      title: 'Historical Data',
      description: 'Access past flood patterns and trends to better understand and prepare for future risks.',
    },
  ];

  return (
    <div className="about-page">
      <Header />
      
      <main className="about-page-main">
        {/* Hero Section */}
        <div className="about-page-hero">
          <h1 className="about-page-title">About FloodAlert</h1>
          <p className="about-page-subtitle">
            Empowering communities with real-time flood monitoring and early warning systems to save lives and protect property.
          </p>
        </div>

        {/* Mission Section */}
        <div className="about-page-section about-page-mission-section">
          <div className="about-page-section-header">
            <div className="about-page-section-icon about-page-mission-icon">🎯</div>
            <h2 className="about-page-section-title">Our Mission</h2>
          </div>
          <p className="about-page-section-text">
            FloodAlert is dedicated to protecting communities in flood-prone areas through advanced technology and real-time data. 
            We combine weather forecasting, IoT sensors, and community reporting to provide accurate, timely flood warnings that 
            help residents make informed decisions during emergencies. Our mission is to reduce the impact of floods on lives, 
            property, and infrastructure through proactive monitoring and rapid response coordination.
          </p>
        </div>

        {/* Features Grid */}
        <div className="about-page-features-container">
          <h2 className="about-page-features-heading">What We Offer</h2>
          <div className="about-page-features-grid">
            {features.map((feature, idx) => (
              <div key={idx} className="about-page-feature-card">
                <div className="about-page-feature-icon">{feature.icon}</div>
                <h3 className="about-page-feature-title">{feature.title}</h3>
                <p className="about-page-feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Section */}
        <div className="about-page-section about-page-technology-section">
          <div className="about-page-section-header">
            <div className="about-page-section-icon about-page-technology-icon">💻</div>
            <h2 className="about-page-section-title">How It Works</h2>
          </div>
          <div className="about-page-technology-grid">
            <div className="about-page-technology-item">
              <h3 className="about-page-technology-item-title">Data Collection</h3>
              <p className="about-page-technology-item-text">
                We integrate data from multiple sources including meteorological departments, IoT water level sensors, 
                satellite imagery, and community reports to create a comprehensive picture of flood risk.
              </p>
            </div>
            <div className="about-page-technology-item">
              <h3 className="about-page-technology-item-title">AI-Powered Analysis</h3>
              <p className="about-page-technology-item-text">
                Our advanced algorithms analyze weather patterns, historical data, and real-time conditions to predict 
                flood risks with high accuracy and provide early warnings.
              </p>
            </div>
            <div className="about-page-technology-item">
              <h3 className="about-page-technology-item-title">Instant Alerts</h3>
              <p className="about-page-technology-item-text">
                When flood risks are detected, our system automatically sends notifications through multiple channels 
                including SMS, push notifications, and in-app alerts.
              </p>
            </div>
            <div className="about-page-technology-item">
              <h3 className="about-page-technology-item-title">Community Support</h3>
              <p className="about-page-technology-item-text">
                Users can report local conditions, share updates, and help their neighbors stay informed, creating 
                a network of community resilience.
              </p>
            </div>
          </div>
        </div>

        {/* Team/Contact Section */}
        <div className="about-page-section about-page-contact-section">
          <h2 className="about-page-contact-heading">Get Involved</h2>
          <p className="about-page-contact-text">
            Join our mission to make communities safer. Whether you're a resident, developer, or organization, 
            there are many ways to contribute to flood preparedness.
          </p>
          <div className="about-page-contact-actions">
            <button className="about-page-contact-btn about-page-primary-btn">Contact Us</button>
            <button className="about-page-contact-btn about-page-secondary-btn">Partner With Us</button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutPage;