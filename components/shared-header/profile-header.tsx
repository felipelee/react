import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { MoreVertical } from 'lucide-react-native';

export const ProfileHeader = () => {
  return (
    <Animated.View
      entering={FadeIn.duration(150)}
      style={styles.container}
    >
      <Text style={styles.title}>Profile</Text>
      <Pressable style={styles.iconButton}>
        <MoreVertical size={20} color="white" />
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
