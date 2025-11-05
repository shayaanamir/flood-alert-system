import React, { useEffect, useState } from "react";

/**
 * CommunityReports (live)
 * - fetches recent damage reports from backend
 * - expects backend endpoint: GET http://localhost:5000/damage-reports/recent
 *   fallback: GET http://localhost:5000/damage-reports?limit=5&sort=desc
 *
 * No CSS changes required — uses your existing classnames.
 */

const API_RECENT_REPORTS = "http://localhost:5000/damage-reports/recent"; // preferred
const POLL_INTERVAL_MS = 60 * 1000; // 60s, change to 0 to disable polling

// small helper to format relative times like "5 min ago"
function timeAgo(iso) {
  if (!iso) return "";
  const then = new Date(iso).getTime();
  const now = Date.now();
  const diff = Math.max(0, Math.floor((now - then) / 1000)); // seconds

  const mins = Math.floor(diff / 60);
  if (diff < 60) return `${diff} sec ago`;
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} hr ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? "s" : ""} ago`;
}

const PlaceholderAvatar = "https://randomuser.me/api/portraits/lego/1.jpg"; // simple default

export default function CommunityReports() {
  const [reports, setReports] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchRecent() {
    try {
      setLoading(true);
      setError(null);

      // try preferred endpoint first
      let res = await fetch(API_RECENT_REPORTS);
      if (!res.ok) {
        // fallback: try generic list endpoint (assumes /damage-reports returns array)
        res = await fetch("http://localhost:5000/damage-reports?limit=5&sort=desc");
      }

      if (!res.ok) throw new Error(`Failed to fetch recent reports (${res.status})`);
      const json = await res.json();

      // backend may return { success: true, data: [...] } or an array
      let arr = [];
      if (Array.isArray(json)) arr = json;
      else if (json?.success && Array.isArray(json.data)) arr = json.data;
      else if (Array.isArray(json.data)) arr = json.data;
      else arr = [];

      // map to minimal shape used by UI
      const mapped = arr.slice(0, 5).map((r) => ({
        id: r._id ?? r.id,
        title: r.title ?? r.description?.slice(0, 60) ?? "Report",
        location: r.location ?? r.address ?? "",
        time: r.updated_at ?? r.created_at ?? r.timestamp ?? null,
        avatar:
          (r.reporter_contact && r.reporter_contact.avatar) ||
          (r.reporter_contact && r.reporter_contact.photo) ||
          PlaceholderAvatar,
        // optionally prefer first image if reporter has no avatar
        image: (Array.isArray(r.images) && r.images[0]) || null,
        severity: r.severity ?? r.status ?? "",
      }));

      setReports(mapped);
      setLoading(false);
    } catch (err) {
      console.error("CommunityReports fetch error:", err);
      setError(err.message || "Failed to load reports");
      setReports([]);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRecent();
    if (POLL_INTERVAL_MS > 0) {
      const id = setInterval(fetchRecent, POLL_INTERVAL_MS);
      return () => clearInterval(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once

  return (
    <div className="dashboard-card community-report-card-compact">
      <h3 className="card-title">Community Reports</h3>

      {loading ? (
        <div style={{ padding: "0.75rem 1rem" }}>Loading reports...</div>
      ) : error ? (
        <div style={{ padding: "0.75rem 1rem", color: "#b91c1c" }}>Error: {error}</div>
      ) : (!reports || reports.length === 0) ? (
        <div style={{ padding: "0.75rem 1rem", color: "#6b7280" }}>No recent reports</div>
      ) : (
        <div className="community-reports-compact">
          {reports.map((report, idx) => (
            <div className="report-item-compact" key={report.id || idx} style={{ display: "flex", gap: "0.75rem", padding: "0.75rem 0", borderBottom: idx !== reports.length - 1 ? "1px solid #eef2f6" : "none" }}>
              <div className="user-avatar-compact" style={{ width: 40, height: 40, borderRadius: 999, overflow: "hidden", flex: "0 0 40px" }}>
                <img src={report.avatar || report.image || PlaceholderAvatar} alt="User" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div className="report-content-compact" style={{ flex: 1 }}>
                <p className="report-text-compact" style={{ margin: 0, fontWeight: 600 }}>{report.title}</p>
                <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.35rem", color: "#6b7280", fontSize: "0.85rem" }}>
                  <span className="report-time-compact">{timeAgo(report.time)}</span>
                  {report.location ? <span>· {report.location}</span> : null}
                  {report.severity ? <span>· {String(report.severity).toUpperCase()}</span> : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
