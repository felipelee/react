import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Bell } from 'lucide-react-native';

export const HomeHeader = () => {
  return (
    <Animated.View
      entering={FadeIn.duration(150)}
      style={styles.container}
    >
      <Pressable style={styles.leftSection}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>MA</Text>
        </View>
        <Text style={styles.title}>My App</Text>
      </Pressable>
      <View style={styles.rightSection}>
        <Pressable style={styles.iconButton}>
          <Bell size={20} color="white" />
        </Pressable>
        <Pressable style={styles.userAvatar}>
          <Text style={styles.userAvatarText}>JD</Text>
        </Pressable>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#10b981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '600',
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#c026d3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userAvatarText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
