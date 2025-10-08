import React, { useState, useEffect } from 'react';

// The actual SVG chart renderer
const RainfallChartDisplay = ({ chartHeight, chartWidth, padding, points, pathData, maxValue }) => (
    <svg width="100%" height={chartHeight} viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="rainfall-chart">
        {[0, 1, 2, 3, 4].map((i) => {
            const y = chartHeight - padding.bottom - (i * (chartHeight - padding.top - padding.bottom) / 4);
            const value = Math.round((maxValue / 4) * i);
            return (
                <g key={i}>
                    <line x1={padding.left} y1={y} x2={chartWidth - padding.right} y2={y} stroke="#e2e8f0" strokeWidth="1" />
                    <text x={padding.left - 10} y={y + 4} textAnchor="end" fontSize="11" fill="#94a3b8">{value}</text>
                </g>
            );
        })}
        {points.map((p, i) => (
            <text key={i} x={p.x} y={chartHeight - padding.bottom + 20} textAnchor="middle" fontSize="11" fill="#64748b">{p.time}</text>
        ))}
        <text x={padding.left - 35} y={chartHeight / 2} textAnchor="middle" fontSize="12" fill="#64748b" transform={`rotate(-90, ${padding.left - 35}, ${chartHeight / 2})`}>mm/h</text>
        <defs>
            <linearGradient id="rainfallGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.05" />
            </linearGradient>
        </defs>
        <path d={`${pathData} L ${points[points.length - 1]?.x || 0} ${chartHeight - padding.bottom} L ${points[0]?.x || 0} ${chartHeight - padding.bottom} Z`} fill="url(#rainfallGradient)" />
        <path d={pathData} fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={4} fill="white" stroke="#3b82f6" strokeWidth="2" />
        ))}
    </svg>
);


const RainfallChart = () => {
  const [chartData, setChartData] = useState({ points: [], pathData: '', maxValue: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const chartWidth = 600;
  const chartHeight = 300;
  const padding = { top: 20, right: 20, bottom: 40, left: 50 };

  const processApiData = (apiData) => {
    // ... (rest of the processing logic is identical to your old one)
    const times = apiData.hourly.time;
    const precipitation = apiData.hourly.precipitation;
    const maxValue = Math.max(...precipitation, 1);
    const drawableWidth = chartWidth - padding.left - padding.right;
    const drawableHeight = chartHeight - padding.top - padding.bottom;

    const points = precipitation.map((value, i) => ({
      x: padding.left + (i / (precipitation.length - 1)) * drawableWidth,
      y: chartHeight - padding.bottom - (value / maxValue) * drawableHeight,
      time: new Date(times[i]).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    }));

    const pathData = points.map((p, i) => i === 0 ? `M ${p.x},${p.y}` : `L ${p.x},${p.y}`).join(' ');
    
    return { points, pathData, maxValue };
  };

  useEffect(() => {
    const apiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=19.0760&longitude=72.8777&hourly=precipitation';

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => setChartData(processApiData(data)))
      .catch(error => setError(error.message))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <div>Loading chart data... ⏳</div>;
  if (error) return <div>Error fetching data: {error} 😞</div>;

  return (
    <RainfallChartDisplay 
      chartHeight={chartHeight}
      chartWidth={chartWidth}
      padding={padding}
      points={chartData.points}
      pathData={chartData.pathData}
      maxValue={chartData.maxValue}
    />
  );
};

export default RainfallChart;