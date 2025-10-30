const { withNativeWind } = require("nativewind/metro");
const { getSentryExpoConfig } = require("@sentry/react-native/metro");

// eslint-disable-next-line no-undef
const config = getSentryExpoConfig(__dirname);

config.resolver = {
  ...config.resolver,
  assetExts: [
    ...(config.resolver?.assetExts || []),
    'png',
    'jpg',
    'jpeg',
    'gif',
    'webp',
    'svg',
  ],
};

module.exports = withNativeWind(config, { input: "./global.css" });
