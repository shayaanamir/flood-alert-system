import React from 'react';

const RecentAlerts = ({ alerts = [] }) => {
    const getSeverityColor = (severity) => {
        switch (severity) {
            case 'Critical': return '#ff2a2aff';
            case 'Moderate': return '#ffd700';
            case 'Low': return '#90ee90';
            default: return '#ccc';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Active': return '#4dcdffff';
            case 'Resolved': return '#90ee90';
            case 'Pending': return '#ffd700';
            default: return '#ccc';
        }
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
        });
    };

    return (
        <div className="dashboard-card recent-alerts-card">
            <h3 className="card-title">Recent Alerts</h3>
            <div className="alerts-table-container">
                <table className="alerts-table">
                    <thead>
                        <tr>
                            <th>LOCATION</th>
                            <th>SEVERITY</th>
                            <th>TIME</th>
                            <th>STATUS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alerts.length > 0 ? (
                            alerts.map((alert) => (
                                <tr key={alert._id}>
                                    <td>{alert.location}</td>
                                    <td>
                                        <span 
                                            className="severity-badge"
                                            style={{ 
                                                backgroundColor: getSeverityColor(alert.severity),
                                                color: '#000',
                                                padding: '4px 12px',
                                                borderRadius: '12px',
                                                fontSize: '12px',
                                                fontWeight: '500'
                                            }}
                                        >
                                            {alert.severity}
                                        </span>
                                    </td>
                                    <td>{formatTime(alert.timestamp)}</td>
                                    <td>
                                        <span 
                                            className="status-badge"
                                            style={{ 
                                                backgroundColor: getStatusColor(alert.status),
                                                color: '#000',
                                                padding: '4px 12px',
                                                borderRadius: '12px',
                                                fontSize: '12px',
                                                fontWeight: '500'
                                            }}
                                        >
                                            {alert.status}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" style={{ textAlign: 'center' }}>
                                    No recent alerts
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecentAlerts;