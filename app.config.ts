import { ExpoConfig } from "expo/config";

export default ({ config }: { config: ExpoConfig }) => ({
  ...config,
  expo: {
    name: "My Expo App",
    slug: "my-expo-app",
    version: "1.0.0",
    orientation: "portrait",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      ...config.ios,
      supportsTablet: false,
      bundleIdentifier: "com.myexpoapp",
    },
    android: {
      ...config.android,
      package: "com.myexpoapp",
    },
    plugins: [
      "expo-router",
    ],
    experiments: {
      typedRoutes: true,
    },
  },
});
