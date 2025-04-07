import React from "react";
import WeatherCardTemplate from "./WeatherCardTemplate";

export default function RainfallCardNew({ rainfall }) {
  // Determine rainfall intensity
  const intensity = rainfall > 5 ? "Heavy" : rainfall > 2 ? "Moderate" : "Light";

  // Rainfall icon
  const icon = (
    <svg className="w-6 h-6" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
      <path d="M12 12v9" />
    </svg>
  );

  // Status info with color indicators that work with Tailwind
  const statusInfo = {
    label: `${intensity} rain`,
    indicator: <span className={`ml-1 w-2 h-2 rounded-full inline-block ${intensity === "Heavy" ? "bg-amber-700" : intensity === "Moderate" ? "bg-amber-500" : "bg-emerald-500"}`} />,
  };

  // Additional info - rainfall gauge with rustic styling
  const additionalInfo = (
    <div className="mt-3">
      <div className="w-full bg-stone-200 dark:bg-stone-700 rounded-full h-2">
        <div className="bg-emerald-500 dark:bg-emerald-600 h-2 rounded-full" style={{ width: `${Math.min(rainfall * 5, 100)}%` }}></div>
      </div>
    </div>
  );

  return <WeatherCardTemplate title="Rainfall" value={rainfall.toFixed(1)} unit=" mm" icon={icon} color="green" statusInfo={statusInfo} additionalInfo={additionalInfo} />;
} 