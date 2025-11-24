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
  DASHBOARD = 'dashboard',
  SPECIFICATION = 'specification',
  ORDERS = 'orders',
  INVENTORY = 'inventory'
}