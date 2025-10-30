import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { SharedHeader } from '@/components/shared-header';
import { TabScreenContainer } from '@/components/tab-screen-container';

export default function ExploreTab() {
  return (
    <View style={styles.wrapper}>
      <SharedHeader />
      <TabScreenContainer>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Explore Content</Text>
            <Text style={styles.cardText}>
              This tab has a taller header with search functionality and filter chips.
              The header animates smoothly when switching from other tabs.
            </Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Search Feature</Text>
            <Text style={styles.cardText}>
              The search bar and filters appear with a delayed fade-in animation
              after the header height transition completes.
            </Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Dynamic Height</Text>
            <Text style={styles.cardText}>
              The header height calculation includes safe area insets, search bar height,
              and filters height for precise animation.
            </Text>
          </View>
        </ScrollView>
      </TabScreenContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContent: {
    padding: 20,
  },
  card: {
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
});
