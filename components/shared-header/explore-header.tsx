import React from 'react';
import { View, TextInput, Pressable, StyleSheet, Text } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { X, SlidersHorizontal } from 'lucide-react-native';
import { SEARCH_BAR_HEIGHT, FILTERS_HEIGHT } from './constants';

export const ExploreHeader = () => {
  return (
    <Animated.View entering={FadeIn.delay(200).duration(150)}>
      <View style={styles.searchBarContainer}>
        <Pressable style={styles.closeButton}>
          <X size={22} color="#E5E7EB" />
        </Pressable>
        <View style={styles.searchInput}>
          <TextInput
            placeholder="Search..."
            placeholderTextColor="#9CA3AF"
            style={styles.input}
          />
        </View>
      </View>
      <View style={styles.filtersContainer}>
        <Pressable style={styles.filterButton}>
          <SlidersHorizontal size={16} color="#fff" />
          <Text style={styles.filterText}>Filters</Text>
        </Pressable>
        <Pressable style={styles.filterChip}>
          <Text style={styles.filterChipText}>Popular</Text>
        </Pressable>
        <Pressable style={styles.filterChip}>
          <Text style={styles.filterChipText}>Recent</Text>
        </Pressable>
        <Pressable style={styles.filterChip}>
          <Text style={styles.filterChipText}>Trending</Text>
        </Pressable>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    height: SEARCH_BAR_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  closeButton: {
    height: SEARCH_BAR_HEIGHT,
    aspectRatio: 1,
    borderRadius: SEARCH_BAR_HEIGHT / 2,
    backgroundColor: '#303030',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInput: {
    flex: 1,
    height: SEARCH_BAR_HEIGHT,
    backgroundColor: '#303030',
    borderRadius: 21,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  input: {
    color: '#fff',
    fontSize: 16,
  },
  filtersContainer: {
    height: FILTERS_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 8,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    height: 36,
    backgroundColor: '#303030',
    borderRadius: 18,
  },
  filterText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  filterChip: {
    paddingHorizontal: 16,
    height: 36,
    backgroundColor: '#1f1f1f',
    borderRadius: 18,
    justifyContent: 'center',
  },
  filterChipText: {
    color: '#9CA3AF',
    fontSize: 14,
  },
});
