import { View, TextInput, Pressable, StyleSheet } from "react-native";
import { Search, X } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { KeyboardStickyView } from "react-native-keyboard-controller";
import { use } from "react";
import { SearchTransitionContext } from "@/app/(apps)/(j-l)/linear/_layout";

// linear-search-screen-open-close-animation 🔽

export const SearchInput = () => {
  const { onCloseSearchModal } = use(SearchTransitionContext);

  return (
    <KeyboardStickyView>
      <View className="absolute left-0 right-0 bottom-0 flex-row items-center p-3 gap-2">
        <LinearGradient
          colors={["transparent", "#0A090C"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 0.2 }}
          style={StyleSheet.absoluteFill}
        />
        <View
          className="flex-row flex-1 items-center bg-[#282828] px-3 h-[48px] rounded-2xl gap-2"
          style={styles.borderCurve}
        >
          <Search size={22} color="#c3c3c3" strokeWidth={2.5} />
          <TextInput
            placeholder="Quick find"
            placeholderTextColor="#888"
            returnKeyType="search"
            className="flex-1 text-white text-lg/6fdg text-semibold"
            selectionColor="#c3c3c3"
            onSubmitEditing={onCloseSearchModal}
            autoFocus
          />
        </View>

        <Pressable
          className="bg-[#282828] h-[48px] aspect-square rounded-2xl items-center justify-center"
          style={styles.borderCurve}
          onPress={onCloseSearchModal}
        >
          <X size={24} color="#c3c3c3" strokeWidth={2.5} />
        </Pressable>
      </View>
    </KeyboardStickyView>
  );
};

const styles = StyleSheet.create({
  borderCurve: {
    borderCurve: "continuous",
  },
});

// linear-search-screen-open-close-animation 🔼
