
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
  status: 'Pending' | 'Verified' | 'Packed' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Returned' | 'Processing' | 'On Hold';
  date: string;
  paymentMethod: 'Credit' | 'Instant';
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  requiresRx?: boolean;
}

export interface LoyaltyHistoryItem {
  id: number;
  title: string;
  date: string;
  points: number;
  type: 'earn' | 'burn';
}

// --- SUNNY CLUB TYPES ---

export interface Wish {
  id: string;
  title: string;
  targetAmount: number; // The generic value needed to unlock
  currentAmount: number;
  image: string;
  status: 'Active' | 'Achieved' | 'Bond_Pending';
  bondSigned?: boolean;
}

export interface ScratchCard {
  id: string;
  status: 'Unopened' | 'Opened' | 'Expired';
  reward?: string;
  dateEarned: string;
}

export interface MagicItem {
  id: number;
  name: string;
  coinCost: number;
  image: string;
  category: 'FMCG' | 'Gold' | 'Electronics';
}

export enum Tab {
  // Admin
  DASHBOARD = 'dashboard',
  SPECIFICATION = 'specification',
  ORDERS = 'orders',
  INVENTORY = 'inventory',
  LOYALTY_MANAGEMENT = 'loyalty_management',
  
  // Retailer & Distributor
  RETAILER_DASHBOARD = 'retailer_dashboard',
  CATALOG = 'catalog',
  MY_ORDERS = 'my_orders',
  CHECKOUT = 'checkout',
  SUNNY_CLUB = 'sunny_club', // Replaces generic loyalty

  // Customer (B2C)
  B2C_HOME = 'b2c_home',
  UPLOAD_RX = 'upload_rx',
  LOYALTY = 'loyalty' // Basic loyalty for B2C
}

export type UserRole = 'admin' | 'retailer' | 'distributor' | 'customer' | 'stockist' | 'delivery' | 'support' | null;