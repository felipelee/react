import { FlatList, View, Text, StyleSheet, RefreshControl, ActivityIndicator } from "react-native";
import React from "react";
import { TabScreenContainer } from "../components/tab-screen-container";
import { StatCard } from "../components/stat-card";
import { OrderCard } from "../components/order-card";
import { useStoreStats } from "@/src/shared/lib/hooks/use-analytics";
import { useRecentOrders } from "@/src/shared/lib/hooks/use-orders";
import { DollarSign, Package, ShoppingCart, Users } from "lucide-react-native";

export const Home = () => {
  const { stats, loading: statsLoading, refetch: refetchStats } = useStoreStats();
  const { orders, loading: ordersLoading, refetch: refetchOrders } = useRecentOrders(5);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await Promise.all([refetchStats(), refetchOrders()]);
    setRefreshing(false);
  }, [refetchStats, refetchOrders]);

  const loading = statsLoading || ordersLoading;

  if (loading && !refreshing) {
    return (
      <TabScreenContainer>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#000" />
          <Text style={styles.loadingText}>Loading dashboard...</Text>
        </View>
      </TabScreenContainer>
    );
  }

  return (
    <TabScreenContainer>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={() => (
          <View>
            <View style={styles.statsContainer}>
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <StatCard
                    title="Revenue"
                    value={`$${stats?.totalRevenue.toFixed(2) || '0.00'}`}
                    icon={<DollarSign size={20} color="#10B981" />}
                    subtitle="Total earnings"
                  />
                </View>
                <View style={styles.statItem}>
                  <StatCard
                    title="Orders"
                    value={stats?.totalOrders || 0}
                    icon={<ShoppingCart size={20} color="#3B82F6" />}
                    subtitle="All time"
                  />
                </View>
              </View>
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <StatCard
                    title="Products"
                    value={stats?.totalProducts || 0}
                    icon={<Package size={20} color="#F59E0B" />}
                    subtitle="In catalog"
                  />
                </View>
                <View style={styles.statItem}>
                  <StatCard
                    title="Customers"
                    value={stats?.totalCustomers || 0}
                    icon={<Users size={20} color="#8B5CF6" />}
                    subtitle="Total users"
                  />
                </View>
              </View>
            </View>

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent Orders</Text>
            </View>
          </View>
        )}
        renderItem={({ item }) => <OrderCard order={item} />}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No orders yet</Text>
          </View>
        )}
        contentContainerStyle={styles.listContent}
      />
    </TabScreenContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#6B7280',
  },
  listContent: {
    paddingBottom: 100,
  },
  statsContainer: {
    padding: 20,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  statItem: {
    flex: 1,
  },
  sectionHeader: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#9CA3AF',
  },
});
