
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

export enum Tab {
  // Admin
  DASHBOARD = 'dashboard',
  SPECIFICATION = 'specification',
  ORDERS = 'orders',
  INVENTORY = 'inventory',
  // Retailer
  RETAILER_DASHBOARD = 'retailer_dashboard',
  CATALOG = 'catalog',
  MY_ORDERS = 'my_orders'
}

export type UserRole = 'admin' | 'retailer' | null;
