import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { LoginScreen, SignupScreen, ForgotPasswordScreen, GoalScreen } from "../screens";

const Stack = createStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="Goal"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Goal" component={GoalScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
};
