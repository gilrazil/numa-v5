import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text, StyleSheet } from "react-native";

import { LoginScreen, SignupScreen, ForgotPasswordScreen, GoalScreen } from "../screens";

console.log("🟢 AuthStack.js loaded");

const Stack = createStackNavigator();

// Simple test component to isolate the issue
const TestScreen = () => {
  console.log("🟢 TestScreen rendering");
  return (
    <View style={styles.testContainer}>
      <Text style={styles.testText}>Test Screen Working!</Text>
    </View>
  );
};

// Even simpler fallback without any navigation
const SimpleFallback = () => {
  console.log("🟢 SimpleFallback rendering");
  return (
    <View style={styles.simpleFallback}>
      <Text style={styles.simpleFallbackText}>SIMPLE FALLBACK WORKING!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  testContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  testText: {
    fontSize: 20,
    color: '#333',
  },
  simpleFallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00ff00',
  },
  simpleFallbackText: {
    fontSize: 24,
    color: '#000000',
    fontWeight: 'bold',
  },
});

export const AuthStack = () => {
  console.log("🟢 AuthStack component rendering");
  console.log("🟢 AuthStack screens imported:", { LoginScreen, SignupScreen, ForgotPasswordScreen, GoalScreen });
  console.log("🟢 Stack object:", Stack);
  console.log("🟢 createStackNavigator function:", createStackNavigator);
  
  try {
    console.log("🟢 Creating Stack.Navigator");
    
    // For debugging, return simple component without Stack.Navigator
    if (false) { // Set to true to test without Stack.Navigator
      console.log("🟢 Returning SimpleFallback (no Stack.Navigator)");
      return <SimpleFallback />;
    }
    
    const navigator = (
      <Stack.Navigator
        initialRouteName="Goal"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Goal" component={GoalScreen} />
        <Stack.Screen name="Test" component={TestScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      </Stack.Navigator>
    );
    
    console.log("🟢 Stack.Navigator created successfully");
    return navigator;
    
  } catch (error) {
    console.log("🚨 Error in AuthStack render:", error);
    console.log("🚨 Error stack:", error.stack);
    console.log("🚨 Returning SimpleFallback due to error");
    return <SimpleFallback />;
  }
};
