// Firebase setup and weather data generator
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc, setDoc } = require('firebase/firestore');

// Your Firebase configuration from lib/firebase.js
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Function to generate random weather data
function generateWeatherData() {
  return {
    temperature: Math.floor(Math.random() * 35) + 5, // 5 to 40 degrees Celsius
    humidity: Math.floor(Math.random() * 70) + 30, // 30% to 100%
    windSpeed: Math.floor(Math.random() * 30), // 0 to 30 km/h
    timestamp: new Date().toISOString()
  };
}

// Function to insert a single weather record
async function insertWeatherRecord() {
  const timestamp = Date.now().toString();
  const weatherData = generateWeatherData();
  
  try {
    // Create a reference to the weather collection
    const weatherCollection = collection(db, 'weather');
    
    // Create a document with the timestamp as ID
    const weatherDoc = doc(weatherCollection, timestamp);
    
    // Set the data directly in the document
    await setDoc(weatherDoc, weatherData);
    console.log(`Weather data inserted at weather/${timestamp}:`, weatherData);
  } catch (error) {
    console.error("Error inserting weather data:", error);
  }
}

// Function to simulate weather updates at regular intervals
function simulateWeatherUpdates(intervalMinutes = 1) {
  console.log(`Starting weather simulation with updates every ${intervalMinutes} minute(s)...`);
  
  // Insert one record immediately
  insertWeatherRecord();
  
  // Then insert records at the specified interval
  setInterval(insertWeatherRecord, intervalMinutes * 60 * 1000);
}

// Start the simulation with updates every 5 minutes
simulateWeatherUpdates(5); 