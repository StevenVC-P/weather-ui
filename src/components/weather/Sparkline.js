export function Sparkline({ data, field, height = 6, width = 48, color = "#78716c" }) {
  if (!data || data.length < 2) return null;

  // Extract values for the field
  const values = data.map((item) => parseFloat(item[field])).reverse();
  
  // Find min and max for scaling
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1; // Avoid division by zero
  
  // Calculate points for the sparkline
  const points = values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${x},${y}`;
    })
    .join(" ");
  
  // Add area under the sparkline
  const areaPoints = `${points} ${width},${height} 0,${height}`;
  
  return (
    <svg width={width} height={height} className="ml-2" viewBox={`0 0 ${width} ${height}`}>
      {/* Area under the line - subtle fill */}
      <polygon 
        points={areaPoints} 
        fill={color} 
        fillOpacity="0.05" 
      />
      {/* The line itself - hand-drawn feel */}
      <polyline 
        points={points} 
        fill="none" 
        stroke={color} 
        strokeWidth="0.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="0.5,0.5"
      />
      {/* End point - subtle dot */}
      <circle 
        cx={width} 
        cy={points.split(" ").pop().split(",")[1]} 
        r="0.75" 
        fill={color} 
      />
    </svg>
  );
} 