import { useCallback, useEffect, useRef } from "react";
import * as Updates from "expo-updates";
import { MANUAL_ERROR_CAPTURE } from "../utils/sentry";
import { Alert, AppState } from "react-native";
import { useAppStore } from "../store/app";

export const updateAlert = {
  title: "Update available",
  message:
    "We've added new animations or important updates that are ready for you to use! The app needs a quick refresh to load these updates (no download required).",
};

export const useOtaUpdate = () => {
  const isVersionChecked = useAppStore.use.isVersionChecked();
  const isNewVersionAvailable = useAppStore.use.isNewVersionAvailable();
  const setIsOtaUpdateAvailable = useAppStore.use.setIsOtaUpdateAvailable();

  const { isUpdateAvailable } = Updates.useUpdates();

  const appState = useRef(AppState.currentState);

  const handleUpdate = useCallback(async () => {
    if (isUpdateAvailable && isVersionChecked && !isNewVersionAvailable) {
      Updates.fetchUpdateAsync()
        .then(() =>
          Alert.alert(updateAlert.title, updateAlert.message, [
            {
              text: "Later",
              onPress: () => setIsOtaUpdateAvailable(true),
            },
            {
              text: "Refresh",
              isPreferred: true,
              onPress: () => Updates.reloadAsync(),
            },
          ])
        )
        .catch((error) => {
          MANUAL_ERROR_CAPTURE({
            title: "useOtaUpdate > Failed",
            error,
          });
        });
    }
  }, [isUpdateAvailable, setIsOtaUpdateAvailable, isNewVersionAvailable, isVersionChecked]);

  useEffect(() => {
    if (__DEV__) return;
    handleUpdate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdateAvailable, isVersionChecked, isNewVersionAvailable]);

  useEffect(() => {
    if (__DEV__) return;
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (appState.current.match(/inactive|background/) && nextAppState === "active") {
        setIsOtaUpdateAvailable(false);
        Updates.checkForUpdateAsync().then(() => handleUpdate());
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isUpdateAvailable };
};
