import { initializeApp, getApps } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

console.log("🔧 Firebase initializing...");

console.log("🟢 Firebase config loading...");
console.log("🟢 Platform:", Platform.OS);
console.log("🟢 __DEV__:", __DEV__);
console.log("🟢 Constants.expoConfig:", Constants.expoConfig);

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
console.log('🟢 Firebase Config loaded:', firebaseConfig);

// Check if all required values are present
if (!firebaseConfig.apiKey || !firebaseConfig.authDomain || !firebaseConfig.projectId) {
  console.error('🚨 Firebase configuration is incomplete. Please check your .env file.');
  console.error('🚨 Missing values:', {
    apiKey: !firebaseConfig.apiKey ? 'MISSING' : 'OK',
    authDomain: !firebaseConfig.authDomain ? 'MISSING' : 'OK',
    projectId: !firebaseConfig.projectId ? 'MISSING' : 'OK',
    storageBucket: !firebaseConfig.storageBucket ? 'MISSING' : 'OK',
    messagingSenderId: !firebaseConfig.messagingSenderId ? 'MISSING' : 'OK',
    appId: !firebaseConfig.appId ? 'MISSING' : 'OK',
  });
} else {
  console.log('✅ Firebase configuration is complete');
}

// Initialize Firebase App (avoid multiple initializations)
let app;
console.log("🔧 Initializing Firebase App...");
console.log("🟢 Existing apps:", getApps().length);

try {
  if (getApps().length === 0) {
    console.log("🔧 Creating new Firebase app...");
    app = initializeApp(firebaseConfig);
    console.log("✅ Firebase app created successfully");
  } else {
    console.log("🔧 Using existing Firebase app");
    app = getApps()[0];
    console.log("✅ Existing Firebase app loaded");
  }
} catch (error) {
  console.log("🚨 Error initializing Firebase app:", error);
  throw error;
}

// Initialize Auth with proper persistence for the platform
let auth;
console.log("🔧 Initializing Firebase Auth...");

try {
  // For Expo Go and development builds, use getAuth
  if (Platform.OS === 'web' || __DEV__) {
    console.log("🔧 Using getAuth for web/dev environment");
    auth = getAuth(app);
    console.log("✅ Firebase auth initialized with getAuth");
  } else {
    console.log("🔧 Using initializeAuth for native production");
    // For native production builds, use initializeAuth with persistence
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
    console.log("✅ Firebase auth initialized with persistence");
  }
} catch (error) {
  // If initializeAuth fails, fallback to getAuth
  console.log('🚨 Auth initialization method failed, falling back to getAuth:', error.message);
  console.log('🚨 Full error:', error);
  
  try {
    console.log("🔧 Attempting Firebase auth fallback...");
    auth = getAuth(app);
    console.log("✅ Firebase auth fallback successful");
  } catch (fallbackError) {
    console.log("🚨 Firebase auth fallback failed:", fallbackError);
    throw fallbackError;
  }
}

console.log("✅ Firebase initialized successfully");

export { auth };
