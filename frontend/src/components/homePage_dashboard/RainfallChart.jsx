import React, { useState, useEffect } from 'react';

const RainfallChart = () => {
  const [chartData, setChartData] = useState({ 
    points: [], 
    pathData: '', 
    maxValue: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const chartWidth = 900;
  const chartHeight = 320;
  const padding = { top: 40, right: 80, bottom: 50, left: 60 };

  // Risk thresholds (mm/h)
  const thresholds = {
    critical: 50,    // Red zone
    high: 25,        // Orange zone
    moderate: 10,    // Yellow zone
    low: 0          // Green zone
  };

  const processApiData = (apiData) => {
    const times = apiData.hourly.time;
    const precipitation = apiData.hourly.precipitation;
    
    // Take past 12 hours only
    const past12 = precipitation.slice(0, 12);
    const times12 = times.slice(0, 12);
    
    const maxValue = Math.max(...past12, thresholds.critical + 10, 1);
    const drawableWidth = chartWidth - padding.left - padding.right;
    const drawableHeight = chartHeight - padding.top - padding.bottom;

    const points = past12.map((value, i) => ({
      x: padding.left + (i / (past12.length - 1)) * drawableWidth,
      y: chartHeight - padding.bottom - (value / maxValue) * drawableHeight,
      value: value,
      time: new Date(times12[i]).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      isPast: true
    }));

    const pathData = points.map((p, i) => i === 0 ? `M ${p.x},${p.y}` : `L ${p.x},${p.y}`).join(' ');
    
    return { points, pathData, maxValue };
  };

  useEffect(() => {
    const apiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=19.0760&longitude=72.8777&hourly=precipitation&past_hours=12';

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => setChartData(processApiData(data)))
      .catch(error => setError(error.message))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return (
    <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
      Loading chart data... ⏳
    </div>
  );
  
  if (error) return (
    <div style={{ padding: '40px', textAlign: 'center', color: '#ef4444' }}>
      Error fetching data: {error}
    </div>
  );

  const { points, pathData, maxValue } = chartData;
  const drawableHeight = chartHeight - padding.top - padding.bottom;

  // Calculate Y positions for threshold lines
  const getThresholdY = (value) => {
    return chartHeight - padding.bottom - (value / maxValue) * drawableHeight;
  };

  return (
    <svg width="100%" height={chartHeight} viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="rainfall-chart">
      {/* Risk zones backgrounds */}
      <defs>
        <linearGradient id="criticalZone" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#dc2626" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#dc2626" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="highZone" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#ea580c" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#ea580c" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="moderateZone" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#eab308" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#eab308" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="rainfallGradient" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {/* Critical zone */}
      <rect 
        x={padding.left} 
        y={padding.top} 
        width={chartWidth - padding.left - padding.right} 
        height={getThresholdY(thresholds.critical) - padding.top}
        fill="url(#criticalZone)"
      />

      {/* High zone */}
      <rect 
        x={padding.left} 
        y={getThresholdY(thresholds.critical)} 
        width={chartWidth - padding.left - padding.right} 
        height={getThresholdY(thresholds.high) - getThresholdY(thresholds.critical)}
        fill="url(#highZone)"
      />

      {/* Moderate zone */}
      <rect 
        x={padding.left} 
        y={getThresholdY(thresholds.high)} 
        width={chartWidth - padding.left - padding.right} 
        height={getThresholdY(thresholds.moderate) - getThresholdY(thresholds.high)}
        fill="url(#moderateZone)"
      />

      {/* Grid lines */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const y = chartHeight - padding.bottom - (i * drawableHeight / 5);
        const value = Math.round((maxValue / 5) * i);
        return (
          <g key={i}>
            <line 
              x1={padding.left} 
              y1={y} 
              x2={chartWidth - padding.right} 
              y2={y} 
              stroke="#e2e8f0" 
              strokeWidth="1" 
              strokeDasharray={i === 0 ? "0" : "4 4"}
            />
            <text x={padding.left - 10} y={y + 4} textAnchor="end" fontSize="11" fill="#94a3b8">
              {value}
            </text>
          </g>
        );
      })}

      {/* Threshold lines with labels */}
      <line 
        x1={padding.left} 
        y1={getThresholdY(thresholds.critical)} 
        x2={chartWidth - padding.right} 
        y2={getThresholdY(thresholds.critical)} 
        stroke="#dc2626" 
        strokeWidth="2" 
        strokeDasharray="6 3"
      />
      <text 
        x={chartWidth - padding.right + 10} 
        y={getThresholdY(thresholds.critical) + 4} 
        textAnchor="start" 
        fontSize="11" 
        fill="#dc2626"
        fontWeight="600"
      >
        Critical
      </text>

      <line 
        x1={padding.left} 
        y1={getThresholdY(thresholds.high)} 
        x2={chartWidth - padding.right} 
        y2={getThresholdY(thresholds.high)} 
        stroke="#ea580c" 
        strokeWidth="2" 
        strokeDasharray="6 3"
      />
      <text 
        x={chartWidth - padding.right + 10} 
        y={getThresholdY(thresholds.high) + 4} 
        textAnchor="start" 
        fontSize="11" 
        fill="#ea580c"
        fontWeight="600"
      >
        High
      </text>

      <line 
        x1={padding.left} 
        y1={getThresholdY(thresholds.moderate)} 
        x2={chartWidth - padding.right} 
        y2={getThresholdY(thresholds.moderate)} 
        stroke="#eab308" 
        strokeWidth="2" 
        strokeDasharray="6 3"
      />
      <text 
        x={chartWidth - padding.right + 10} 
        y={getThresholdY(thresholds.moderate) + 4} 
        textAnchor="start" 
        fontSize="11" 
        fill="#eab308"
        fontWeight="600"
      >
        Moderate
      </text>

      {/* X-axis labels - show every 2 hours */}
      {points.filter((_, i) => i % 2 === 0).map((p, idx) => (
        <text 
          key={idx} 
          x={p.x} 
          y={chartHeight - padding.bottom + 20} 
          textAnchor="middle" 
          fontSize="11" 
          fill="#64748b"
          fontWeight="400"
        >
          {p.time}
        </text>
      ))}

      {/* Remove the vertical "NOW" line and past/forecast separator */}

      {/* Y-axis label */}
      <text 
        x={padding.left - 45} 
        y={chartHeight / 2} 
        textAnchor="middle" 
        fontSize="12" 
        fill="#64748b" 
        transform={`rotate(-90, ${padding.left - 45}, ${chartHeight / 2})`}
      >
        Rainfall (mm/h)
      </text>

      {/* Data line gradient fill */}
      <path 
        d={`${pathData} L ${points[points.length - 1]?.x || 0} ${chartHeight - padding.bottom} L ${points[0]?.x || 0} ${chartHeight - padding.bottom} Z`} 
        fill="url(#rainfallGradient)" 
      />

      {/* Data line - all past data (solid) */}
      <path 
        d={pathData} 
        fill="none" 
        stroke="#3b82f6" 
        strokeWidth="3" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />

      {/* Data points - show every 2 hours */}
      {points.filter((_, i) => i % 2 === 0).map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r={5} fill="white" stroke="#3b82f6" strokeWidth="2" />
          <title>{`${p.time}: ${p.value.toFixed(1)} mm/h`}</title>
        </g>
      ))}

      {/* Legend */}
      <g transform={`translate(${padding.left}, ${chartHeight - 15})`}>
        <line x1="0" y1="0" x2="25" y2="0" stroke="#3b82f6" strokeWidth="3" />
        <text x="30" y="4" fontSize="11" fill="#64748b">Past 12 Hours</text>
      </g>
    </svg>
  );
};

export default RainfallChart;