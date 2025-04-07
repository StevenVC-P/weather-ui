// Script to query weather data from Firestore
const { initializeApp } = require("firebase/app");
const { getFirestore, collection, getDocs, query, orderBy, limit } = require("firebase/firestore");

// Your Firebase configuration from lib/firebase.js
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to get the latest weather data
async function getLatestWeatherData(count = 5) {
  try {
    // Get all documents from the weather collection
    const weatherCollection = collection(db, "weather");
    const weatherSnapshot = await getDocs(weatherCollection);

    // Array to store results
    const results = [];

    // Process each weather document
    weatherSnapshot.docs.forEach((doc) => {
      results.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    // Sort by timestamp (newest first) and limit to requested count
    results.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    return results.slice(0, count);
  } catch (error) {
    console.error("Error getting weather data:", error);
    return [];
  }
}

// Function to display weather data
async function displayWeatherData() {
  const weatherData = await getLatestWeatherData(10);

  console.log("Latest Weather Data:");
  console.log("===================");

  weatherData.forEach((data, index) => {
    console.log(`Record #${index + 1} (${data.id}):`);
    console.log(`  Timestamp: ${data.timestamp}`);
    console.log(`  Temperature: ${data.temperature}°C`);
    console.log(`  Humidity: ${data.humidity}%`);
    console.log(`  Wind Speed: ${data.windSpeed} km/h`);
    console.log("-------------------");
  });
}

// Display the latest weather data
displayWeatherData();
