import React from 'react';
import '../../styles/components/global/footer.css';

// Footer component
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <div className="footer-brand">
            <span className="footer-logo"><img src='icon.svg'></img></span>
            <span className="footer-brand-text">FloodAlert</span>
          </div>
          <p className="footer-description">
            Real-time flood risk alerts and tools to keep you and your community protected.
          </p>
        </div>
        
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2025 FloodAlert. All rights reserved.</p>
        
      </div>
    </footer>
  );
};

export default Footer;