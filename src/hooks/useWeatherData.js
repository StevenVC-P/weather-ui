import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export function useWeatherData(recordCount = 5) {
  const [weatherData, setWeatherData] = useState(null);
  const [weatherHistory, setWeatherHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchWeatherData() {
      try {
        setLoading(true);
        const weatherCollection = collection(db, "weather");
        const weatherSnapshot = await getDocs(weatherCollection);
        
        const results = [];
        weatherSnapshot.docs.forEach((doc) => {
          results.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        
        // Sort by timestamp (newest first)
        results.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        
        // Get the most recent data and history
        if (results.length > 0) {
          setWeatherData(results[0]);
          setWeatherHistory(results.slice(0, recordCount));
        } else {
          setWeatherData(null);
          setWeatherHistory([]);
        }
        
        setError(null);
      } catch (err) {
        console.error("Error fetching weather data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchWeatherData();
    
    // Refresh data every 5 minutes
    const intervalId = setInterval(fetchWeatherData, 5 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, [recordCount]);

  // Calculate trends
  const trends = {
    temperature: calculateTrend(weatherHistory, 'temperature'),
    humidity: calculateTrend(weatherHistory, 'humidity'),
    windSpeed: calculateTrend(weatherHistory, 'windSpeed'),
    rainfall: 0 // Placeholder since we don't have actual rainfall data
  };

  return { weatherData, weatherHistory, trends, loading, error };
}

// Helper function to calculate trend
function calculateTrend(data, field) {
  if (!data || data.length < 2) return 0;
  
  // Get the first (newest) and last (oldest) values in our history
  const newest = parseFloat(data[0][field]);
  const oldest = parseFloat(data[data.length - 1][field]);
  
  // Calculate the difference
  const difference = newest - oldest;
  
  // Return a simple trend indicator: 
  // 1 = upward trend, 0 = no change, -1 = downward trend
  if (Math.abs(difference) < 0.1) return 0; // Consider very small changes as no change
  return difference > 0 ? 1 : -1;
} 