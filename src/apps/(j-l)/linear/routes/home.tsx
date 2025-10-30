import { Pressable, Text, View, Image } from "react-native";
import { useRouter } from "expo-router";
import Animated, { useAnimatedScrollHandler, useSharedValue } from "react-native-reanimated";
import { useLinearHeader } from "../lib/use-linear-header";
import LinearLogo from "@/assets/images/apps/linear.png";
import GithubLogo from "@/assets/images/apps/github.png";

// linear-header-on-scroll-animation 🔽

const TITLE = "Home";

export default function Home() {
  const router = useRouter();

  // Shared scroll offset drives header flip progress via useLinearHeader.
  const scrollY = useSharedValue(0);

  // UI-thread scroll handler keeps scroll → animation path jank-free.
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.set(event.contentOffset.y);
    },
  });

  // Hook wires the header flip; thresholding and timing handled inside.
  useLinearHeader({ offsetY: scrollY, title: TITLE });

  const onTeamPress = () => {
    router.push("/linear/home/dev-issues");
  };

  return (
    <Animated.ScrollView
      className="bg-linear-back"
      contentContainerClassName="px-4"
      onScroll={scrollHandler}
      // ~60fps updates ensure smooth flip timing without overloading JS.
      scrollEventThrottle={16}
    >
      <Text className="text-white text-3xl font-bold mt-2">{TITLE}</Text>
      <View className="h-4 w-2/5 mt-8 rounded-full bg-linear-front" />
      <View className="h-4 w-3/5 mt-5 rounded-full bg-linear-front" />
      <View className="h-4 w-2/6 mt-8 rounded-full bg-linear-front" />

      <Pressable className="flex-1 flex-row items-center gap-3 mt-7" onPress={onTeamPress}>
        <Image source={GithubLogo} className="size-7 rounded-full" resizeMode="contain" />
        <Text className="text-white text-lg font-semibold">DEV</Text>
      </Pressable>

      <Pressable className="flex-1 flex-row items-center gap-3 mt-5" onPress={onTeamPress}>
        <Image source={LinearLogo} className="size-7 rounded-full" resizeMode="contain" />
        <Text className="text-white text-lg font-semibold">make it animated</Text>
      </Pressable>
    </Animated.ScrollView>
  );
}

// linear-header-on-scroll-animation 🔼
