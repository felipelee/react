import React, { FC } from "react";
import { View, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { Trophy } from "lucide-react-native";

// github-achievements-carousel-animation 🔽

type Props = {
  achievements?: any[];
  maxVisible?: number;
  size?: number;
  overlap?: number;
};

export const AchievementsButton: FC<Props> = ({
  achievements = [],
  maxVisible = 3,
  size = 24,
  overlap = 8,
}) => {
  const router = useRouter();
  const visibleAchievements = achievements.slice(0, maxVisible);

  return (
    <Pressable
      className="flex-row items-center gap-2"
      onPress={() => router.push("/github/achievements")}
    >
      <Trophy size={16} color="gray" />
      <View className="flex-row items-center">
        {visibleAchievements.map((_, index) => (
          <View
            key={`achievement-${index}`}
            className="border border-white rounded-full bg-white/10"
            style={[
              {
                width: size,
                height: size,
                zIndex: index - visibleAchievements.length,
                marginLeft: index > 0 ? -overlap : 0,
              },
            ]}
          />
        ))}
      </View>
    </Pressable>
  );
};

// github-achievements-carousel-animation 🔼
