import React from "react";

const SummaryCard = ({ icon, title, value, subtitle, customClass, badge, badgeClass }) => (
  <div className={`dashboard-card summary-card ${customClass}`} style={{ position: "relative" }}>
    {/* optional badge top-right */}
    {badge && (
      <div className={`summary-card-badge ${badgeClass || ""}`} aria-hidden>
        {badge}
      </div>
    )}

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
