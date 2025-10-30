import { View, useWindowDimensions, ScrollView } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { useHomeHeaderHeight } from "../lib/hooks/use-home-header-height";
import { FC, useCallback } from "react";
import { useAnimatedScroll } from "../lib/providers/animated-scroll";
import { Post } from "../lib/types";
import { FlashList } from "@shopify/flash-list";
import { PostCard } from "./post-card";

// instagram-header-on-scroll-animation 🔽

const AnimatedFlatList = Animated.createAnimatedComponent(FlashList<Post>);

type Props = {
  posts: Post[];
};

export const HomeList: FC<Props> = ({ posts }) => {
  const { width } = useWindowDimensions();

  const { netHeaderHeight } = useHomeHeaderHeight();

  const { listRef, scrollHandler, listPointerEvents } = useAnimatedScroll();

  const _renderListHeader = useCallback(() => {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerClassName="px-5 gap-5"
      >
        {Array.from({ length: 10 }).map((_, index) => (
          <View key={index} className="items-center gap-3">
            <View className="w-20 h-20 rounded-full bg-neutral-900" />
            <View className="w-20 h-2 rounded-full bg-neutral-900" />
          </View>
        ))}
      </ScrollView>
    );
  }, []);

  const rListStyle = useAnimatedStyle(() => {
    return {
      pointerEvents: listPointerEvents.value ? "auto" : "none",
    };
  });

  return (
    <AnimatedFlatList
      ref={listRef}
      data={posts}
      renderItem={({ item, index }) => (
        // instagram-pagination-dots-animation 🔽
        <PostCard key={index} index={index} width={width} post={item} />
        // instagram-pagination-dots-animation 🔼
      )}
      ListHeaderComponent={_renderListHeader}
      showsVerticalScrollIndicator={false}
      contentContainerClassName="gap-6"
      contentContainerStyle={{ paddingTop: netHeaderHeight + 16 }}
      onScroll={scrollHandler}
      scrollEventThrottle={16} // 16 means 60fps (1000ms / 60fps = 16ms)
      style={rListStyle}
    />
  );
};

// instagram-header-on-scroll-animation 🔼
