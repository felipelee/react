import { Pressable, Text, View } from "react-native";
import { useRouter } from "expo-router";
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";
import { useLinearHeader } from "../lib/use-linear-header";

// linear-header-on-scroll-animation 🔽

const TITLE = "Home";

export default function Home() {
  const router = useRouter();

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.set(event.contentOffset.y);
    },
  });

  useLinearHeader({ offsetY: scrollY, title: TITLE });

  const onTeamPress = () => {
    router.push("/linear/home/dev-issues");
  };

  return (
    <Animated.ScrollView
      className="bg-linear-back"
      contentContainerClassName="px-4"
      onScroll={scrollHandler}
      scrollEventThrottle={16}
    >
      <Text className="text-white text-3xl font-bold mt-2">{TITLE}</Text>
      <View className="h-4 w-2/5 mt-8 rounded-full bg-linear-front" />
      <View className="h-4 w-3/5 mt-5 rounded-full bg-linear-front" />
      <View className="h-4 w-2/6 mt-8 rounded-full bg-linear-front" />

      <Pressable className="flex-1 flex-row items-center gap-3 mt-7" onPress={onTeamPress}>
        <View className="size-7 rounded-full bg-white/10" />
        <Text className="text-white text-lg font-semibold">DEV</Text>
      </Pressable>

      <Pressable className="flex-1 flex-row items-center gap-3 mt-5" onPress={onTeamPress}>
        <View className="size-7 rounded-full bg-white/10" />
        <Text className="text-white text-lg font-semibold">make it animated</Text>
      </Pressable>
    </Animated.ScrollView>
  );
}

// linear-header-on-scroll-animation 🔼
