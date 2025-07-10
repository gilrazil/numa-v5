import React from "react";
import { View, StyleSheet, Button } from "react-native";
import { signOut } from "firebase/auth";

import { auth } from "../config";
import i18n from "../i18n";

export const HomeScreen = ({ navigation }) => {
  const handleLogout = () => {
    signOut(auth).catch((error) => console.log("Error logging out: ", error));
  };

  const handleGoToGoals = () => {
    navigation.navigate("Goal");
  };

  return (
    <View style={styles.container}>
      <Button title={i18n.t('goalTitle')} onPress={handleGoToGoals} />
      <View style={styles.spacing} />
      <Button title={i18n.t('signOut')} onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  spacing: {
    height: 20,
  },
});
