
export interface SpecSection {
  id: string;
  title: string;
  content: string | string[];
  subsections?: { title: string; content: string }[];
  type: 'text' | 'list' | 'code' | 'mixed';
}

export interface Metric {
  label: string;
  value: string;
  trend: number; // percentage
  status: 'up' | 'down' | 'neutral';
}

export interface Order {
  id: string;
  retailer: string;
  amount: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'On Hold';
  date: string;
  paymentMethod: 'Credit' | 'Instant';
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export enum Tab {
  // Admin
  DASHBOARD = 'dashboard',
  SPECIFICATION = 'specification',
  ORDERS = 'orders',
  INVENTORY = 'inventory',
  
  // Retailer & Distributor
  RETAILER_DASHBOARD = 'retailer_dashboard',
  CATALOG = 'catalog',
  MY_ORDERS = 'my_orders',
  CHECKOUT = 'checkout',

  // Customer (B2C)
  B2C_HOME = 'b2c_home',
  UPLOAD_RX = 'upload_rx'
}

export type UserRole = 'admin' | 'retailer' | 'distributor' | 'customer' | null;
