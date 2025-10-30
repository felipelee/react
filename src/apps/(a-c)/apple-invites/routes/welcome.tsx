import { View, Pressable, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState } from "react";
import { useAnimatedReaction, useSharedValue } from "react-native-reanimated";
import { Marquee } from "../components/marquee";
import { _itemWidth } from "../components/marquee-item";
import ImageBg from "../components/image-bg";
import useDebounce from "@/src/shared/lib/hooks/use-debounce";
import { scheduleOnRN } from "react-native-worklets";

// apple-invites-welcome-screen-animation 🔽

// Static event data for carousel - images removed due to missing assets
const events = [
  { id: 1, image: null },
  { id: 2, image: null },
  { id: 3, image: null },
  { id: 4, image: null },
  { id: 5, image: null },
  { id: 6, image: null },
  { id: 7, image: null },
  { id: 8, image: null },
];

export default function Welcome() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [debouncedActiveIndex] = useDebounce(activeIndex, 500);

  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const scrollOffsetX = useSharedValue(0);
  const allItemsWidth = events.length * _itemWidth;

  useAnimatedReaction(
    () => scrollOffsetX.value,
    (currentValue) => {
      const normalizedOffset = ((currentValue % allItemsWidth) + allItemsWidth) % allItemsWidth;
      const shift = width / 2;
      const activeItemIndex = Math.abs(Math.floor((normalizedOffset + shift) / _itemWidth));

      if (activeItemIndex === events.length) {
        scheduleOnRN(setActiveIndex, 0);
      }

      if (
        activeItemIndex >= 0 &&
        activeItemIndex < events.length &&
        activeItemIndex !== activeIndex
      ) {
        scheduleOnRN(setActiveIndex, activeItemIndex);
      }
    }
  );

  return (
    <View
      className="flex-1 bg-slate-800"
      style={{ paddingTop: insets.top + 16, paddingBottom: insets.bottom }}
    >
      {events[debouncedActiveIndex].image && (
        <ImageBg
          itemKey={events[debouncedActiveIndex].id.toString()}
          source={events[debouncedActiveIndex].image}
        />
      )}
      <View className="basis-[60%] pt-10">
        <Marquee events={events} scrollOffsetX={scrollOffsetX} />
      </View>
      <View className="basis-[40%] items-center justify-between pt-12 pb-4">
        <View className="w-full items-center justify-center">
          <View className="w-[60%] h-10 rounded-full bg-white/30 mb-2" />
          <View className="w-[80%] h-10 rounded-full bg-white/30 mb-4" />
          <View className="w-[70%] h-6 rounded-full bg-white/15 mb-2" />
          <View className="w-[30%] h-6 rounded-full bg-white/15" />
        </View>
        <Pressable
          className="h-14 rounded-full w-[50%] bg-white/30"
          onPress={() => {
            if (activeIndex < events.length - 1) {
              setActiveIndex(activeIndex + 1);
            } else {
              setActiveIndex(0);
            }
          }}
        />
      </View>
    </View>
  );
}

// apple-invites-welcome-screen-animation 🔼
