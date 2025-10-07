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
        
        <div className="footer-section">
          <h4>Resources</h4>
          <ul className="footer-links">
            <li><a href="#">About Us</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Flood Safety</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Legal</h4>
          <ul className="footer-links">
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Data Policy</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Emergency</h4>
          <ul className="footer-links">
            <li><a href="#">Contact Emergency</a></li>
            <li><a href="#">Hotlines</a></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2025 FloodAlert. All rights reserved.</p>
        
      </div>
    </footer>
  );
};

export default Footer;