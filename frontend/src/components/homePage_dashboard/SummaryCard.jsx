import React from 'react';

const SummaryCard = ({ icon, title, value, subtitle, customClass }) => (
  <div className={`dashboard-card summary-card ${customClass}`}>
    <div className="card-header">
      {icon}
      <span>{title}</span>
    </div>
    <div className="card-body">
      <p className={`${customClass}-value`}>{value}</p>
      <small>{subtitle}</small>
    </div>
  </div>
);

export default SummaryCard;