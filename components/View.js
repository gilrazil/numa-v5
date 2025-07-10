import React from 'react';
import { View as RNView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

console.log("🟢 View.js loaded");

export const View = ({ isSafe, style, children }) => {
  console.log("🟢 View component rendering with isSafe:", isSafe);
  
  const insets = useSafeAreaInsets();

  if (isSafe) {
    console.log("🟢 View rendering with safe area insets:", insets);
    return (
      <RNView style={{ paddingTop: insets.top, ...style }}>{children}</RNView>
    );
  }

  console.log("🟢 View rendering without safe area");
  return <RNView style={StyleSheet.flatten(style)}>{children}</RNView>;
};
