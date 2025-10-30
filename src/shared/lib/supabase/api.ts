import { supabase } from './client';
import type { Product, Customer, Order, OrderWithCustomer, Analytics } from './types';

const STORE_ID = '00000000-0000-0000-0000-000000000001';

export const api = {
  products: {
    async getAll(): Promise<Product[]> {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('store_id', STORE_ID)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },

    async getByCategory(category: string): Promise<Product[]> {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('store_id', STORE_ID)
        .eq('category', category)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },

    async search(query: string): Promise<Product[]> {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('store_id', STORE_ID)
        .eq('status', 'active')
        .ilike('name', `%${query}%`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
  },

  customers: {
    async getAll(): Promise<Customer[]> {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('store_id', STORE_ID)
        .order('total_spent', { ascending: false });

      if (error) throw error;
      return data || [];
    },

    async search(query: string): Promise<Customer[]> {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('store_id', STORE_ID)
        .or(`name.ilike.%${query}%,email.ilike.%${query}%`)
        .order('total_spent', { ascending: false });

      if (error) throw error;
      return data || [];
    },
  },

  orders: {
    async getAll(): Promise<OrderWithCustomer[]> {
      const { data, error } = await supabase
        .from('orders')
        .select('*, customers(*)')
        .eq('store_id', STORE_ID)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data as OrderWithCustomer[]) || [];
    },

    async getByStatus(status: string): Promise<OrderWithCustomer[]> {
      const { data, error } = await supabase
        .from('orders')
        .select('*, customers(*)')
        .eq('store_id', STORE_ID)
        .eq('status', status)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data as OrderWithCustomer[]) || [];
    },

    async search(query: string): Promise<OrderWithCustomer[]> {
      const { data, error } = await supabase
        .from('orders')
        .select('*, customers(*)')
        .eq('store_id', STORE_ID)
        .ilike('order_number', `%${query}%`)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data as OrderWithCustomer[]) || [];
    },

    async getRecent(limit: number = 10): Promise<OrderWithCustomer[]> {
      const { data, error } = await supabase
        .from('orders')
        .select('*, customers(*)')
        .eq('store_id', STORE_ID)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return (data as OrderWithCustomer[]) || [];
    },
  },

  analytics: {
    async getStats() {
      const [
        { count: totalProducts },
        { count: totalCustomers },
        { count: totalOrders },
        ordersData,
        analyticsData,
      ] = await Promise.all([
        supabase
          .from('products')
          .select('*', { count: 'exact', head: true })
          .eq('store_id', STORE_ID)
          .eq('status', 'active'),
        supabase
          .from('customers')
          .select('*', { count: 'exact', head: true })
          .eq('store_id', STORE_ID),
        supabase
          .from('orders')
          .select('*', { count: 'exact', head: true })
          .eq('store_id', STORE_ID),
        supabase
          .from('orders')
          .select('total_amount')
          .eq('store_id', STORE_ID),
        supabase
          .from('analytics')
          .select('*')
          .eq('store_id', STORE_ID)
          .order('date', { ascending: false })
          .limit(7),
      ]);

      const totalRevenue = ordersData.data?.reduce(
        (sum: number, order: any) => sum + Number(order.total_amount),
        0
      ) || 0;

      const recentAnalytics = analyticsData.data || [];

      return {
        totalProducts: totalProducts || 0,
        totalCustomers: totalCustomers || 0,
        totalOrders: totalOrders || 0,
        totalRevenue,
        recentAnalytics,
      };
    },

    async getRecentAnalytics(days: number = 7): Promise<Analytics[]> {
      const { data, error } = await supabase
        .from('analytics')
        .select('*')
        .eq('store_id', STORE_ID)
        .order('date', { ascending: false })
        .limit(days);

      if (error) throw error;
      return data || [];
    },
  },
};
