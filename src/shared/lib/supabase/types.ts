export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      stores: {
        Row: {
          id: string
          name: string
          description: string
          logo_url: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string
          logo_url?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          logo_url?: string
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          store_id: string
          name: string
          description: string
          price: number
          image_url: string
          inventory: number
          category: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          store_id: string
          name: string
          description?: string
          price: number
          image_url?: string
          inventory?: number
          category?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          store_id?: string
          name?: string
          description?: string
          price?: number
          image_url?: string
          inventory?: number
          category?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      customers: {
        Row: {
          id: string
          store_id: string
          name: string
          email: string
          phone: string
          avatar_url: string
          total_orders: number
          total_spent: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          store_id: string
          name: string
          email: string
          phone?: string
          avatar_url?: string
          total_orders?: number
          total_spent?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          store_id?: string
          name?: string
          email?: string
          phone?: string
          avatar_url?: string
          total_orders?: number
          total_spent?: number
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          store_id: string
          customer_id: string
          order_number: string
          status: string
          total_amount: number
          items_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          store_id: string
          customer_id: string
          order_number: string
          status?: string
          total_amount: number
          items_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          store_id?: string
          customer_id?: string
          order_number?: string
          status?: string
          total_amount?: number
          items_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string
          quantity: number
          price: number
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          product_id: string
          quantity: number
          price: number
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string
          quantity?: number
          price?: number
          created_at?: string
        }
      }
      analytics: {
        Row: {
          id: string
          store_id: string
          date: string
          revenue: number
          orders_count: number
          customers_count: number
          created_at: string
        }
        Insert: {
          id?: string
          store_id: string
          date: string
          revenue?: number
          orders_count?: number
          customers_count?: number
          created_at?: string
        }
        Update: {
          id?: string
          store_id?: string
          date?: string
          revenue?: number
          orders_count?: number
          customers_count?: number
          created_at?: string
        }
      }
    }
  }
}

export type Product = Database['public']['Tables']['products']['Row'];
export type Customer = Database['public']['Tables']['customers']['Row'];
export type Order = Database['public']['Tables']['orders']['Row'];
export type OrderItem = Database['public']['Tables']['order_items']['Row'];
export type Analytics = Database['public']['Tables']['analytics']['Row'];
export type Store = Database['public']['Tables']['stores']['Row'];

export interface OrderWithCustomer extends Order {
  customers: Customer;
}

export interface OrderItemWithProduct extends OrderItem {
  products: Product;
}
