import { ScrollView, View, Text, StyleSheet } from "react-native";
import React from "react";
import { TabScreenContainer } from "../components/tab-screen-container";
import { useStoreStats } from "@/src/shared/lib/hooks/use-analytics";
import { Store, Mail, Globe, ShoppingBag, TrendingUp, Calendar } from "lucide-react-native";

export const Profile = () => {
  const { stats, loading } = useStoreStats();

  return (
    <TabScreenContainer>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Store size={48} color="#fff" />
          </View>
          <Text style={styles.storeName}>My Store</Text>
          <Text style={styles.storeTagline}>Your amazing store for all your needs</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Store Information</Text>

          <View style={styles.infoItem}>
            <View style={styles.infoIcon}>
              <Mail size={20} color="#6B7280" />
            </View>
            <View>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>store@example.com</Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <View style={styles.infoIcon}>
              <Globe size={20} color="#6B7280" />
            </View>
            <View>
              <Text style={styles.infoLabel}>Website</Text>
              <Text style={styles.infoValue}>www.mystore.com</Text>
            </View>
          </View>

          <View style={styles.infoItem}>
            <View style={styles.infoIcon}>
              <Calendar size={20} color="#6B7280" />
            </View>
            <View>
              <Text style={styles.infoLabel}>Member Since</Text>
              <Text style={styles.infoValue}>January 2024</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Performance</Text>

          <View style={styles.statsGrid}>
            <View style={styles.statBox}>
              <ShoppingBag size={24} color="#3B82F6" />
              <Text style={styles.statValue}>{stats?.totalOrders || 0}</Text>
              <Text style={styles.statLabel}>Total Orders</Text>
            </View>

            <View style={styles.statBox}>
              <TrendingUp size={24} color="#10B981" />
              <Text style={styles.statValue}>${stats?.totalRevenue.toFixed(0) || '0'}</Text>
              <Text style={styles.statLabel}>Revenue</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </TabScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#111827',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  storeName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  storeTagline: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F1F1',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
});
