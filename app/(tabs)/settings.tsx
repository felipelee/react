import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import React from 'react';
import { SharedHeader } from '@/components/shared-header';
import { TabScreenContainer } from '@/components/tab-screen-container';
import { ChevronRight } from 'lucide-react-native';

export default function SettingsTab() {
  return (
    <View style={styles.wrapper}>
      <SharedHeader />
      <TabScreenContainer>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>General</Text>
            <Pressable style={styles.settingItem}>
              <Text style={styles.settingText}>Notifications</Text>
              <ChevronRight size={20} color="#9CA3AF" />
            </Pressable>
            <Pressable style={styles.settingItem}>
              <Text style={styles.settingText}>Privacy</Text>
              <ChevronRight size={20} color="#9CA3AF" />
            </Pressable>
            <Pressable style={styles.settingItem}>
              <Text style={styles.settingText}>Security</Text>
              <ChevronRight size={20} color="#9CA3AF" />
            </Pressable>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Pressable style={styles.settingItem}>
              <Text style={styles.settingText}>Help & Support</Text>
              <ChevronRight size={20} color="#9CA3AF" />
            </Pressable>
            <Pressable style={styles.settingItem}>
              <Text style={styles.settingText}>Terms of Service</Text>
              <ChevronRight size={20} color="#9CA3AF" />
            </Pressable>
            <Pressable style={styles.settingItem}>
              <Text style={styles.settingText}>Privacy Policy</Text>
              <ChevronRight size={20} color="#9CA3AF" />
            </Pressable>
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    textTransform: 'uppercase',
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f3f4f6',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  settingText: {
    fontSize: 16,
    color: '#111827',
  },
});
