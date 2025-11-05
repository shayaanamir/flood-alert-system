import React, { useEffect, useState, useRef } from "react";

const DEFAULT_COORDS = { lat: 19.0760, lon: 72.8777 }; // Mumbai
const REFRESH_MS = 5 * 60 * 1000; // 5 minutes
const W = 800;
const H = 200;
const PAD = { l: 40, r: 20, t: 20, b: 30 };

/**
 * Lightweight RainfallChart
 * props:
 *  - coords: { lat, lon } optional
 *  - hourly: { time:[], precipitation:[] } optional (preferred)
 *  - refresh: boolean (default false) - when true, re-fetch every 5 minutes
 */
export default function RainfallChart({ coords, hourly, refresh = false }) {
  const [points, setPoints] = useState([]); // [{x,y,val,label}]
  const [loading, setLoading] = useState(!hourly);
  const [error, setError] = useState(null);
  const timerRef = useRef(null);

  // Small helper: process hourly -> points
  function process(hourlyObj) {
    const times = Array.isArray(hourlyObj?.time) ? hourlyObj.time : [];
    const precip = Array.isArray(hourlyObj?.precipitation) ? hourlyObj.precipitation : [];
    const start = Math.max(0, precip.length - 12);
    const p = precip.slice(start);
    const t = times.slice(start);
    const max = Math.max(...p, 1);
    const drawableW = W - PAD.l - PAD.r;
    const drawableH = H - PAD.t - PAD.b;
    const n = Math.max(1, p.length);

    return p.map((v, i) => {
      const x = PAD.l + (i / Math.max(1, n - 1)) * drawableW;
      const y = PAD.t + (1 - v / max) * drawableH;
      const label = t[i] ? new Date(t[i]).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "";
      return { x, y, v, label };
    });
  }

  async function fetchHourly(lat, lon) {
    try {
      setLoading(true);
      setError(null);
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${encodeURIComponent(lat)}&longitude=${encodeURIComponent(lon)}&hourly=precipitation&past_hours=12&timezone=auto`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`API ${res.status}`);
      const json = await res.json();
      if (!json?.hourly) throw new Error("Bad response");
      setPoints(process(json.hourly));
    } catch (err) {
      console.error("RainfallChart:", err);
      setError(err.message || "Fetch error");
      setPoints([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // If parent provided hourly data, use it and skip fetching
    if (hourly && hourly.time && hourly.precipitation) {
      setPoints(process(hourly));
      setLoading(false);
      setError(null);
      return;
    }

    const lat = (coords && coords.lat) ?? DEFAULT_COORDS.lat;
    const lon = (coords && coords.lon) ?? DEFAULT_COORDS.lon;
    fetchHourly(lat, lon);

    // optional refresh
    if (refresh) {
      timerRef.current = setInterval(() => fetchHourly(lat, lon), REFRESH_MS);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [coords, hourly, refresh]);

  if (loading) return <div style={{ padding: 24, color: "#64748b" }}>Loading chart...</div>;
  if (error) return <div style={{ padding: 24, color: "#ef4444" }}>Error: {error}</div>;
  if (!points || points.length === 0) return <div style={{ padding: 24, color: "#64748b" }}>No rainfall data</div>;

  // Build simple path
  const path = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} className="rainfall-chart">
      {/* simple background grid (3 lines) */}
      {[0, 0.5, 1].map((f, i) => (
        <line
          key={i}
          x1={PAD.l}
          x2={W - PAD.r}
          y1={PAD.t + f * (H - PAD.t - PAD.b)}
          y2={PAD.t + f * (H - PAD.t - PAD.b)}
          stroke="#eef2f6"
          strokeWidth={1}
        />
      ))}

      {/* x labels (every 2 points) */}
      {points.filter((_, i) => i % 2 === 0).map((p, i) => (
        <text key={i} x={p.x} y={H - PAD.b + 16} fontSize="10" fill="#64748b" textAnchor="middle">{p.label}</text>
      ))}

      {/* simple filled area (light) */}
      <path d={`${path} L ${points[points.length - 1].x} ${H - PAD.b} L ${points[0].x} ${H - PAD.b} Z`} fill="#3b82f6" opacity="0.12" />

      {/* stroke line */}
      <path d={path} fill="none" stroke="#2563eb" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />

      {/* points */}
      {points.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r={3.5} fill="#fff" stroke="#2563eb" strokeWidth={1.5} />
          <title>{`${p.label}: ${Number(p.v).toFixed(1)} mm`}</title>
        </g>
      ))}

      {/* Y label */}
      <text x={12} y={H / 2} textAnchor="middle" fontSize="11" fill="#64748b" transform={`rotate(-90, 12, ${H / 2})`}>mm/h</text>

      {/* legend */}
      <text x={PAD.l} y={PAD.t - 6} fontSize="11" fill="#0f172a" fontWeight="600">Past 12 hours</text>
    </svg>
  );
}
