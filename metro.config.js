const { getDefaultConfig } = require("expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

// Note: We're using @storybook/react-native-web-vite, not @storybook/react-native
// So we don't need the withStorybook wrapper

module.exports = defaultConfig;
