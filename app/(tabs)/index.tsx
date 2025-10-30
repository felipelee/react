import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { SharedHeader } from '@/components/shared-header';
import { TabScreenContainer } from '@/components/tab-screen-container';

export default function HomeTab() {
  return (
    <View style={styles.wrapper}>
      <SharedHeader />
      <TabScreenContainer>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Welcome Home</Text>
            <Text style={styles.cardText}>
              This is the home tab with a shared animated header that morphs
              based on which tab is active.
            </Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Feature 1</Text>
            <Text style={styles.cardText}>
              Notice how the header smoothly transitions when you switch tabs.
            </Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Feature 2</Text>
            <Text style={styles.cardText}>
              The Explore tab has a taller header with search and filters.
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
