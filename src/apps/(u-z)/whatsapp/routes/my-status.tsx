import React, { useState, useEffect } from "react";
import { Keyboard, Pressable, TextInput, useWindowDimensions, View } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";
import Animated, { useAnimatedStyle, withDelay, withTiming } from "react-native-reanimated";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { cn } from "@/src/shared/lib/utils/cn";

// whatsapp-add-status-background-animation 🔽

const tailwindColors = {
  slate: { darkBg: "bg-slate-950", lightBg: "bg-slate-600" },
  zinc: { darkBg: "bg-zinc-950", lightBg: "bg-zinc-600" },
  neutral: { darkBg: "bg-neutral-950", lightBg: "bg-neutral-600" },
  stone: { darkBg: "bg-stone-950", lightBg: "bg-stone-600" },
  orange: { darkBg: "bg-orange-950", lightBg: "bg-orange-600" },
  amber: { darkBg: "bg-amber-950", lightBg: "bg-amber-600" },
  yellow: { darkBg: "bg-yellow-950", lightBg: "bg-yellow-600" },
  lime: { darkBg: "bg-lime-950", lightBg: "bg-lime-600" },
  green: { darkBg: "bg-green-950", lightBg: "bg-green-600" },
  emerald: { darkBg: "bg-emerald-950", lightBg: "bg-emerald-600" },
  teal: { darkBg: "bg-teal-950", lightBg: "bg-teal-600" },
  cyan: { darkBg: "bg-cyan-950", lightBg: "bg-cyan-600" },
  sky: { darkBg: "bg-sky-950", lightBg: "bg-sky-600" },
  blue: { darkBg: "bg-blue-950", lightBg: "bg-blue-600" },
  indigo: { darkBg: "bg-indigo-950", lightBg: "bg-indigo-600" },
  violet: { darkBg: "bg-violet-950", lightBg: "bg-violet-600" },
  purple: { darkBg: "bg-purple-950", lightBg: "bg-purple-600" },
  fuchsia: { darkBg: "bg-fuchsia-950", lightBg: "bg-fuchsia-600" },
  pink: { darkBg: "bg-pink-950", lightBg: "bg-pink-600" },
  rose: { darkBg: "bg-rose-950", lightBg: "bg-rose-600" },
};

// Timing: single source for the background pulse entrance
// 200ms matches WhatsApp's snappy feedback without feeling abrupt
const _duration = 200;

export default function MyStatus() {
  const [isMounted, setIsMounted] = useState(false);
  const [randomColor, setRandomColor] = useState<keyof typeof tailwindColors>("indigo");

  const { width, height } = useWindowDimensions();

  // Why: Content respects navigation header height so our background pulse aligns below it
  const headerHeight = useHeaderHeight();

  useEffect(() => {
    const colorKeys = Object.keys(tailwindColors);
    const randomIndex = Math.floor(Math.random() * colorKeys.length);
    setRandomColor(colorKeys[randomIndex] as keyof typeof tailwindColors);
  }, []);

  // Purpose: Drives the expanding soft background behind the editor
  // Visual intent: fade + radial scale + vertical fill to create a "lighting up" effect
  const rShadowStyle = useAnimatedStyle(() => {
    if (!isMounted)
      return {
        opacity: 0,
        transform: [{ scale: 1 }],
        height: width / 4,
      };

    return {
      // Opacity: quick reveal in sync with scale for cohesive pulse
      opacity: withTiming(1, { duration: _duration }),
      // Scale: radial growth from a quarter-width circle → large soft background
      // Scale target 10 chosen empirically to cover screen with ample feathering
      transform: [{ scale: withTiming(10, { duration: _duration }) }],
      // Height: slight delayed fill prevents harsh jump; fills to full screen height
      // Delay = duration-50 to stagger behind the opacity/scale for layered feel
      height: withDelay(_duration - 50, withTiming(height, { duration: _duration - 50 })),
    };
  });

  return (
    <View
      className={cn("flex-1", tailwindColors[randomColor].darkBg)}
      style={{ paddingTop: headerHeight }}
      onLayout={() => setIsMounted(true)}
    >
      <Animated.View
        className={cn("absolute rounded-full opacity-75", tailwindColors[randomColor].lightBg)}
        // Seed circle: starts small at left-of-center to mimic a soft directional glow
        // width/4 sets base radius; left = -width/8 centers the circle's midpoint on x=0
        style={[{ width: width / 4, top: width / 2, left: -width / 8 }, rShadowStyle]}
      />
      <View className="absolute inset-0 bg-black/50" />
      <KeyboardAvoidingView behavior="padding" className="flex-1">
        <Pressable className="flex-1 items-center justify-center" onPress={Keyboard.dismiss}>
          <View className="p-4">
            <TextInput
              placeholder="Type a status"
              placeholderTextColor="#ffffff50"
              className="text-3xl text-white font-semibold"
              selectionColor="#ffffff"
              autoFocus
            />
          </View>
        </Pressable>
      </KeyboardAvoidingView>
    </View>
  );
}

// whatsapp-add-status-background-animation 🔼
