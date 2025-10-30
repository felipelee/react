import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Menu, SearchIcon, User } from "lucide-react-native";
import React, { FC } from "react";
import { View, StyleSheet } from "react-native";
import { withSpring } from "react-native-reanimated";
import { useMenu } from "@/src/apps/(s-t)/shopify/lib/providers/menu-provider";
import House from "@/src/apps/(s-t)/shopify/components/icons/house-icon";
import Inbox from "@/src/apps/(s-t)/shopify/components/icons/inbox-icon";
import Tag from "@/src/apps/(s-t)/shopify/components/icons/tag-icon";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MENU_TRANSITION_SPRING_CONFIG } from "@/src/apps/(s-t)/shopify/lib/constants/animation-configs";
import { TabButton } from "./tab-button";
import { useRouter } from "expo-router";

// shopify-custom-bottom-tab-bar-animation 🔽

export enum Tab {
  Search = "search",
  Home = "home",
  Orders = "orders",
  Products = "products",
  Menu = "menu", // Special case: triggers menu overlay instead of navigation
  Profile = "profile",
}

export const CustomTabBar: FC<BottomTabBarProps> = ({ state, navigation }) => {
  const router = useRouter();

  const insets = useSafeAreaInsets();

  const { menuProgress } = useMenu();

  const isTabFocused = (routeName: string) => {
    const index = state.routes.findIndex((route) => route.name === routeName);
    return state.index === index;
  };

  return (
    <View
      className="absolute flex-row items-center justify-between px-5 gap-2 shadow-[0_0px_20px_10px_rgba(218,218,218,0.8)]"
      style={{ bottom: insets.bottom + 12 }}
    >
      {/* Edge buttons are isolated for stronger shadow falloff and better touch separation */}
      <View className="p-1 rounded-full bg-white" style={[styles.buttonBorder, styles.shadow]}>
        <TabButton
          focused={isTabFocused(Tab.Search)}
          onPress={() => {
            navigation.navigate(Tab.Search);
            router.setParams({
              lastRoute: state.routes[state.index].name,
            });
          }}
        >
          <SearchIcon size={22} color={isTabFocused(Tab.Search) ? "#000000" : "#8a8a8a"} />
        </TabButton>
      </View>

      {/* Center cluster mirrors Shopify's floating pill: group animates per-button, not as a single shared container */}
      <View
        className="flex-1 flex-row items-center justify-around py-1 bg-white rounded-full"
        style={[styles.buttonBorder, styles.shadow]}
      >
        <TabButton focused={isTabFocused(Tab.Home)} onPress={() => navigation.navigate(Tab.Home)}>
          <House
            size={22}
            color={isTabFocused(Tab.Home) ? "#000000" : "#8a8a8a"}
            fill={isTabFocused(Tab.Home)}
          />
        </TabButton>

        <TabButton
          focused={isTabFocused(Tab.Orders)}
          onPress={() => navigation.navigate(Tab.Orders)}
        >
          <Inbox
            size={22}
            color={isTabFocused(Tab.Orders) ? "#000000" : "#8a8a8a"}
            fill={isTabFocused(Tab.Orders)}
          />
        </TabButton>

        <TabButton
          focused={isTabFocused(Tab.Products)}
          onPress={() => navigation.navigate(Tab.Products)}
        >
          <Tag
            size={22}
            color={isTabFocused(Tab.Products) ? "#000000" : "#8a8a8a"}
            fill={isTabFocused(Tab.Products)}
          />
        </TabButton>

        <TabButton
          focused={isTabFocused(Tab.Menu)}
          // Menu is a special action: advances overlay progress instead of navigation
          // withSpring config matches overlay sheet physics for continuity with the rest of the app
          onPress={() => menuProgress.set(withSpring(1, MENU_TRANSITION_SPRING_CONFIG))}
        >
          <Menu size={22} color={isTabFocused(Tab.Menu) ? "#000000" : "#8a8a8a"} />
        </TabButton>
      </View>

      <View className="p-1 rounded-full bg-white" style={[styles.buttonBorder, styles.shadow]}>
        <TabButton
          focused={isTabFocused(Tab.Profile)}
          onPress={() => navigation.navigate(Tab.Profile)}
        >
          <User size={22} color={isTabFocused(Tab.Profile) ? "#000000" : "#8a8a8a"} />
        </TabButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonBorder: { borderWidth: 1, borderColor: "#F1F1F1" },
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
});

// shopify-custom-bottom-tab-bar-animation 🔼
