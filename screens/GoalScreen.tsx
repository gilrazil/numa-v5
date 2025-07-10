import React, { useState } from "react";
import { 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView, 
  Dimensions, 
  Platform,
  StatusBar 
} from "react-native";
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { View } from "../components";
import { Colors } from "../config";
import i18n from "../i18n";

const { width, height } = Dimensions.get('window');

interface GoalOption {
  key: string;
  label: string;
  icon: string;
  color: string;
  gradient: string[];
}

interface GoalScreenProps {
  navigation: any;
}

export const GoalScreen: React.FC<GoalScreenProps> = ({ navigation }) => {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);

  const goalOptions: GoalOption[] = [
    { 
      key: 'lose', 
      label: i18n.t('lose'), 
      icon: '↘️',
      color: '#FF3B30',
      gradient: ['#FF3B30', '#FF6B6B']
    },
    { 
      key: 'maintain', 
      label: i18n.t('maintain'), 
      icon: '—',
      color: '#007AFF',
      gradient: ['#007AFF', '#5AC8FA']
    },
    { 
      key: 'gain', 
      label: i18n.t('gain'), 
      icon: '↗️',
      color: '#34C759',
      gradient: ['#34C759', '#30D158']
    }
  ];

  const handleContinue = () => {
    if (selectedGoal) {
      // Navigate to Login screen with the selected goal
      navigation.navigate("Login", { goal: selectedGoal });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Background Gradient */}
      <LinearGradient
        colors={['#FAFAFA', '#F5F5F7', '#EBEBEF', '#E1E1E6']}
        locations={[0, 0.3, 0.7, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.backgroundGradient}
      />
      
      {/* Subtle Pattern Overlay */}
      <View isSafe={false} style={styles.patternOverlay}>
        <></>
      </View>
      
      <View isSafe={false} style={styles.content}>
        {/* Header */}
        <View isSafe={false} style={styles.header}>
          <Text style={styles.title}>{i18n.t('goalTitle')}</Text>
          <Text style={styles.subtitle}>{i18n.t('goalSubtitle')}</Text>
        </View>
        
        {/* Goal Options */}
        <View isSafe={false} style={styles.optionsContainer}>
          {goalOptions.map((option) => (
            <TouchableOpacity
              key={option.key}
              style={[
                styles.optionCard,
                selectedGoal === option.key && [
                  styles.selectedCard,
                  { shadowColor: option.color }
                ]
              ]}
              onPress={() => setSelectedGoal(option.key)}
              activeOpacity={0.7}
            >
              <BlurView
                intensity={selectedGoal === option.key ? 80 : 50}
                tint="light"
                style={styles.blurContainer}
              >
                <View isSafe={false} style={styles.cardContent}>
                  <View isSafe={false} style={[
                    styles.iconContainer,
                    { backgroundColor: option.color }
                  ]}>
                    <Text style={styles.iconText}>{option.icon}</Text>
                  </View>
                  <Text style={[
                    styles.optionText,
                    selectedGoal === option.key && { color: option.color, fontWeight: '700' }
                  ]}>
                    {option.label}
                  </Text>
                </View>
              </BlurView>
            </TouchableOpacity>
          ))}
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          style={[
            styles.continueButton,
            !selectedGoal && styles.disabledButton
          ]}
          onPress={handleContinue}
          disabled={!selectedGoal}
          activeOpacity={0.8}
        >
          <BlurView
            intensity={selectedGoal ? 80 : 50}
            tint="light"
            style={styles.buttonBlur}
          >
            <Text style={[
              styles.continueButtonText,
              !selectedGoal && styles.disabledButtonText
            ]}>
              {i18n.t('continue')}
            </Text>
          </BlurView>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  backgroundGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  patternOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    opacity: 0.8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 20 : 40,
    paddingBottom: 34,
  },
  header: {
    alignItems: 'center',
    marginBottom: 64,
    marginTop: 48,
  },
  title: {
    fontSize: 38,
    fontWeight: '800',
    color: '#1C1C1E',
    textAlign: 'center',
    marginBottom: 16,
    letterSpacing: -0.8,
    lineHeight: 44,
  },
  subtitle: {
    fontSize: 19,
    color: '#48484A',
    textAlign: 'center',
    lineHeight: 28,
    opacity: 0.9,
    paddingHorizontal: 32,
    fontWeight: '500',
  },
  optionsContainer: {
    flex: 1,
    justifyContent: 'center',
    marginTop: -60,
  },
  optionCard: {
    marginBottom: 18,
    borderRadius: 28,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.7)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  selectedCard: {
    borderColor: 'rgba(255, 255, 255, 0.9)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.16,
    shadowRadius: 24,
    elevation: 8,
    transform: [{ scale: 1.03 }],
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  blurContainer: {
    borderRadius: 28,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 26,
    paddingHorizontal: 28,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  iconText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  optionText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1C1C1E',
    flex: 1,
    letterSpacing: -0.2,
  },
  continueButton: {
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: 32,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 5,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  disabledButton: {
    borderColor: 'rgba(255, 255, 255, 0.4)',
    shadowOpacity: 0.04,
    shadowColor: '#000',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  buttonBlur: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
  },
  continueButtonText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#007AFF',
    textAlign: 'center',
    paddingVertical: 20,
    paddingHorizontal: 28,
    letterSpacing: -0.3,
  },
  disabledButtonText: {
    color: '#8E8E93',
  },
}); 