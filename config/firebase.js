import { initializeApp, getApps } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

// add firebase config
const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.apiKey,
  authDomain: Constants.expoConfig?.extra?.authDomain,
  projectId: Constants.expoConfig?.extra?.projectId,
  storageBucket: Constants.expoConfig?.extra?.storageBucket,
  messagingSenderId: Constants.expoConfig?.extra?.messagingSenderId,
  appId: Constants.expoConfig?.extra?.appId,
};

// Debug: Log config to ensure it's loaded correctly
console.log('Firebase Config:', firebaseConfig);

// Check if all required values are present
if (!firebaseConfig.apiKey || !firebaseConfig.authDomain || !firebaseConfig.projectId) {
  console.error('Firebase configuration is incomplete. Please check your .env file.');
  console.error('Missing values:', {
    apiKey: !firebaseConfig.apiKey ? 'MISSING' : 'OK',
    authDomain: !firebaseConfig.authDomain ? 'MISSING' : 'OK',
    projectId: !firebaseConfig.projectId ? 'MISSING' : 'OK',
    storageBucket: !firebaseConfig.storageBucket ? 'MISSING' : 'OK',
    messagingSenderId: !firebaseConfig.messagingSenderId ? 'MISSING' : 'OK',
    appId: !firebaseConfig.appId ? 'MISSING' : 'OK',
  });
}

// Initialize Firebase App (avoid multiple initializations)
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

// Initialize Auth with proper persistence for the platform
let auth;
try {
  // For Expo Go and development builds, use getAuth
  if (Platform.OS === 'web' || __DEV__) {
    auth = getAuth(app);
  } else {
    // For native production builds, use initializeAuth with persistence
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  }
} catch (error) {
  // If initializeAuth fails, fallback to getAuth
  console.log('Auth initialization method failed, falling back to getAuth:', error.message);
  auth = getAuth(app);
}

export { auth };
