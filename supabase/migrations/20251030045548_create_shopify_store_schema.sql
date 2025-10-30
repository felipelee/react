/*
  # Shopify Store Management Schema

  1. New Tables
    - `stores`
      - `id` (uuid, primary key)
      - `name` (text) - Store name
      - `description` (text) - Store description
      - `logo_url` (text) - Store logo
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `products`
      - `id` (uuid, primary key)
      - `store_id` (uuid, foreign key to stores)
      - `name` (text) - Product name
      - `description` (text) - Product description
      - `price` (numeric) - Product price
      - `image_url` (text) - Product image
      - `inventory` (integer) - Stock quantity
      - `category` (text) - Product category
      - `status` (text) - active, draft, archived
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `customers`
      - `id` (uuid, primary key)
      - `store_id` (uuid, foreign key to stores)
      - `name` (text) - Customer name
      - `email` (text) - Customer email
      - `phone` (text) - Customer phone
      - `avatar_url` (text) - Customer avatar
      - `total_orders` (integer) - Total number of orders
      - `total_spent` (numeric) - Total amount spent
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `orders`
      - `id` (uuid, primary key)
      - `store_id` (uuid, foreign key to stores)
      - `customer_id` (uuid, foreign key to customers)
      - `order_number` (text) - Order number
      - `status` (text) - pending, processing, completed, cancelled
      - `total_amount` (numeric) - Total order amount
      - `items_count` (integer) - Number of items
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `order_items`
      - `id` (uuid, primary key)
      - `order_id` (uuid, foreign key to orders)
      - `product_id` (uuid, foreign key to products)
      - `quantity` (integer)
      - `price` (numeric) - Price at time of order
      - `created_at` (timestamptz)
    
    - `analytics`
      - `id` (uuid, primary key)
      - `store_id` (uuid, foreign key to stores)
      - `date` (date) - Date of analytics
      - `revenue` (numeric) - Daily revenue
      - `orders_count` (integer) - Number of orders
      - `customers_count` (integer) - Number of new customers
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access (demo purposes)
    - All tables have proper indexes for performance
    
  3. Important Notes
    - Using numeric type for money values (proper decimal precision)
    - All timestamps use timestamptz for timezone awareness
    - Foreign keys ensure referential integrity
    - Default values prevent null errors
*/

-- Create stores table
CREATE TABLE IF NOT EXISTS stores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text DEFAULT '',
  logo_url text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE stores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to stores"
  ON stores FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id uuid REFERENCES stores(id) ON DELETE CASCADE,
  name text NOT NULL,
  description text DEFAULT '',
  price numeric(10, 2) NOT NULL DEFAULT 0,
  image_url text DEFAULT '',
  inventory integer NOT NULL DEFAULT 0,
  category text DEFAULT 'general',
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_products_store_id ON products(store_id);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to products"
  ON products FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create customers table
CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id uuid REFERENCES stores(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text NOT NULL,
  phone text DEFAULT '',
  avatar_url text DEFAULT '',
  total_orders integer DEFAULT 0,
  total_spent numeric(10, 2) DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_customers_store_id ON customers(store_id);
CREATE INDEX IF NOT EXISTS idx_customers_email ON customers(email);

ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to customers"
  ON customers FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id uuid REFERENCES stores(id) ON DELETE CASCADE,
  customer_id uuid REFERENCES customers(id) ON DELETE CASCADE,
  order_number text NOT NULL,
  status text DEFAULT 'pending',
  total_amount numeric(10, 2) NOT NULL DEFAULT 0,
  items_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_orders_store_id ON orders(store_id);
CREATE INDEX IF NOT EXISTS idx_orders_customer_id ON orders(customer_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to orders"
  ON orders FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  quantity integer NOT NULL DEFAULT 1,
  price numeric(10, 2) NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product_id ON order_items(product_id);

ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to order_items"
  ON order_items FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create analytics table
CREATE TABLE IF NOT EXISTS analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id uuid REFERENCES stores(id) ON DELETE CASCADE,
  date date NOT NULL,
  revenue numeric(10, 2) DEFAULT 0,
  orders_count integer DEFAULT 0,
  customers_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_analytics_store_id ON analytics(store_id);
CREATE INDEX IF NOT EXISTS idx_analytics_date ON analytics(date DESC);

ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to analytics"
  ON analytics FOR SELECT
  TO anon, authenticated
  USING (true);