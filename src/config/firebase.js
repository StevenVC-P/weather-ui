// // Firebase configuration
// import { initializeApp, getApps } from 'firebase/app';
// import { getAuth } from 'firebase/auth';

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDYrcJmNxJCuYXJL9v_2xBKFmZ8gGRhxbw",
//   authDomain: "weather-station-ui-9c436.firebaseapp.com",
//   projectId: "weather-station-ui-9c436",
//   storageBucket: "weather-station-ui-9c436.appspot.com",
//   messagingSenderId: "1098040621778",
//   appId: "1:1098040621778:web:9a7a2e4bc94ce1c4b87c60"
// };

// // Initialize Firebase only if it hasn't been initialized already
// // This prevents multiple initializations during development
// let firebaseApp;
// if (!getApps().length) {
//   firebaseApp = initializeApp(firebaseConfig);
// } else {
//   firebaseApp = getApps()[0];
// }

// // Initialize Firebase Authentication
// const auth = getAuth(firebaseApp);

// export { auth };
// export default firebaseApp;

// Re-export Firebase configuration from the lib file
import firebaseApp, { auth, db, analytics } from "../../lib/firebase";

export { auth, db, analytics };
export default firebaseApp;
