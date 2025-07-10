import React, { useState } from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { View, Button } from "../components";
import { Colors } from "../config";
import i18n from "../i18n";

export const GoalScreen = ({ navigation }) => {
  const [selectedGoal, setSelectedGoal] = useState(null);

  const goalOptions = [
    { key: 'lose', label: i18n.t('lose') },
    { key: 'maintain', label: i18n.t('maintain') },
    { key: 'gain', label: i18n.t('gain') }
  ];

  const handleContinue = () => {
    if (selectedGoal) {
      // Navigate to next screen or save goal
      console.log('Selected goal:', selectedGoal);
      navigation.navigate("Home");
    }
  };

  return (
    <View isSafe style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{i18n.t('goalTitle')}</Text>
        <Text style={styles.subtitle}>{i18n.t('goalSubtitle')}</Text>
        
        <View style={styles.optionsContainer}>
          {goalOptions.map((option) => (
            <TouchableOpacity
              key={option.key}
              style={[
                styles.optionButton,
                selectedGoal === option.key && styles.selectedOption
              ]}
              onPress={() => setSelectedGoal(option.key)}
            >
              <Text style={[
                styles.optionText,
                selectedGoal === option.key && styles.selectedOptionText
              ]}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Button 
          style={[
            styles.continueButton,
            !selectedGoal && styles.disabledButton
          ]}
          onPress={handleContinue}
          disabled={!selectedGoal}
        >
          <Text style={styles.continueButtonText}>{i18n.t('continue')}</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.black,
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.black,
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  optionsContainer: {
    width: '100%',
    marginBottom: 40,
  },
  optionButton: {
    borderWidth: 2,
    borderColor: Colors.orange,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 12,
    alignItems: 'center',
  },
  selectedOption: {
    backgroundColor: Colors.orange,
  },
  optionText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.orange,
  },
  selectedOptionText: {
    color: Colors.white,
  },
  continueButton: {
    width: '100%',
    backgroundColor: Colors.orange,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.white,
  },
}); 