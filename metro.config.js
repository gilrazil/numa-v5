// Learn more at https://docs.expo.dev/guides/using-firebase/#configure-metro
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Enable more detailed logging for debugging
config.resolver.platforms = ['ios', 'android', 'native', 'web'];
config.transformer.minifierConfig = {
  // Keep function names for better error tracking
  keep_fnames: true,
  mangle: {
    keep_fnames: true,
  },
};

// Add debugging for module resolution
config.resolver.resolverMainFields = ['react-native', 'browser', 'main'];
config.resolver.sourceExts = [...config.resolver.sourceExts, 'jsx', 'js', 'ts', 'tsx'];

module.exports = config;
