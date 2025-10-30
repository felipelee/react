import { configureReanimatedLogger, ReanimatedLogLevel } from "react-native-reanimated";
import { ExploreAnimationsBtn } from "@/src/shared/components/index-screen/explore-animations-btn";
import { OtaUpdate } from "@/src/shared/components/index-screen/ota-update";
import { View } from "react-native";

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-[#131316]">
      <OtaUpdate />
      <ExploreAnimationsBtn />
    </View>
  );
}
