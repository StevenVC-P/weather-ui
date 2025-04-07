"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";
import { useWeatherData } from "../../hooks/useWeatherData";
import { formatDateTime } from "../../utils/weatherUtils";
import TemperatureCard from "../../components/weather/TemperatureCard";
import HumidityCard from "../../components/weather/HumidityCard";
import RainfallCard from "../../components/weather/RainfallCard";
import WindCardNew from "../../components/weather/WindCardNew";
import RainfallCardNew from "../../components/weather/RainfallCardNew";
import LogoutButton from "../../components/auth/LogoutButton";

// Micro sparkline component
const Sparkline = ({ data, field, height = 4, width = 10, color = "currentColor" }) => {
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

  return (
    <svg width={width} height={height} className="ml-0.5">
      <polyline points={points} fill="none" stroke={color} strokeWidth="0.25" />
    </svg>
  );
};

// Helper function to convert wind direction in degrees to cardinal direction
function getWindDirectionText(degrees) {
  const directions = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
}

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const { weatherData, weatherHistory, trends, loading, error } = useWeatherData();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-xl font-medium text-gray-700 dark:text-gray-300">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-xl font-medium text-gray-700 dark:text-gray-300">Loading weather data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Error loading data</h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">No weather data available</h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">We could not find any weather data. Please check back later.</p>
        </div>
      </div>
    );
  }

  // Format the timestamp
  const { formattedDate, formattedTime } = formatDateTime(weatherData.timestamp);

  // Calculate rainfall (this is a placeholder since your data doesn't include rainfall)
  // In a real app, you would get this from your weather data
  const rainfall = Math.random() * 10; // Random value for demonstration

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900 p-6 sm:p-8 md:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header with user info */}
        <header className="mb-10 border-b border-stone-200 dark:border-stone-700 pb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-stone-800 dark:text-stone-200 tracking-tight">Weather Dashboard</h1>
            <div className="flex items-center">
              {user.photoURL && <img src={user.photoURL} alt="Profile" className="w-10 h-10 rounded-full mr-3" />}
              <div className="text-right">
                <p className="text-stone-800 dark:text-stone-200 font-medium">{user.displayName || user.email}</p>
                <LogoutButton />
              </div>
            </div>
          </div>
          <p className="mt-4 text-stone-600 dark:text-stone-400 flex items-center font-medium text-base">
            <svg className="w-5 h-5 mr-2 text-amber-700 dark:text-amber-500" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            <span>
              Last updated: {formattedDate} at {formattedTime}
            </span>
          </p>
        </header>

        {/* More spacious grid with rustic cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          <TemperatureCard temperature={weatherData.temperature} history={weatherHistory} trend={trends.temperature} />
          <HumidityCard humidity={weatherData.humidity} history={weatherHistory} trend={trends.humidity} />
          <RainfallCardNew rainfall={rainfall} />
          <WindCardNew windSpeed={weatherData.windSpeed} windDirection={weatherData.windDirection} history={weatherHistory} trend={trends.windSpeed} />
        </div>

        {/* Future modules with homestead aesthetic */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-stone-100 dark:bg-stone-800 rounded-xl shadow-md p-6 border border-amber-200 dark:border-amber-900 transition-all duration-300 hover:shadow-lg">
            <h2 className="text-xl font-serif text-stone-700 dark:text-stone-300 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-amber-700 dark:text-amber-500" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="relative top-px">Weather Forecast</span>
            </h2>
            <p className="text-stone-500 dark:text-stone-400">Coming soon: 5-day weather forecast</p>
          </div>

          <div className="bg-stone-100 dark:bg-stone-800 rounded-xl shadow-md p-6 border border-amber-200 dark:border-amber-900 transition-all duration-300 hover:shadow-lg">
            <h2 className="text-xl font-serif text-stone-700 dark:text-stone-300 mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-amber-700 dark:text-amber-500" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span className="relative top-px">Weather Alerts</span>
            </h2>
            <p className="text-stone-500 dark:text-stone-400">Coming soon: Weather alerts and warnings</p>
          </div>
        </div>

        {/* Footer with homestead aesthetic */}
        <footer className="mt-12 text-center text-stone-500 dark:text-stone-400 text-sm border-t border-amber-200 dark:border-amber-900 pt-6">
          <p className="flex items-center justify-center">
            <svg className="w-4 h-4 mr-1.5 relative top-px text-amber-700 dark:text-amber-500" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            <span>
              Last updated: {formattedDate} at {formattedTime}
            </span>
          </p>
        </footer>
      </div>
    </div>
  );
}
