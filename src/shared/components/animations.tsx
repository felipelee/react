import { App, apps } from "../lib/constants/apps-list";
import { useRouter } from "expo-router";
import React, { FC, memo, useCallback, useMemo, useState } from "react";
import {
  FlatList,
  ListRenderItemInfo,
  Text,
  View,
  StyleSheet,
  TextInput,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NewAnimations } from "./new-animations";
import { Pressable } from "react-native-gesture-handler";
import * as Haptics from "expo-haptics";
import { useDrawer } from "../lib/providers/drawer-provider";
import { DrawerContentComponentProps } from "@react-navigation/drawer";
import { LinearGradient } from "expo-linear-gradient";
import { colorKit } from "reanimated-color-picker";
import Animated, { FadeInDown } from "react-native-reanimated";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import CurvedDivider from "./curved-divider";

type AppSection = {
  title: string;
  imageSource: number | null;
  data: App["animations"];
};

type FlatDataItem =
  | { type: "header"; section: AppSection }
  | { type: "item"; animation: App["animations"][number] };

type Props = DrawerContentComponentProps;

const Animations: FC<Props> = ({ navigation }) => {
  const [query, setQuery] = useState("");

  const { drawerTextInputRef } = useDrawer();

  const router = useRouter();

  const insets = useSafeAreaInsets();

  const sections: AppSection[] = apps
    .map(
      (app: App): AppSection => ({
        title: app.name,
        imageSource: app.imageSource,
        data: app.animations,
      })
    )
    .filter((section) => section.data.length > 0);

  const filteredSections = useMemo(() => {
    if (!query.trim()) return sections;
    const lowerQuery = query.toLowerCase();
    return sections
      .map((section) => ({
        ...section,
        data: section.data.filter((animation) =>
          animation.name.toLowerCase().includes(lowerQuery)
        ),
      }))
      .filter((section) => section.data.length > 0);
  }, [query, sections]);

  const flatData: FlatDataItem[] = useMemo(() => {
    const result: FlatDataItem[] = [];
    filteredSections.forEach((section) => {
      result.push({ type: "header", section });
      section.data.forEach((animation) => {
        result.push({ type: "item", animation });
      });
    });
    return result;
  }, [filteredSections]);

  const onPress = useCallback(
    (href: string) => {
      if (Platform.OS !== "web") {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      }
      navigation.closeDrawer();
      router.push(href as any);
    },
    [navigation, router]
  );

  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<FlatDataItem>) => {
      if (item.type === "header") {
        return (
          <Animated.View
            entering={FadeInDown.delay(index * 20)}
            className="flex-row items-center gap-3 mb-3 mt-6"
          >
            {item.section.imageSource && (
              <View className="w-10 h-10 rounded-xl bg-white/10" />
            )}
            <Text className="text-white text-lg font-semibold">
              {item.section.title}
            </Text>
          </Animated.View>
        );
      }

      return (
        <Animated.View entering={FadeInDown.delay(index * 20)}>
          <Pressable
            className="px-4 py-3 mb-2 bg-white/5 rounded-xl active:bg-white/10"
            onPress={() => onPress(item.animation.href)}
          >
            <Text className="text-white">{item.animation.name}</Text>
          </Pressable>
        </Animated.View>
      );
    },
    [onPress]
  );

  const keyExtractor = useCallback((item: FlatDataItem, index: number) => {
    if (item.type === "header") {
      return `header-${item.section.title}`;
    }
    return `item-${item.animation.name}-${index}`;
  }, []);

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior="padding"
      keyboardVerticalOffset={0}
    >
      <LinearGradient
        colors={[
          colorKit.setAlpha("#000000", 1).hex(),
          colorKit.setAlpha("#1a1a2e", 0.95).hex(),
        ]}
        style={StyleSheet.absoluteFill}
      />

      <View
        className="px-4 pb-4"
        style={{
          paddingTop: insets.top + 20,
        }}
      >
        <View className="flex-row items-center justify-between mb-6">
          <View className="h-12 w-32 bg-white/10 rounded-lg" />
          <NewAnimations />
        </View>

        <TextInput
          ref={drawerTextInputRef}
          className="h-12 px-4 bg-white/10 rounded-xl text-white placeholder:text-white/50"
          placeholder="Search animations..."
          placeholderTextColor="rgba(255,255,255,0.5)"
          value={query}
          onChangeText={setQuery}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <CurvedDivider />

      <FlatList
        data={flatData}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: insets.bottom + 20,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      />
    </KeyboardAvoidingView>
  );
};

export default memo(Animations);
