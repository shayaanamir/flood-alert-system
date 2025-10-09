import React from 'react';

// Data can be moved or fetched from an API later
const recentAlerts = [
  { id: 1, location: "Downtown Area", severity: "critical", time: "2:30 PM", status: "active" },
  { id: 2, location: "Riverside District", severity: "moderate", time: "1:45 PM", status: "resolved" },
  { id: 3, location: "Industrial Zone", severity: "moderate", time: "12:20 PM", status: "active" },
];

const RecentAlerts = () => (
  <div className="dashboard-card recent-alerts-card">
    <h3 className="card-title">Recent Alerts</h3>
    <table className="alerts-table">
      <thead>
        <tr>
          <th>Location</th>
          <th>Severity</th>
          <th>Time</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {recentAlerts.map((alert) => (
          <tr key={alert.id}>
            <td>{alert.location}</td>
            <td><span className={`status-badge status-badge-${alert.severity}`}>{alert.severity}</span></td>
            <td>{alert.time}</td>
            <td><span className={`status-badge status-badge-${alert.status}`}>{alert.status}</span></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default RecentAlerts;