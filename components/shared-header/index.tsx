import React from 'react';
import { usePathname } from 'expo-router';
import Animated, { useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SEARCH_BAR_HEIGHT, FILTERS_HEIGHT, HEADER_SPRING_CONFIG } from './constants';
import { HomeHeader } from './home-header';
import { ExploreHeader } from './explore-header';
import { ProfileHeader } from './profile-header';
import { SettingsHeader } from './settings-header';
import { StyleSheet } from 'react-native';

export const SharedHeader = () => {
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  const rContainerStyle = useAnimatedStyle(() => {
    const exploreHeaderHeight = insets.top + 18 + SEARCH_BAR_HEIGHT + FILTERS_HEIGHT;
    const standardHeaderHeight = insets.top + 50;

    return {
      height: withSpring(
        pathname.includes('/explore') ? exploreHeaderHeight : standardHeaderHeight,
        HEADER_SPRING_CONFIG
      ),
    };
  });

  return (
    <Animated.View
      style={[
        styles.container,
        { paddingTop: insets.top + 12 },
        rContainerStyle,
      ]}
    >
      {pathname === '/' && <HomeHeader />}
      {pathname.includes('/explore') && <ExploreHeader />}
      {pathname.includes('/profile') && <ProfileHeader />}
      {pathname.includes('/settings') && <SettingsHeader />}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: '#000',
  },
});
