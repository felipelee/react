import { AddButton } from "@/src/apps/(u-z)/x/components/add-button";
import { XTabsContext } from "@/src/apps/(u-z)/x/lib/providers/x-tabs-provider";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Foundation from "@expo/vector-icons/Foundation";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Octicons from "@expo/vector-icons/Octicons";
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import React, { FC, PropsWithChildren, useContext, useEffect, useRef } from "react";
import { Platform, Animated as RNAnimated, StyleSheet, View } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

// x-bottom-tabs-background-animation 🔽

const _duration = 200;

enum Tab {
  Home = "home",
  Search = "search",
  Grok = "grok",
  Community = "community",
  Notifications = "notifications",
  Messages = "messages",
}

export type RouteParams = {
  isBottomBlurVisible?: "true" | "false";
};

type AnimatedIconWrapperProps = {
  scale: SharedValue<number>;
};

const AnimatedIconWrapper: FC<PropsWithChildren<AnimatedIconWrapperProps>> = ({
  children,
  scale,
}) => {
  return (
    <Animated.View
      onTouchStart={() => {
        scale.value = withTiming(0.8);
      }}
      onTouchEnd={() => {
        scale.value = withTiming(1);
      }}
      style={{ transform: [{ scale }] }}
    >
      {children}
    </Animated.View>
  );
};

const TabsLayout = () => {
  const {
    tabBarHeight,
    tabBarPaddingBottom,
    isBottomBlurVisible,
    setIsBottomBlurVisible,
    setIsAddButtonVisible,
  } = useContext(XTabsContext);

  const homeIconScale = useSharedValue(1);
  const searchIconScale = useSharedValue(1);
  const grokIconScale = useSharedValue(1);
  const communityIconScale = useSharedValue(1);
  const notificationsIconScale = useSharedValue(1);
  const messagesIconScale = useSharedValue(1);

  const tabBarOpacity = useRef(new RNAnimated.Value(0)).current;

  useEffect(() => {
    RNAnimated.timing(tabBarOpacity, {
      toValue: isBottomBlurVisible ? 1 : 0.25,
      duration: _duration,
      useNativeDriver: true,
    }).start();
  }, [isBottomBlurVisible]);

  const rBlurContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isBottomBlurVisible ? 1 : 0, { duration: _duration }),
    };
  });

  const rFabStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isBottomBlurVisible ? 1 : 0.25, { duration: _duration }),
    };
  });

  return (
    <>
      <Tabs
        initialRouteName={Tab.Home}
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#D9D9D9",
          tabBarInactiveTintColor: "#D9D9D9",
          tabBarStyle: {
            position: "absolute",
            left: 0,
            bottom: 0,
            elevation: 0,
            overflow: "hidden",
            height: tabBarHeight,
            paddingTop: 8,
            paddingBottom: tabBarPaddingBottom,
            borderTopWidth: 0.5,
            borderColor: "rgba(255, 255, 255, 0.1)",
            opacity: tabBarOpacity,
          },
          tabBarBackground: () => (
            <Animated.View style={[StyleSheet.absoluteFillObject, rBlurContainerStyle]}>
              {Platform.OS === "ios" ? (
                <BlurView intensity={50} tint="dark" style={StyleSheet.absoluteFillObject} />
              ) : (
                <View className="absolute inset-0 bg-neutral-950/95" />
              )}
            </Animated.View>
          ),
        }}
        screenListeners={{
          tabPress: () => {
            setTimeout(() => {
              setIsBottomBlurVisible(true);
            }, 50);
          },
          focus: (e) => {
            if (e.target?.includes(Tab.Grok)) {
              setIsAddButtonVisible(false);
            } else {
              setIsAddButtonVisible(true);
            }
          },
        }}
      >
        <Tabs.Screen
          name={Tab.Home}
          options={{
            tabBarIcon: ({ color, focused }) => {
              return (
                <AnimatedIconWrapper scale={homeIconScale}>
                  {focused ? (
                    <Foundation name="home" size={22} color={color} />
                  ) : (
                    <Octicons name="home" size={20} color={color} />
                  )}
                </AnimatedIconWrapper>
              );
            },
          }}
        />
        <Tabs.Screen
          name={Tab.Search}
          options={{
            tabBarIcon: ({ color }) => (
              <AnimatedIconWrapper scale={searchIconScale}>
                <Feather name="search" size={22} color={color} />
              </AnimatedIconWrapper>
            ),
          }}
        />
        <Tabs.Screen
          name={Tab.Grok}
          options={{
            tabBarIcon: ({ color }) => (
              <AnimatedIconWrapper scale={grokIconScale}>
                <AntDesign name="minus-square" size={20} color={color} />
              </AnimatedIconWrapper>
            ),
          }}
        />
        <Tabs.Screen
          name={Tab.Community}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <AnimatedIconWrapper scale={communityIconScale}>
                <MaterialCommunityIcons
                  name={focused ? "account-multiple" : "account-multiple-outline"}
                  size={24}
                  color={color}
                />
              </AnimatedIconWrapper>
            ),
          }}
        />
        <Tabs.Screen
          name={Tab.Notifications}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <AnimatedIconWrapper scale={notificationsIconScale}>
                <Octicons name={focused ? "bell-fill" : "bell"} size={20} color={color} />
              </AnimatedIconWrapper>
            ),
          }}
        />
        <Tabs.Screen
          name={Tab.Messages}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <AnimatedIconWrapper scale={messagesIconScale}>
                <Ionicons name={focused ? "mail" : "mail-outline"} size={22} color={color} />
              </AnimatedIconWrapper>
            ),
          }}
        />
      </Tabs>
      {/* x-floating-action-button-animation 🔽 */}
      <Animated.View
        className="absolute right-4"
        style={[rFabStyle, { bottom: tabBarHeight + 12 }]}
      >
        <AddButton />
      </Animated.View>
      {/* x-floating-action-button-animation 🔼 */}
    </>
  );
};

export default TabsLayout;

// x-bottom-tabs-background-animation 🔼
