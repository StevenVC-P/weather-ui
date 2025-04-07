import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function sendWeatherLog(data) {
  try {
    // Add timestamp if not provided
    if (!data.timestamp) {
      data.timestamp = new Date().toISOString();
    }
    
    // Add to Firestore
    const docRef = await addDoc(collection(db, "weather"), data);
    console.log("Weather log added with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding weather log: ", error);
    throw error;
  }
} 