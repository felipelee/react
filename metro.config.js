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
  resolveRequest: (context, moduleName, platform) => {
    // Provide web-compatible stub for native-only modules
    if (platform === 'web' && moduleName === 'react-native-pager-view') {
      return {
        filePath: require.resolve('./web-stubs/react-native-pager-view.js'),
        type: 'sourceFile',
      };
    }
    
    // Use default resolver for everything else
    return context.resolveRequest(context, moduleName, platform);
  },
};

module.exports = withNativeWind(config, { input: "./global.css" });
