import React from 'react';
import Header from '../components/global/Header';
import Footer from '../components/global/Footer';
import '../styles/components/helpGuidelines.css';

// --- SVG Icon Components Defined Locally ---

const ShieldIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

const InfoIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="16" x2="12" y2="12"></line>
    <line x1="12" y1="8" x2="12.01" y2="8"></line>
  </svg>
);

const HomeIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const PhoneIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

const AlertTriangleIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
        <line x1="12" y1="9" x2="12" y2="13"></line>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
);

// --- Main Page Component ---

const HelpGuidelinesPage = () => {
  const stats = [
    { number: '15 cm', label: 'Can knock you down' },
    { number: '30 cm', label: 'Can move a car' },
    { number: '60 cm', label: 'Can sweep away vehicles' },
    { number: '< 5min', label: 'Time to evacuate safely' },
  ];

  const guidelineCards = [
    {
      icon: <ShieldIcon />,
      title: 'Emergency Preparedness',
      description: 'Learn how to create an emergency kit, develop evacuation plans, and prepare your home for floods.',
      link: '#preparedness',
      color: '#3b82f6',
      content: [
        'Create an emergency kit with essential supplies (water, food, first aid, torch, batteries, medications)',
        'Develop a family evacuation plan with multiple routes',
        'Identify your area\'s flood risk and evacuation zones from local municipal sources',
        'Keep important documents in waterproof containers or stored digitally',
        'Install check valves in plumbing to prevent sewage backflow',
        'Consider property and asset insurance that covers flood damage',
        'Elevate electrical appliances and utilities above potential flood levels',
      ]
    },
    {
      icon: <InfoIcon />,
      title: 'During a Flood',
      description: 'Critical safety tips for what to do when flooding occurs, including evacuation procedures and staying safe.',
      link: '#during-flood',
      color: '#ef4444',
      content: [
        'Evacuate immediately if told to do so by authorities like the NDRF or local police',
        'Never walk, swim, or drive through flood waters - just 15 cm can knock you down',
        'Stay off bridges over fast-moving water',
        'If trapped in a building, go to the highest level but do NOT climb into a closed attic',
        'Listen to emergency broadcasts (radio, TV, official social media) for updates',
        'Turn off utilities at main switches if instructed',
        'Avoid contact with flood water as it may be contaminated with sewage and chemicals',
        'Keep your phone charged and use SMS to communicate to conserve battery and bandwidth',
      ]
    },
    {
      icon: <HomeIcon />,
      title: 'After the Flood',
      description: 'Steps for returning home safely, documenting damage, and beginning the recovery process.',
      link: '#after-flood',
      color: '#10b981',
      content: [
        'Wait for authorities to declare it\'s safe to return',
        'Document all damage with photos/videos for insurance claims before cleaning up',
        'Wear protective clothing (gloves, boots) when entering your home',
        'Be aware of structural damage, loose wiring, and gas leaks',
        'Watch for animals, especially snakes, that may have entered your home',
        'Check for gas leaks - if you smell gas, leave immediately and call for help',
        'Throw away food and medicines that came in contact with flood water',
        'Clean and disinfect everything touched by flood water to prevent diseases',
        'Pump out flooded basements gradually (about 1/3 per day) to avoid structural damage',
      ]
    },
    {
      icon: <PhoneIcon />,
      title: 'Contact Emergency Services',
      description: 'Quick access to emergency contacts, local authorities, and disaster relief organizations in India.',
      link: '#emergency-contacts',
      color: '#f59e0b',
      content: [
        'National Emergency Helpline: 112',
        'Police: 100',
        'Fire & Rescue: 101',
        'Ambulance: 102 / 108',
        'National Disaster Management (NDMA) Helpline: 1078',
        'State Disaster Management Helpline: 1077',
        'Contact your local District Disaster Management Authority (DDMA) for area-specific help',
        'Keep these numbers saved in your phone and written down in your emergency kit',
      ]
    },
  ];

  return (
    <div className="help-guidelines-page">
      <Header />
      
      <main className="help-guidelines-main">
        {/* Hero Section */}
        <div className="help-guidelines-hero">
          <h1 className="help-guidelines-title">Flood Safety Guidelines</h1>
          <p className="help-guidelines-subtitle">
            Essential information to help you stay safe before, during, and after a flood emergency.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="help-guidelines-stats-grid">
          {stats.map((stat, idx) => (
            <div key={idx} className="help-guidelines-stat-card">
              <div className="help-guidelines-stat-number">{stat.number}</div>
              <div className="help-guidelines-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Main Guidelines Grid */}
        <div className="help-guidelines-grid">
          {guidelineCards.map((card, idx) => (
            <div key={idx} id={card.link.substring(1)} className="help-guidelines-card">
              {/* Card Header */}
              <div className="help-guidelines-card-header" style={{ background: `linear-gradient(135deg, ${card.color}15, ${card.color}05)` }}>
                <div className="help-guidelines-card-icon-wrapper" style={{ background: `linear-gradient(135deg, ${card.color}, ${card.color}dd)`, boxShadow: `0 4px 12px ${card.color}40` }}>
                  <span className="help-guidelines-card-icon">{card.icon}</span>
                </div>
                <h2 className="help-guidelines-card-title">{card.title}</h2>
                <p className="help-guidelines-card-description">{card.description}</p>
              </div>

              {/* Card Content */}
              <div className="help-guidelines-card-content">
                <ul className="help-guidelines-card-list">
                  {card.content.map((item, itemIdx) => (
                    <li key={itemIdx} className="help-guidelines-card-item">
                      <span className="help-guidelines-card-item-number" style={{ backgroundColor: `${card.color}20`, color: card.color }}>
                        {itemIdx + 1}
                      </span>
                      <span className="help-guidelines-card-item-text">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Learn More Link */}
              <div className="help-guidelines-card-footer">
                <a href={card.link} className="help-guidelines-card-link" style={{ color: card.color }}>
                  Learn More →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Alert Box */}
        <div className="help-guidelines-emergency-alert">
          <div className="help-guidelines-alert-icon">
            <AlertTriangleIcon />
          </div>
          <div className="help-guidelines-alert-content">
            <h3 className="help-guidelines-alert-title">Remember: Turn Around, Don't Drown</h3>
            <p className="help-guidelines-alert-text">
              Most flood-related deaths occur in vehicles. Never drive through flooded roads. It only takes 30 cm 
              of rushing water to carry away most cars. If you come to a flooded area, turn around and find another route.
            </p>
            <div className="help-guidelines-alert-actions">
              <button className="help-guidelines-alert-btn help-guidelines-primary-btn">Call Emergency: 112</button>
              <button className="help-guidelines-alert-btn help-guidelines-secondary-btn">View Risk Map</button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HelpGuidelinesPage;