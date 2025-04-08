"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";
import { useWeatherData } from "../../hooks/useWeatherData";
import { formatDateTime } from "../../utils/weatherUtils";
import TemperatureCard from "../../components/weather/TemperatureCard";
import HumidityCard from "../../components/weather/HumidityCard";
import RainfallCardNew from "../../components/weather/RainfallCardNew";
import WindCardNew from "../../components/weather/WindCardNew";
import LogoutButton from "../../components/auth/LogoutButton";
import TodoList from "./TodoList";

export default function DashboardContent() {
  const { user } = useAuth();
  const router = useRouter();
  const { weatherData, weatherHistory, trends, loading, error } = useWeatherData();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user || loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-xl font-medium text-gray-700 dark:text-gray-300">{loading ? "Loading weather data..." : "Checking authentication..."}</p>
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

  const { formattedDate, formattedTime } = formatDateTime(weatherData.timestamp);
  const rainfall = Math.random() * 10;

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900 p-6 sm:p-8 md:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
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
            <svg className="w-5 h-5 mr-2 text-amber-700 dark:text-amber-500" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            Last updated: {formattedDate} at {formattedTime}
          </p>
        </header>

        {/* Weather Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-10">
          <TemperatureCard temperature={weatherData.temperature} history={weatherHistory} trend={trends.temperature} />
          <HumidityCard humidity={weatherData.humidity} history={weatherHistory} trend={trends.humidity} />
          <RainfallCardNew rainfall={rainfall} />
          <WindCardNew windSpeed={weatherData.windSpeed} windDirection={weatherData.windDirection} history={weatherHistory} trend={trends.windSpeed} />
        </div>

        {/* To-Do List */}
        <div className="bg-white dark:bg-stone-800 p-6 rounded-xl shadow-md border border-amber-200 dark:border-amber-900">
          <TodoList />
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-stone-500 dark:text-stone-400 text-sm border-t border-amber-200 dark:border-amber-900 pt-6">
          <p className="flex items-center justify-center">
            <svg className="w-4 h-4 mr-1.5 relative top-px text-amber-700 dark:text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            Last updated: {formattedDate} at {formattedTime}
          </p>
        </footer>
      </div>
    </div>
  );
}
