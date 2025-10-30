import React, { FC } from "react";
import { Platform, View } from "react-native";
import Animated, { SharedValue } from "react-native-reanimated";
import { useHeaderBackground } from "../lib/hooks/use-header-background";

type Props = {
  offsetY: SharedValue<number>;
};

export const CommunitiesContent: FC<Props> = ({ offsetY }) => {
  const { targetRef, onTargetLayout } = useHeaderBackground({ offsetY });

  return (
    <Animated.View ref={targetRef} onLayout={onTargetLayout} className="opacity-75 px-4">
      <View className="h-32 w-32 bg-stone-900 rounded-2xl self-center mb-6" />

      <View className="h-6 w-[90%] bg-neutral-900 rounded-full mb-4" />
      <View className="h-3 w-full bg-neutral-900 rounded-full mb-2" />
      <View className="h-3 w-full bg-neutral-900 rounded-full mb-2" />
      <View className="h-3 w-[40%] bg-neutral-900 rounded-full mb-6" />

      <View className="h-5 w-[50%] bg-stone-900 rounded-full self-center mb-6" />

      <View className="h-12 bg-green-500/10 rounded-xl" />

      {Platform.OS === "android" && <View className="h-[500px] w-full" />}
    </Animated.View>
  );
};
