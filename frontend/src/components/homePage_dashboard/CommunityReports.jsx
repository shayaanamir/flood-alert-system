import React from 'react';

// Hardcoded data for this component
const communityReports = [
  { id: 1, avatar: "https://randomuser.me/api/portraits/men/32.jpg", text: "Water level rising near Main St.", time: "5 min ago" },
  { id: 2, avatar: "https://randomuser.me/api/portraits/women/44.jpg", text: "Road blocked at 5th Avenue", time: "12 min ago" },
  { id: 3, avatar: "https://randomuser.me/api/portraits/men/65.jpg", text: "Heavy rainfall in Worli area", time: "25 min ago" },
];

const CommunityReports = () => (
  <div className="dashboard-card community-report-card-compact">
    <h3 className="card-title">Community Reports</h3>
    <div className="community-reports-compact">
      {communityReports.map((report) => (
        <div className="report-item-compact" key={report.id}>
          <div className="user-avatar-compact"><img src={report.avatar} alt="User" /></div>
          <div className="report-content-compact">
            <p className="report-text-compact">{report.text}</p>
            <span className="report-time-compact">{report.time}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default CommunityReports;