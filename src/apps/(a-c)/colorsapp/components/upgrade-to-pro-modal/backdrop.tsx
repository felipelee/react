import React, { FC } from "react";

import { BottomSheetBackdrop, BottomSheetBackdropProps } from "@gorhom/bottom-sheet";
import { Image } from "expo-image";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View, Text, StyleSheet } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { colorKit } from "reanimated-color-picker";

// colorsapp-upgrade-to-pro-modal-animation 🔽

type Props = BottomSheetBackdropProps;

export const Backdrop: FC<Props> = ({ ...props }) => {
  const insets = useSafeAreaInsets();

  return (
    <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} opacity={1}>
      <View className="w-full h-full" style={{ paddingTop: insets.top + 20 }}>
        <LinearGradient
          colors={[colorKit.setAlpha("#070609", 0.7).hex(), colorKit.setAlpha("#070609", 0).hex()]}
          style={StyleSheet.absoluteFill}
        />
        <View className="items-center px-4 gap-3">
          <View style={styles.iconPlaceholder} />
          <Text className="text-3xl text-white">Become a PRO</Text>
        </View>
      </View>
    </BottomSheetBackdrop>
  );
};

const styles = StyleSheet.create({
  iconPlaceholder: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    opacity: 0.8,
  },
});

// colorsapp-upgrade-to-pro-modal-animation 🔼
