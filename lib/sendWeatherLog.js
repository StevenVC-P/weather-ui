import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase"; // Make sure this import exists or adjust as needed

/**
 * Logs a weather reading to Firestore
 * @param {number} temperature - Temperature in degrees (Celsius or Fahrenheit)
 * @param {number} humidity - Humidity percentage (0-100)
 * @param {number} windSpeed - Wind speed (in mph or km/h)
 * @param {Object} additionalData - Any additional weather data to log
 * @returns {Promise<string>} - The ID of the newly created document
 */
export async function sendWeatherLog({ temperature, humidity, windSpeed }) {
  try {
    const docRef = await addDoc(collection(db, "weather_logs"), {
      temperature,
      humidity,
      windSpeed,
      timestamp: serverTimestamp(),
    });

    console.log("Weather reading logged with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error logging weather reading:", error);
    throw error;
  }
}
