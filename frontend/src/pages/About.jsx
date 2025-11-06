import React from 'react';
import Header from '../components/global/Header';
import Footer from '../components/global/Footer';
import '../styles/components/About.css';

// --- SVG Icon Components Defined Locally ---

const ActivityIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
  </svg>
);

const AlertTriangleIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
    <line x1="12" y1="9" x2="12" y2="13"></line>
    <line x1="12" y1="17" x2="12.01" y2="17"></line>
  </svg>
);

const MapPinIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const HomeIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const UsersIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const BarChartIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="12" y1="20" x2="12" y2="10"></line>
    <line x1="18" y1="20" x2="18" y2="4"></line>
    <line x1="6" y1="20" x2="6" y2="16"></line>
  </svg>
);

const TargetIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10"></circle>
    <circle cx="12" cy="12" r="6"></circle>
    <circle cx="12" cy="12" r="2"></circle>
  </svg>
);

const LaptopIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.28 2.55A1 1 0 0 1 20.28 20H3.72a1 1 0 0 1-.9-1.45L4 16"></path>
  </svg>
);


// --- Main Page Component ---

const AboutPage = () => {
  const features = [
    {
      icon: <ActivityIcon />,
      title: 'Real-Time Monitoring',
      description: 'Live tracking of water levels, rainfall, and weather conditions across multiple locations with instant updates.',
    },
    {
      icon: <AlertTriangleIcon />,
      title: 'Early Warning Alerts',
      description: 'Automated SMS and push notifications sent directly to your phone when flood risks are detected in your area.',
    },
    {
      icon: <MapPinIcon />,
      title: 'Interactive Maps',
      description: 'Visual flood risk maps showing affected areas, road closures, and safe evacuation routes in real-time.',
    },
    {
      icon: <HomeIcon />,
      title: 'Shelter Locator',
      description: 'Find nearby emergency shelters with real-time availability, amenities, and contact information.',
    },
    {
      icon: <UsersIcon />,
      title: 'Community Reports',
      description: 'Crowdsourced updates from local residents providing on-ground flood conditions and hazards.',
    },
    {
      icon: <BarChartIcon />,
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
            <div className="about-page-section-icon about-page-mission-icon">
              <TargetIcon />
            </div>
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
            <div className="about-page-section-icon about-page-technology-icon">
              <LaptopIcon />
            </div>
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