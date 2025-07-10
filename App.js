import React from "react";
import { View, Text, StyleSheet, AppState } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ErrorBoundary } from "react-error-boundary";

import { RootNavigator } from "./navigation/RootNavigator";
import { AuthenticatedUserProvider } from "./providers";

// Enhanced crash detection and logging
console.log("🔧 Setting up enhanced crash detection...");

// Track app state changes
AppState.addEventListener('change', (nextAppState) => {
  console.log('🔧 App state changed to:', nextAppState);
});

// Global error handler for unhandled JavaScript errors
const originalHandler = global.ErrorUtils.getGlobalHandler();
global.ErrorUtils.setGlobalHandler((error, isFatal) => {
  console.log("🚨 GLOBAL ERROR CAUGHT:", error);
  console.log("🚨 IS FATAL:", isFatal);
  console.log("🚨 ERROR NAME:", error.name);
  console.log("🚨 ERROR MESSAGE:", error.message);
  console.log("🚨 ERROR STACK:", error.stack);
  console.log("🚨 ERROR PROPS:", Object.keys(error));
  
  // Additional debugging info
  console.log("🚨 ERROR TIMESTAMP:", new Date().toISOString());
  console.log("🚨 MEMORY INFO:", global.performance?.memory || "Not available");
  
  // Call original handler to maintain normal behavior
  originalHandler(error, isFatal);
});

// Handle unhandled promise rejections
global.addEventListener?.('unhandledrejection', (event) => {
  console.log("🚨 UNHANDLED PROMISE REJECTION:", event.reason);
  console.log("🚨 Promise:", event.promise);
  console.log("🚨 Rejection timestamp:", new Date().toISOString());
});

// Enhanced console error logging
const originalConsoleError = console.error;
console.error = (...args) => {
  console.log("🚨 CONSOLE ERROR DETECTED:", ...args);
  console.log("🚨 Console error timestamp:", new Date().toISOString());
  console.log("🚨 Error stack trace:", new Error().stack);
  originalConsoleError(...args);
};

// Log React Native and platform info
console.log("🔧 Platform info:", {
  Platform: require('react-native').Platform.OS,
  Version: require('react-native').Platform.Version,
  Constants: require('expo-constants').default?.platform,
});

// Super simple test component
const SuperSimpleTest = () => {
  console.log("🟢 SuperSimpleTest rendering");
  try {
    return (
      <View style={styles.superSimple}>
        <Text style={styles.superSimpleText}>SUPER SIMPLE TEST WORKING!</Text>
        <Text style={styles.debugInfo}>Check console for debug info</Text>
      </View>
    );
  } catch (error) {
    console.log("🚨 Error in SuperSimpleTest:", error);
    return (
      <View style={styles.error}>
        <Text style={styles.errorText}>SuperSimpleTest Error: {error.message}</Text>
      </View>
    );
  }
};

// Enhanced error boundary fallback with more debugging info
function ErrorFallback({ error, resetErrorBoundary }) {
  console.log("🔥 ERROR BOUNDARY TRIGGERED");
  console.log("🔥 Error:", error);
  console.log("🔥 Error name:", error.name);
  console.log("🔥 Error message:", error.message);
  console.log("🔥 Error stack:", error.stack);
  console.log("🔥 Error timestamp:", new Date().toISOString());
  
  return (
    <View style={styles.center}>
      <Text style={styles.crashTitle}>🔥 App Crashed</Text>
      <Text style={styles.errorMessage}>Error: {error.name}</Text>
      <Text style={styles.errorMessage}>{error.message}</Text>
      <Text style={styles.stackTrace}>Check console for full details</Text>
    </View>
  );
}

const App = () => {
  console.log("🟢 App component starting to render");
  console.log("🟢 React version:", React.version);
  console.log("🟢 Current timestamp:", new Date().toISOString());
  
  try {
    console.log("🟢 App component render method called");
    
    // For ultimate debugging, render super simple component
    if (false) { // Set to true to test without any providers or navigation
      console.log("🟢 Rendering SuperSimpleTest (ultimate debug mode)");
      return <SuperSimpleTest />;
    }
    
    return (
      <ErrorBoundary 
        FallbackComponent={ErrorFallback}
        onError={(error, errorInfo) => {
          console.log("🔥 ErrorBoundary onError called");
          console.log("🔥 Error:", error);
          console.log("🔥 Error Info:", errorInfo);
          console.log("🔥 Component stack:", errorInfo.componentStack);
        }}
      >
        <AuthenticatedUserProvider>
          <SafeAreaProvider>
            <RootNavigator />
          </SafeAreaProvider>
        </AuthenticatedUserProvider>
      </ErrorBoundary>
    );
  } catch (error) {
    console.log("🚨 SYNCHRONOUS ERROR IN APP RENDER:", error);
    console.log("🚨 SYNCHRONOUS ERROR NAME:", error.name);
    console.log("🚨 SYNCHRONOUS ERROR MESSAGE:", error.message);
    console.log("🚨 SYNCHRONOUS ERROR STACK:", error.stack);
    
    // Fallback UI for synchronous errors
    return (
      <View style={styles.center}>
        <Text style={styles.crashTitle}>🚨 Synchronous Error</Text>
        <Text style={styles.errorMessage}>{error.name}: {error.message}</Text>
        <Text style={styles.stackTrace}>Check console for details</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  crashTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#d32f2f',
  },
  errorMessage: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginBottom: 10,
  },
  stackTrace: {
    fontSize: 10,
    textAlign: 'center',
    color: '#999',
  },
  superSimple: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0000ff',
  },
  superSimpleText: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  debugInfo: {
    fontSize: 16,
    color: '#cccccc',
    textAlign: 'center',
  },
  error: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff0000',
  },
  errorText: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
    padding: 20,
  },
});

console.log("🟢 App.js loaded successfully");

export default App;
