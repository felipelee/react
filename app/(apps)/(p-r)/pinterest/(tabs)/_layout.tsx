import { Tabs } from "expo-router";
import { MessageCircleMore, Plus, Search } from "lucide-react-native";
import React from "react";
import { Pressable } from "react-native";
import Foundation from "@expo/vector-icons/Foundation";
import FontAwesome from "@expo/vector-icons/FontAwesome";

enum Tab {
  Home = "home",
  Search = "search",
  Add = "add",
  Updates = "updates",
  Account = "account",
}

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: "#000",
        },
        tabBarButton: (props) => (
          <Pressable
            onPress={props.onPress}
            style={props.style}
            android_ripple={{ color: "transparent" }}
          >
            {props.children}
          </Pressable>
        ),
      }}
    >
      <Tabs.Screen
        name={Tab.Home}
        options={{
          tabBarIcon: ({ color }) => <Foundation name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name={Tab.Search}
        options={{
          tabBarIcon: ({ color }) => <Search size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name={Tab.Add}
        options={{
          tabBarIcon: ({ color }) => <Plus size={26} color={color} strokeWidth={3} />,
        }}
      />
      <Tabs.Screen
        name={Tab.Updates}
        options={{
          tabBarIcon: ({ color }) => <MessageCircleMore size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name={Tab.Account}
        options={{
          tabBarIcon: ({ color }) => <FontAwesome name="user" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
