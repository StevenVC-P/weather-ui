import WeatherCardTemplate from './WeatherCardTemplate';
import { getWindDirectionText } from '../../utils/weatherUtils';

export default function WindCard({ windSpeed, windDirection, history, trend }) {
  // Determine wind intensity
  const intensity = windSpeed > 20 ? "Strong" : windSpeed > 10 ? "Moderate" : "Light";
  
  // Wind icon
  const icon = (
    <svg className="w-6 h-6" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
      <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
      <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
    </svg>
  );
  
  // Trend data
  const trendSymbol = trend > 0 ? "↑" : trend < 0 ? "↓" : "→";
  const trendChange = history.length > 1 ? Math.abs((history[0]?.windSpeed - history[history.length-1]?.windSpeed).toFixed(1)) : "";
  
  // Direction info with rustic styling
  const directionInfo = windDirection ? (
    <div className="mt-3 text-sm flex items-center text-stone-500 dark:text-stone-400">
      <span className="flex items-center">
        {getWindDirectionText(windDirection)} ({windDirection}°)
        <svg className="w-3 h-3 ml-1" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transform: `rotate(${windDirection}deg)` }}>
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </span>
    </div>
  ) : (
    <div className="mt-3 text-sm text-stone-500 dark:text-stone-400">
      No direction data
    </div>
  );
  
  // Status info with color indicators that work with Tailwind
  const statusInfo = {
    label: `${intensity} breeze`,
    indicator: <span className={`ml-1 w-2 h-2 rounded-full inline-block ${
      intensity === "Strong" ? "bg-amber-700" : 
      intensity === "Moderate" ? "bg-amber-500" : 
      "bg-emerald-500"
    }`} />
  };

  return (
    <WeatherCardTemplate
      title="Wind"
      value={windSpeed}
      unit=" km/h"
      icon={icon}
      color="yellow"
      trendData={{
        symbol: trendSymbol,
        value: trendChange,
        unit: " km/h",
        sparklineData: history,
        sparklineField: "windSpeed",
        sparklineColor: "#b45309", // amber-800
        height: 6,
        width: 48
      }}
      statusInfo={statusInfo}
      additionalInfo={directionInfo}
    />
  );
} 