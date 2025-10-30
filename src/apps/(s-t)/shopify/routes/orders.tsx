import { FlatList, View, Text, StyleSheet, RefreshControl, ActivityIndicator } from "react-native";
import React from "react";
import { TabScreenContainer } from "../components/tab-screen-container";
import { OrderCard } from "../components/order-card";
import { useOrders } from "@/src/shared/lib/hooks/use-orders";

export const Orders = () => {
  const { orders, loading, refetch } = useOrders();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, [refetch]);

  if (loading && !refreshing) {
    return (
      <View className="flex-1 bg-black">
        <TabScreenContainer>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#000" />
            <Text style={styles.loadingText}>Loading orders...</Text>
          </View>
        </TabScreenContainer>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black">
      <TabScreenContainer>
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <OrderCard order={item} />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTitle}>No orders yet</Text>
              <Text style={styles.emptyText}>
                Orders will appear here when customers make purchases
              </Text>
            </View>
          )}
          contentContainerStyle={styles.listContent}
        />
      </TabScreenContainer>
    </View>
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
    paddingTop: 20,
    paddingBottom: 100,
  },
  emptyContainer: {
    paddingVertical: 60,
    paddingHorizontal: 40,
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});
