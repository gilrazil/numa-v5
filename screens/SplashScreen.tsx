import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  StatusBar,
  Platform,
  Dimensions,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.3)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const taglineTranslateY = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    // Start animations
    const logoAnimation = Animated.parallel([
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(logoScale, {
        toValue: 1,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]);

    const taglineAnimation = Animated.parallel([
      Animated.timing(taglineOpacity, {
        toValue: 1,
        duration: 800,
        delay: 500,
        useNativeDriver: true,
      }),
      Animated.timing(taglineTranslateY, {
        toValue: 0,
        duration: 800,
        delay: 500,
        useNativeDriver: true,
      }),
    ]);

    // Run animations
    logoAnimation.start();
    taglineAnimation.start();

    // Auto-transition after 3 seconds
    const timer = setTimeout(() => {
      onFinish();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#8B5CF6" />
      
      {/* Background Gradient */}
      <LinearGradient
        colors={['#8B5CF6', '#7C3AED', '#6D28D9']}
        locations={[0, 0.6, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.backgroundGradient}
      />

      <SafeAreaView style={styles.content}>
        {/* Logo Container */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: logoOpacity,
              transform: [{ scale: logoScale }],
            },
          ]}
        >
          {/* Logo Icon */}
          <View style={styles.logoIcon}>
            <View style={styles.logoCircle}>
              <View style={styles.personIcon}>
                <View style={styles.head} />
                <View style={styles.body} />
                <View style={styles.leftArm} />
                <View style={styles.rightArm} />
                <View style={styles.leftLeg} />
                <View style={styles.rightLeg} />
              </View>
            </View>
          </View>

          {/* Logo Text */}
          <Text style={styles.logoText}>NUMA</Text>
        </Animated.View>

        {/* Tagline */}
        <Animated.View
          style={[
            styles.taglineContainer,
            {
              opacity: taglineOpacity,
              transform: [{ translateY: taglineTranslateY }],
            },
          ]}
        >
          <Text style={styles.tagline}>Understand what you eat — easily</Text>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8B5CF6',
  },
  backgroundGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logoIcon: {
    width: 120,
    height: 120,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  logoCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  personIcon: {
    width: 40,
    height: 40,
    position: 'relative',
  },
  head: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    top: 2,
    left: 16,
  },
  body: {
    width: 3,
    height: 14,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    top: 12,
    left: 18.5,
  },
  leftArm: {
    width: 8,
    height: 2,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    top: 16,
    left: 10,
    transform: [{ rotate: '-30deg' }],
  },
  rightArm: {
    width: 8,
    height: 2,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    top: 16,
    right: 10,
    transform: [{ rotate: '30deg' }],
  },
  leftLeg: {
    width: 2,
    height: 8,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    bottom: 2,
    left: 16,
    transform: [{ rotate: '-15deg' }],
  },
  rightLeg: {
    width: 2,
    height: 8,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    bottom: 2,
    right: 16,
    transform: [{ rotate: '15deg' }],
  },
  logoText: {
    fontSize: 36,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 2,
    textAlign: 'center',
  },
  taglineContainer: {
    alignItems: 'center',
  },
  tagline: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
}); 