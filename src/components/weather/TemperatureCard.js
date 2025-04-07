import WeatherCardTemplate from './WeatherCardTemplate';

export default function TemperatureCard({ temperature, history, trend }) {
  // Temperature icon
  const icon = (
    <svg className="w-6 h-6" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
    </svg>
  );
  
  // Trend data
  const trendSymbol = trend > 0 ? "↑" : trend < 0 ? "↓" : "→";
  const trendChange = history.length > 1 ? Math.abs((history[0]?.temperature - history[history.length-1]?.temperature).toFixed(1)) : "";
  
  // Status info
  const feelsLike = Math.round(temperature * 0.95);
  const statusInfo = {
    label: "Feels like:",
    indicator: <span className="text-stone-800 dark:text-stone-300 ml-1 font-medium">{feelsLike}°C</span>
  };

  return (
    <WeatherCardTemplate
      title="Temperature"
      value={temperature}
      unit="°C"
      icon={icon}
      color="red"
      trendData={{
        symbol: trendSymbol,
        value: trendChange,
        unit: "°",
        sparklineData: history,
        sparklineField: "temperature",
        sparklineColor: "#c2410c", // amber-700
        height: 6,
        width: 48
      }}
      statusInfo={statusInfo}
    />
  );
} 