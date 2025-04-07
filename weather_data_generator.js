// Firebase setup and weather data generator
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, doc, setDoc } = require('firebase/firestore');

// Your Firebase configuration from lib/firebase.js
const firebaseConfig = {
  apiKey: "AIzaSyA-n3kBl1nYYFdYhaRA0uQqJUqHyKj16lY",
  authDomain: "homestead-weather.firebaseapp.com",
  projectId: "homestead-weather",
  storageBucket: "homestead-weather.appspot.com",
  messagingSenderId: "127735884048",
  appId: "1:127735884048:web:e15f391c81385e3b875d95",
  measurementId: "G-MSS6T0BW9X",
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