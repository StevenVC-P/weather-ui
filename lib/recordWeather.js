import { db } from './firebase';  // Import directly from lib/firebase.js
import { logWeatherReading } from "./sendWeatherLog";

/**
 * Records current weather data to Firestore
 * @param {Object} weatherData - Object containing weather information
 * @param {number} weatherData.temperature - Temperature in degrees
 * @param {number} weatherData.humidity - Humidity percentage (0-100)
 * @param {number} weatherData.windSpeed - Wind speed
 * @param {string} [weatherData.location] - Optional location name
 * @param {string} [weatherData.conditions] - Optional weather conditions description
 * @param {Object} [weatherData.additionalData] - Any other weather data to include
 * @returns {Promise<string>} - The ID of the created document
 */
export async function recordWeather({
  temperature,
  humidity,
  windSpeed,
  location,
  conditions,
  ...additionalData
}) {
  try {
    // Validate required parameters
    if (temperature === undefined || humidity === undefined || windSpeed === undefined) {
      throw new Error("Temperature, humidity, and wind speed are required");
    }
    
    // Prepare additional data object
    const extraData = {};
    
    // Add optional fields if they exist
    if (location) extraData.location = location;
    if (conditions) extraData.conditions = conditions;
    
    // Log the weather reading
    const docId = await logWeatherReading(
      temperature,
      humidity,
      windSpeed,
      { ...extraData, ...additionalData }
    );
    
    console.log(`Weather recorded successfully at ${new Date().toLocaleString()}`);
    return docId;
  } catch (error) {
    console.error("Failed to record weather data:", error);
    throw error;
  }
}

/**
 * Example usage in a component or page
 */
export function WeatherRecordingExample() {
  const handleRecordWeather = async () => {
    try {
      // Example data - in a real app, this would come from sensors or API
      const weatherData = {
        temperature: 22.5,
        humidity: 65,
        windSpeed: 12.3,
        location: "Backyard",
        conditions: "Partly Cloudy",
        pressure: 1013, // This will be included in additionalData
        visibility: 10  // This will be included in additionalData
      };
      
      const docId = await recordWeather(weatherData);
      alert(`Weather recorded successfully! Document ID: ${docId}`);
    } catch (error) {
      alert(`Error recording weather: ${error.message}`);
    }
  };
  
  // This is just an example of how you might use this in a component
  return {
    handleRecordWeather
  };
} 