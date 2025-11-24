
import { SpecSection } from './types';

export const ACTION_ITEMS = [
  "Approve pilot region (Karnataka) + 50 pilot retailers.",
  "Approve Credit Policy Template & Risk Thresholds.",
  "Sign agreements with Stripe (Payments) & Shiprocket (Logistics).",
  "Assign 1 dedicated Sales Rep to manage pilot relationships.",
  "Provide Product Masterfeed (CSV/Excel) for initial catalog seeding."
];

export const SPEC_SECTIONS: SpecSection[] = [
  {
    id: 'exec-summary',
    title: '1. Executive Summary',
    type: 'text',
    content: `SANDP Pharma aims to modernize the B2B pharmaceutical supply chain by launching a centralized e-commerce platform hosted on AWS. This platform will serve licensed retailers and internal ops, replacing fragmented phone/WhatsApp ordering with a streamlined digital experience. 
    
    For retailers, this provides real-time stock visibility, credit management, and faster fulfillment. For SANDP, it drives higher AOV through smart suggestions, reduces operational overhead, and ensures compliance. The platform differentiates itself via: (1) Real-time multi-warehouse stock sync, (2) Integrated credit line management, (3) Smart drug substitution logic, (4) Automated compliance checks (DEA/License), and (5) The S&P Sunny Club Loyalty System.`
  },
  {
    id: 'personas',
    title: '2. User Personas',
    type: 'mixed',
    content: 'Key stakeholders for the platform:',
    subsections: [
      {
        title: "Raj (Store Owner)",
        content: "Goals: Maximize margins, manage credit flow. Pain: Can't track invoices, misses bulk deals. Task: Checks 'Credit Limit', approves bulk order prepared by pharmacist."
      },
      {
        title: "Priya (Pharmacist)",
        content: "Goals: Quick stock check, fast reordering. Pain: Distributors out of stock without warning. Task: Scans barcode of empty box to reorder, accepts generic substitute."
      },
      {
        title: "Mike (SANDP Admin)",
        content: "Goals: Order throughput, catalog accuracy. Pain: Manual KYC verification. Task: Reviews uploaded Drug License, approves retailer account."
      },
      {
        title: "Delivery Agent",
        content: "Goals: Efficient routing. Task: Scans package at doorstep, triggers OTP to customer for delivery confirmation."
      }
    ]
  },
  {
    id: 'features',
    title: '3. Feature List (Prioritized)',
    type: 'mixed',
    content: 'MVP vs Phase 2 breakdown.',
    subsections: [
      {
        title: "MVP (Pilot Must-Haves)",
        content: "• Catalog: ElasticSearch-based search, Filters (Brand/Generic).\n• Product Substitutions: Logic to suggest generic alternatives. AC: If Brand X is out of stock, the displayed list must show generic equivalents sorted by margin. UI Hint: Suggest a button like 'Switch to Generic' with a 'Save 20%' badge.\n• Stock: Real-time visibility per DC.\n• Ordering: Cart, Checkout, Bulk Upload, Barcode Scan.\n• Payments: Net Terms (Credit), UPI/Cards (Stripe/Razorpay).\n• Admin: Order processing, Inventory view, KYC approval workflow.\n• Compliance: License upload & blocking logic."
      },
      {
        title: "Phase 2 (Advanced)",
        content: "• AI Forecasting for Retailers (Restock alerts).\n• Dynamic Pricing Engine (Personalized discounts).\n• Multi-tier Returns Workflow.\n• Route Optimization for delivery fleet."
      }
    ]
  },
  {
    id: 'sunny-club',
    title: '10. S&P Sunny Club Loyalty System',
    type: 'mixed',
    content: 'Comprehensive Loyalty & Rewards Module:',
    subsections: [
      {
        title: "1. Welcome & Earning",
        content: "- Welcome Bonus: 10,000 Reward Coins on registration.\n- Earning: 1 Coin per ₹1 spent (PTR value)."
      },
      {
        title: "2. Redemption Logic (Magic Store)",
        content: "- Threshold: First redemption ONLY after accumulating 50,000 coins.\n- Partial redemption allowed after threshold met.\n- Magic Store: Exclusive catalog for point redemption (FMCG, Gold coins)."
      },
      {
        title: "3. Scratch Card System",
        content: "- Trigger: 1 Card generated per order.\n- Wallet: Stores Unopened/Opened/Expired cards.\n- Pool: Cashback, FMCG gifts, Gold Coin chances."
      },
      {
        title: "4. Free Goods System",
        content: "- Rule: For every cumulative ₹2,000 (ex-GST), add ₹2,000 equivalent GST-free goods.\n- Ledger: Maintains a 'Free Goods' balance.\n- fulfillment: Auto-added to next shipment."
      },
      {
        title: "5. Hero's Wish Program",
        content: "- Wish Gallery: Predefined luxury items or Custom Upload.\n- Digital Wish Bond: Generated document with Dual OTP e-signature.\n- Tracking: Monthly/Yearly targets vs Progress %.\n- Auto-complete: Triggered when target achieved."
      }
    ]
  },
  {
    id: 'compliance',
    title: '11. Compliance & Workflows',
    type: 'list',
    content: [
      "Rx Compliance: Mandatory prescription upload for Rx items. Block checkout until file attached. Admin verification queue.",
      "Distributor Workflow: Admin creates Distributor -> Distributor onboards Retailers -> Consolidated Booking -> Split Delivery.",
      "Order State Machine: PLACED -> VERIFIED -> PACKED -> SHIPPED -> OUT_FOR_DELIVERY -> DELIVERED (OTP Required) -> RETURNED.",
      "Multi-Layer Wallet: Segregated balances for Reward Coins, Scratch Cards, and Free Goods Ledger."
    ]
  },
  {
    id: 'notifications',
    title: '12. Push Notification Triggers',
    type: 'list',
    content: [
      "Welcome Bonus Credited (10k coins)",
      "New Scratch Card received",
      "Free Goods credited to ledger",
      "Wish Milestones (25%, 50%, 75%, 100%)",
      "Order Status Updates (Packed, Shipped)",
      "Loyalty Expiry Reminders"
    ]
  },
  {
    id: 'tracking',
    title: '13. Logistics & Tracking',
    type: 'list',
    content: [
      "Real-time Inventory: Per-SKU stock at warehouse + Distributor override capability.",
      "Live Tracking: Map integration for 'Out for Delivery' state.",
      "Webhooks: Integration with courier APIs for status updates."
    ]
  },
  {
    id: 'architecture',
    title: '14. System Architecture',
    type: 'list',
    content: [
      "Frontend: React (Web Admin) + React Native (Mobile App) -> Hosted on AWS Amplify / S3 + CloudFront.",
      "API Layer: AWS API Gateway -> AWS Lambda (Serverless Node.js).",
      "Core DB: Amazon Aurora PostgreSQL (Relational Data: Orders, Retailers, Inventory).",
      "Cache/Cart: Amazon DynamoDB (High velocity cart sessions, Audit logs).",
      "Search: Amazon OpenSearch Service (Catalog, fuzzy search, substitutions).",
      "Async Ops: Amazon EventBridge (Order placement events) -> SQS -> Lambda (ERP Sync, Notifications).",
      "Storage: S3 (Product Images, KYC Documents - Encrypted)."
    ]
  },
  {
    id: 'api-sample',
    title: '15. Appendix: Sample API',
    type: 'code',
    content: `
POST /api/v1/orders
Headers: Authorization: Bearer <token>
Body:
{
  "items": [
    { "sku": "SKU_123", "qty": 50 }
  ],
  "shippingAddressId": "addr_01",
  "paymentMethod": "CREDIT_TERMS"
}

Response (201):
{
  "orderId": "ord_9090",
  "status": "PENDING_APPROVAL",
  "estimatedDelivery": "2023-10-25T14:00:00Z"
}
    `
  }
];
