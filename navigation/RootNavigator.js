import React, { useState, useContext, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { View, Text, StyleSheet } from "react-native";

import { AuthStack } from "./AuthStack";
import { AppStack } from "./AppStack";
import { AuthenticatedUserContext } from "../providers";
import { LoadingIndicator } from "../components";
import { SplashScreen } from "../screens";
import { auth } from "../config";

console.log("🟢 RootNavigator.js loaded");

// Simple fallback component to test if navigation is the issue
const FallbackScreen = () => {
  console.log("🟢 FallbackScreen rendering");
  return (
    <View style={styles.fallback}>
      <Text style={styles.fallbackText}>FALLBACK SCREEN WORKING!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff0000',
  },
  fallbackText: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export const RootNavigator = () => {
  console.log("🟢 RootNavigator component rendering");
  
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [showSplash, setShowSplash] = useState(true);

  console.log("🟢 RootNavigator state - user:", user, "isLoading:", isLoading, "showSplash:", showSplash);

  useEffect(() => {
    console.log("🟢 RootNavigator useEffect - Setting up auth listener");
    
    try {
      // onAuthStateChanged returns an unsubscriber
      const unsubscribeAuthStateChanged = onAuthStateChanged(
        auth,
        (authenticatedUser) => {
          console.log("🟢 Auth state changed - user:", authenticatedUser);
          authenticatedUser ? setUser(authenticatedUser) : setUser(null);
          setIsLoading(false);
        }
      );

      console.log("🟢 Auth listener set up successfully");
      
      // unsubscribe auth listener on unmount
      return unsubscribeAuthStateChanged;
    } catch (error) {
      console.log("🚨 Error setting up auth listener:", error);
      setIsLoading(false);
    }
  }, [user]);

  const handleSplashFinish = () => {
    console.log("🟢 Splash screen finished");
    setShowSplash(false);
  };

  if (showSplash) {
    console.log("🟢 Showing splash screen");
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  if (isLoading) {
    console.log("🟢 Showing loading indicator");
    return <LoadingIndicator />;
  }

  console.log("🟢 Rendering navigation with user:", user ? "authenticated" : "not authenticated");
  
  try {
    console.log("🟢 About to render NavigationContainer");
    
    // For debugging, try without NavigationContainer first
    if (false) { // Set to true to test without navigation
      console.log("🟢 Rendering without NavigationContainer (debug mode)");
      return <FallbackScreen />;
    }
    
    return (
      <NavigationContainer
        onReady={() => console.log("🟢 NavigationContainer is ready")}
        onStateChange={(state) => console.log("🟢 Navigation state changed:", state)}
        fallback={<FallbackScreen />}
      >
        {user ? (
          (() => {
            console.log("🟢 Rendering AppStack");
            return <AppStack />;
          })()
        ) : (
          (() => {
            console.log("🟢 Rendering AuthStack");
            return <AuthStack />;
          })()
        )}
      </NavigationContainer>
    );
  } catch (error) {
    console.log("🚨 Error rendering NavigationContainer:", error);
    console.log("🚨 Rendering fallback screen");
    return <FallbackScreen />;
  }
};
