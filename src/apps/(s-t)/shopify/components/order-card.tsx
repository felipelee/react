import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import type { OrderWithCustomer } from '@/src/shared/lib/supabase/types';

interface OrderCardProps {
  order: OrderWithCustomer;
  onPress?: () => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return { bg: '#D1FAE5', text: '#065F46' };
    case 'processing':
      return { bg: '#DBEAFE', text: '#1E40AF' };
    case 'pending':
      return { bg: '#FEF3C7', text: '#92400E' };
    case 'cancelled':
      return { bg: '#FEE2E2', text: '#991B1B' };
    default:
      return { bg: '#F3F4F6', text: '#374151' };
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));

  if (diffInHours < 24) {
    if (diffInHours === 0) return 'Just now';
    return `${diffInHours}h ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays === 1) return 'Yesterday';
  if (diffInDays < 7) return `${diffInDays} days ago`;

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export const OrderCard: React.FC<OrderCardProps> = ({ order, onPress }) => {
  const statusColor = getStatusColor(order.status);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <View style={styles.leftSection}>
        <Image
          source={{ uri: order.customers.avatar_url }}
          style={styles.avatar}
          contentFit="cover"
        />
        <View style={styles.infoContainer}>
          <Text style={styles.orderNumber}>{order.order_number}</Text>
          <Text style={styles.customerName}>{order.customers.name}</Text>
          <Text style={styles.time}>{formatDate(order.created_at)}</Text>
        </View>
      </View>

      <View style={styles.rightSection}>
        <Text style={styles.amount}>${order.total_amount.toFixed(2)}</Text>
        <View style={[styles.statusBadge, { backgroundColor: statusColor.bg }]}>
          <Text style={[styles.statusText, { color: statusColor.text }]}>
            {order.status}
          </Text>
        </View>
        <Text style={styles.items}>{order.items_count} items</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F1F1',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  pressed: {
    opacity: 0.7,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  customerName: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  time: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 4,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  items: {
    fontSize: 11,
    color: '#9CA3AF',
  },
});
