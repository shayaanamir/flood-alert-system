import React from 'react';
import './../styles/components/featureCard.css';

const FeatureCard = ({ icon, title, description, className = '' }) => {
  return (
    <div className={`feature-card ${className}`}>
      <div className="feature-icon">{icon}</div>
      <h3 className="feature-title">{title}</h3>
      <p className="feature-description">{description}</p>
    </div>
  );
};

export default FeatureCard;