import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { SharedHeader } from '@/components/shared-header';
import { TabScreenContainer } from '@/components/tab-screen-container';

export default function ProfileTab() {
  return (
    <View style={styles.wrapper}>
      <SharedHeader />
      <TabScreenContainer>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.profileCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>JD</Text>
            </View>
            <Text style={styles.name}>John Doe</Text>
            <Text style={styles.email}>john.doe@example.com</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Profile Information</Text>
            <Text style={styles.cardText}>
              This tab demonstrates the shared header animation with a standard height.
            </Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Settings</Text>
            <Text style={styles.cardText}>
              The header transitions smoothly when navigating between tabs.
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
  profileCard: {
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    padding: 32,
    marginBottom: 16,
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#c026d3',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarText: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#6b7280',
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
